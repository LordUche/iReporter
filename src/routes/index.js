import { Router } from 'express';
import redFlagRoutes from './red-flags.routes';
import usersRoutes from './users.routes';
import { verifyToken } from '../middleware/auth';

const router = new Router();

router.use('/red-flags', verifyToken, redFlagRoutes);
router.use('/auth', usersRoutes);

export default router;
