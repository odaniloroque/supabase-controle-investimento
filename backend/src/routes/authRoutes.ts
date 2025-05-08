import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema, verifyEmailSchema } from '../schemas/authSchema';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/login/google', authController.loginWithGoogle);
router.post('/verify-email', validateRequest(verifyEmailSchema), authController.verifyEmail);

export default router; 