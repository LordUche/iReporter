import { Router } from 'express';
import controller from '../controllers/users.controller';

const router = new Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);

export default router;
