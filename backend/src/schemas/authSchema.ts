import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const verifyEmailSchema = z.object({
  email: z.string().email('Email inválido'),
  token: z.string().min(1, 'Token é obrigatório'),
}); 