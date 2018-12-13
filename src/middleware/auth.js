import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default (req, res, next) => {
  const token = req.headers['access-token'];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ status: 403, error: 'You are not authorized' });
    }
    req.user = payload;
    next();
  });
};
