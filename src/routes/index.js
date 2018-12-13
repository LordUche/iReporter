import { Router } from 'express';
import redFlagRoutes from './red-flags.routes';
import interventionsRoutes from './interventions.routes';
import usersRoutes from './users.routes';
import { verifyToken } from '../middleware/auth';

const router = new Router();

router.use('/red-flags', verifyToken, redFlagRoutes);
router.use('/interventions', verifyToken, interventionsRoutes);
router.use('/auth', usersRoutes);

export default router;
