import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AppError } from '../middlewares/errorHandler';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      return res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async loginWithGoogle(req: Request, res: Response) {
    try {
      const { token } = req.body;
      if (!token) {
        throw new AppError(400, 'Token do Google não fornecido');
      }

      const result = await authService.loginWithGoogle(token);
      return res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const result = await authService.verifyEmail(req.body);
      return res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
} 