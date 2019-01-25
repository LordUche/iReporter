/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { signupSchema, loginSchema } from '../utils/schema';
import { isValidPhoneNumber, formatPhoneNumber } from '../utils/helpers';
import query from '../database/queries/incidents';
import countries from '../utils/country_names';

const options = { abortEarly: false, allowUnknown: true };

export function signToken(req, res) {
  const { user } = req;
  delete user.hash;
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ status: res.statusCode, data: [{ token, user }] });
}

export function verifyToken(req, res, next) {
  const token = req.headers['access-token'];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ status: res.statusCode, error: 'You are not authenticated' });
    }
    req.user = payload;
    next();
  });
}

export function validateSignup(req, res, next) {
  Joi.validate(req.body, signupSchema, options)
    .then((data) => {
      const { phonenumber, country } = data;
      if (phonenumber && country) {
        if (isValidPhoneNumber(phonenumber, country)) {
          req.body.phonenumber = formatPhoneNumber(phonenumber, country);
        } else {
          return res.status(400).json({
            status: res.statusCode,
            errors: [`${req.body.phonenumber} is not a valid phone number in ${countries[country.toUpperCase()]}`],
          });
        }
      }
      next();
    })
    .catch((err) => {
      const errors = err.details.map(e => e.message);
      return res.status(400).json({ status: res.statusCode, errors });
    });
}

export function validateLogin(req, res, next) {
  Joi.validate(req.body, loginSchema, options)
    .then(() => next())
    .catch((err) => {
      const errors = err.details.map(e => e.message);
      return res.status(400).json({ status: res.statusCode, errors });
    });
}

export function isAdmin(req, res, next) {
  if (!req.user.isadmin) {
    return res.status(403).json({ status: res.statusCode, error: 'You are not authorised!' });
  }
  next();
}

export function isNotAdmin(req, res, next) {
  if (req.user.isadmin) {
    return res.status(403).json({ status: res.statusCode, error: 'You are not authorised!' });
  }
  next();
}

export function isOwner(req, res, next) {
  query
    .get(parseInt(req.params.id, 10), req.incidentType)
    .then((data) => {
      const { createdby } = data;
      if (req.user.id !== createdby) {
        return res.status(403).json({ status: res.statusCode, error: 'You are not authorised!' });
      }
      next();
    })
    .catch((err) => {
      const error = err.result && !err.result.rowCount
        ? `The ${req.incidentType} record with id "${req.params.id}" doesn't exist.`
        : 'Something went wrong, please try again.';
      return res.status(500).json({ status: res.statusCode, error });
    });
}
