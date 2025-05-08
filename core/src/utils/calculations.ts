import { Investment } from '../types/investment';

export function calculateTotalInvestment(investments: Investment[]): number {
  return investments.reduce((total, inv) => total + inv.value, 0);
}

export function calculateInvestmentsByType(investments: Investment[]): Record<string, number> {
  return investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.value;
    return acc;
  }, {} as Record<string, number>);
}

export function calculateMonthlyReturn(
  initialValue: number,
  finalValue: number,
  months: number
): number {
  return Math.pow(finalValue / initialValue, 1 / months) - 1;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
} 