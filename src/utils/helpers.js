import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

export const signToken = user => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

export const hashPassword = password => bcrypt.hashSync(password, 10);

export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
