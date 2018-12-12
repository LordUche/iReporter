import { Router } from 'express';
import controller from '../controllers/red-flags.controller';
import { validateLocation, validateComment } from '../middleware/validators';

const router = new Router();

router.get('/', controller.index);
router.get('/:id(\\d+)', controller.get);
router.post('/', validateLocation, validateComment, controller.create);
router.patch('/:id(\\d+)/location', validateLocation, controller.updateLocation);
router.patch('/:id(\\d+)/comment', validateComment, controller.updateComment);
router.delete('/:id(\\d+)', controller.delete);

export default router;
