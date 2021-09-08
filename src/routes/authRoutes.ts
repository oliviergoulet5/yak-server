import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

router.post('/api/login', authController.login);
router.post('/api/register', authController.register);
router.get('/api/auth', authController.auth)

export { router as authRoutes }; 