import { Router } from 'express';
import RedFlagsController from '../controllers/redFlagsController';

const router = new Router();

router.get('/red-flags', RedFlagsController.index);
router.get('/red-flags/:id', RedFlagsController.get);
router.post('/red-flags', RedFlagsController.create);
router.patch('/red-flags/:id/location', RedFlagsController.updateLocation);
router.patch('/red-flags/:id/comment', RedFlagsController.updateComment);
router.delete('/red-flags/:id', RedFlagsController.delete);

export default router;
