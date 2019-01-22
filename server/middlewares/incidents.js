import Joi from 'joi';
import {
  createIncidentSchema,
  updateLocationSchema,
  updateCommentSchema,
  updateStatusSchema,
} from '../utils/schema';

const options = { abortEarly: false, allowUnknown: true };

export function validateIncident(req, res, next) {
  Joi.validate(req.body, createIncidentSchema, options)
    .then(() => next())
    .catch((err) => {
      const errors = err.details.map(e => e.message);
      return res.status(400).json({ status: res.statusCode, errors });
    });
}

export function validateLocation(req, res, next) {
  Joi.validate(req.body, updateLocationSchema, options)
    .then(() => next())
    .catch((err) => {
      const errors = err.details.map(e => e.message);
      return res.status(400).json({ status: res.statusCode, errors });
    });
}

export function validateComment(req, res, next) {
  Joi.validate(req.body, updateCommentSchema, options)
    .then(() => next())
    .catch((err) => {
      const errors = err.details.map(e => e.message);
      return res.status(400).json({ status: res.statusCode, errors });
    });
}

export function validateStatus(req, res, next) {
  Joi.validate(req.body, updateStatusSchema, options)
    .then(() => next())
    .catch((err) => {
      const errors = err.details.map(e => e.message);
      return res.status(400).json({ status: res.statusCode, errors });
    });
}

export function parseType(req, res, next) {
  req.incidentType = req.params.type.includes('red') ? 'red-flag' : 'intervention';
  next();
}
