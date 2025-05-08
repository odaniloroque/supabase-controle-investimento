import { PrismaClient } from '@prisma/client';
import { supabase } from '../config/supabase';
import { AppError } from '../middlewares/errorHandler';
import { EmailLoginDTO, RegisterDTO, VerifyEmailDTO } from '@investimentos/core';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError(400, 'Email já cadastrado');
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        provider: 'EMAIL',
      },
    });

    // Criar perfil do usuário
    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    // Gerar token de verificação
    const verificationToken = await this.generateVerificationToken(user.email);

    // Enviar email de verificação (implementar serviço de email)
    // await sendVerificationEmail(user.email, verificationToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(data: EmailLoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.password) {
      throw new AppError(401, 'Credenciais inválidas');
    }

    const validPassword = await compare(data.password, user.password);

    if (!validPassword) {
      throw new AppError(401, 'Credenciais inválidas');
    }

    if (!user.emailVerified) {
      throw new AppError(403, 'Email não verificado');
    }

    const token = await this.generateSessionToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async loginWithGoogle(googleToken: string) {
    try {
      const { data: { user: googleUser }, error } = await supabase.auth.getUser(googleToken);

      if (error || !googleUser) {
        throw new AppError(401, 'Token do Google inválido');
      }

      let user = await prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (!user) {
        // Criar novo usuário
        user = await prisma.user.create({
          data: {
            email: googleUser.email!,
            name: googleUser.user_metadata?.full_name,
            provider: 'GOOGLE',
            emailVerified: true,
          },
        });

        // Criar perfil
        await prisma.profile.create({
          data: {
            userId: user.id,
            avatar: googleUser.user_metadata?.avatar_url,
          },
        });
      }

      const token = await this.generateSessionToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      throw new AppError(401, 'Erro ao autenticar com Google');
    }
  }

  async verifyEmail(data: VerifyEmailDTO) {
    const verification = await prisma.emailVerification.findFirst({
      where: {
        email: data.email,
        token: data.token,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      throw new AppError(400, 'Token inválido ou expirado');
    }

    await prisma.user.update({
      where: { email: data.email },
      data: { emailVerified: true },
    });

    await prisma.emailVerification.delete({
      where: { id: verification.id },
    });

    return { message: 'Email verificado com sucesso' };
  }

  private async generateSessionToken(userId: string): Promise<string> {
    const token = sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      },
    });

    return token;
  }

  private async generateVerificationToken(email: string): Promise<string> {
    const token = Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    await prisma.emailVerification.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return token;
  }
} 