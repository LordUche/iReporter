import { Router } from 'express';
import controller from '../controllers/incidents';
import {
  validateLocation,
  validateComment,
  validateIncident,
  validateStatus,
} from '../middlewares/incidents';
import { isAdmin, isOwner, isNotAdmin } from '../middlewares/auth';

const router = new Router();

router.get('/', controller.index);
router.get('/:id(\\d+)', controller.get);
router.post('/', isNotAdmin, validateIncident, controller.create);
router.patch('/:id(\\d+)/location', isOwner, validateLocation, controller.updateLocation);
router.patch('/:id(\\d+)/comment', isOwner, validateComment, controller.updateComment);
router.patch('/:id(\\d+)/status', isAdmin, validateStatus, controller.updateStatus);
router.delete('/:id(\\d+)', isOwner, controller.delete);

export default router;
