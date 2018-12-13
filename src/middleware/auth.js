import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ status: 401, error: 'You are not authorized' });
    }
    req.user = payload;
    next();
  });
};

export const isAdmin = (req, res, next) => {};
