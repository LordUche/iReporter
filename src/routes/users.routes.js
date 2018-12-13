import { Router } from 'express';
import controller from '../controllers/users.controller';
import {
  validateNames,
  validateEmail,
  validateUsername,
  validatePassword,
} from '../middleware/validators';

const router = new Router();

router.post(
  '/signup',
  validateNames,
  validateEmail,
  validateUsername,
  validatePassword,
  controller.signup,
);
router.post('/login', validateEmail, validatePassword, controller.login);

export default router;
