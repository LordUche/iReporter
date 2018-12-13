import { Router } from 'express';
import controller from '../controllers/interventions.controller';
import { validateLocation, validateComment, validateStatus } from '../middleware/validators';
import { isAdmin } from '../middleware/auth';

const router = new Router();

router.get('/', controller.index);
router.get('/:id(\\d+)', controller.get);
router.post('/', validateLocation, validateComment, controller.create);
router.patch('/:id(\\d+)/location', validateLocation, controller.updateLocation);
router.patch('/:id(\\d+)/comment', validateComment, controller.updateComment);
router.patch('/:id(\\d+)/status', isAdmin, validateStatus, controller.updateStatus);
router.delete('/:id(\\d+)', controller.delete);

export default router;
