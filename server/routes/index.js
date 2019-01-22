import { Router } from 'express';
import authRoutes from './auth.routes';
import incidentsRoutes from './incidents.routes';
import { signToken, verifyToken } from '../middlewares/auth';
import { parseType } from '../middlewares/incidents';

const router = new Router();

router.use('/auth', authRoutes, signToken);
router.use('/:type(red-flags|interventions)', verifyToken, parseType, incidentsRoutes);
router.use('*', (req, res, next) => {
  res.status(404);
  next(new Error('Not found'));
});
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  if (res.statusCode < 300) res.status(500);
  res.json({ status: res.statusCode, error: err.message });
});

export default router;
