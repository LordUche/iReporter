import { Router } from 'express';
import RedFlagsController from '../controllers/red-flags.controller';

const router = new Router();

router.get('/', RedFlagsController.index);
router.get('/:id', RedFlagsController.get);
router.post('/', RedFlagsController.create);
router.patch('/:id/location', RedFlagsController.updateLocation);
router.patch('/:id/comment', RedFlagsController.updateComment);
router.delete('/:id', RedFlagsController.delete);

export default router;
