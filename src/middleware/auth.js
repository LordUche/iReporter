import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getIncident } from '../utils/database/queries/queries';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ status: 401, error: 'You are not authenticated' });
    }
    req.user = payload;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user.isadmin) {
    return res
      .status(403)
      .json({ status: 403, error: 'Only admins are allowed to access this route' });
  }
  next();
};

export const isNotAdmin = (req, res, next) => {
  if (req.user.isadmin) {
    return res.status(403).json({ status: 403, error: 'No admins allowed on this route' });
  }
  next();
};

export const validateOwner = (req, res, next) => {
  getIncident(parseInt(req.params.id, 10))
    .then((incident) => {
      if (!(req.user.id === incident.createdby)) {
        return res.status(403).json({ status: 403, error: 'Unauthorized!' });
      }
      next();
    })
    .catch(err => res.status(500).json({ status: 403, error: err.message }));
};
