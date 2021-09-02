import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.get('/users/:id', usersController.getById);

router.post('/users/create', usersController.create);

export { router as userRoutes };