import { z } from 'zod';

// Schema para login com email/senha
export const emailLoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// Schema para registro
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(1, 'Nome é obrigatório'),
});

// Schema para verificação de email
export const verifyEmailSchema = z.object({
  email: z.string().email('Email inválido'),
  token: z.string().min(1, 'Token é obrigatório'),
});

// Tipos gerados a partir dos schemas
export type EmailLoginDTO = z.infer<typeof emailLoginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;

// Enums para tipos de autenticação
export enum AuthProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
}

// Mensagens de autenticação
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  REGISTER_SUCCESS: 'Registro realizado com sucesso',
  EMAIL_VERIFICATION_SENT: 'Email de verificação enviado',
  EMAIL_VERIFIED: 'Email verificado com sucesso',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  INVALID_TOKEN: 'Token inválido ou expirado',
  GOOGLE_LOGIN_SUCCESS: 'Login com Google realizado com sucesso',
} as const; 