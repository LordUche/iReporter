import { Router } from 'express';
import controller from '../controllers/interventions.controller';
import { validateLocation, validateComment, validateStatus } from '../middleware/validators';
import { isAdmin, isNotAdmin, validateOwner } from '../middleware/auth';

const router = new Router();

router.get('/', controller.index);
router.get('/:id(\\d+)', controller.get);
router.post('/', isNotAdmin, validateLocation, validateComment, controller.create);
router.patch('/:id(\\d+)/location', isNotAdmin, validateOwner, validateLocation, controller.updateLocation);
router.patch('/:id(\\d+)/comment', isNotAdmin, validateOwner, validateComment, controller.updateComment);
router.patch('/:id(\\d+)/status', isAdmin, validateStatus, controller.updateStatus);
router.delete('/:id(\\d+)', validateOwner, controller.delete);

export default router;
