import { Request, Response, NextFunction } from 'express';
import { supabase } from '../server';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'Token de autenticação não fornecido'
      });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        status: 'error',
        message: 'Token inválido ou expirado'
      });
    }

    // Adiciona o usuário ao objeto request para uso posterior
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao validar autenticação',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}; 