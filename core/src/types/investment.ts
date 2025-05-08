import { z } from 'zod';

// Schema Zod para validação
export const investmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['ACAO', 'FII', 'RENDA_FIXA', 'CRIPTO']),
  value: z.number().positive('Valor deve ser positivo'),
  date: z.date(),
  description: z.string().optional(),
});

// Tipos TypeScript gerados a partir do schema
export type Investment = z.infer<typeof investmentSchema>;
export type CreateInvestmentDTO = Omit<Investment, 'id'>;
export type UpdateInvestmentDTO = Partial<CreateInvestmentDTO>;

// Enums compartilhados
export enum InvestmentType {
  ACAO = 'ACAO',
  FII = 'FII',
  RENDA_FIXA = 'RENDA_FIXA',
  CRIPTO = 'CRIPTO',
}

// Constantes compartilhadas
export const INVESTMENT_MESSAGES = {
  CREATE_SUCCESS: 'Investimento criado com sucesso',
  UPDATE_SUCCESS: 'Investimento atualizado com sucesso',
  DELETE_SUCCESS: 'Investimento excluído com sucesso',
  NOT_FOUND: 'Investimento não encontrado',
} as const; 