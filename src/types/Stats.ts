export interface IncomeStats {
  totalIncome: number;
  averageIncome: number;
  startDate: string;
  endDate: string;
}

export interface ExpensesStats {
  totalExpenses: number;
  averageExpenses: number;
  startDate: string;
  endDate: string;
}

export type StatsRange = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
