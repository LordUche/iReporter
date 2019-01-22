import { Router } from 'express';
import controller from '../controllers/auth';
import { validateLogin, validateSignup } from '../middlewares/auth';

const router = new Router();

router.post('/signup', validateSignup, controller.signup);
router.post('/login', validateLogin, controller.login);

export default router;
