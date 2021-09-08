import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.get('/users/:id', usersController.getById);

export { router as userRoutes };