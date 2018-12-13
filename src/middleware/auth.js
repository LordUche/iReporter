import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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

export const validateOwner = (req, res, next) => {
  if (!(req.user.id == req.body.createdby)) {
    return res.status(403).json({ status: 403, error: 'Please enter a password ' });
  }
  next();
};
