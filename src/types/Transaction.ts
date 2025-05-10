import { TransactionDirection } from '@/features/transactions/transactionApi';

export type TransactionStatus = 'CREATED' | 'PENDING' | 'COMPLETED' | 'FAILED';
export type TransactionType = 'INSTANT' | 'SCHEDULED';
export type TransactionCategory =
  | 'TRANSFERS'
  | 'GENERAL'
  | 'TRANSPORT'
  | 'RESTAURANTS'
  | 'SHOPPING'
  | 'BILLS'
  | 'GROCERIES'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'TRAVEL'
  | 'EDUCATION'
  | 'CHARITY'
  | 'OTHER';

export const TransactionCategoryLabels: Record<TransactionCategory, string> = {
  TRANSFERS: 'Account Transfer',
  GENERAL: 'General',
  TRANSPORT: 'Transport',
  RESTAURANTS: 'Restaurants',
  SHOPPING: 'Shopping',
  BILLS: 'Bills',
  GROCERIES: 'Groceries',
  ENTERTAINMENT: 'Entertainment',
  HEALTH: 'Health & Wellness',
  TRAVEL: 'Travel & Trips',
  EDUCATION: 'Education',
  CHARITY: 'Charity Donations',
  OTHER: 'Other',
};

export interface TransactionRequestOptions {
  direction: TransactionDirection;
  pageSize?: number;
  skip?: number;
  sortBy?: TransactionSortingOptions;
  sortDirection?: 'ASC' | 'DESC';
}

export type TransactionSortingOptions =
  | 'CREATED_AT'
  | 'AMOUNT'
  | 'ID'
  | 'CURRENCY';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  sourceAccountId: number;
  targetAccountId: number;

  sourceUserId: string;
  targetUserId: string;
  targetName: string;
  status: TransactionStatus;
  type: TransactionType;
  category: TransactionCategory;
  scheduledAt?: string;
  fee: string;
  createdAt: string;
  updatedAt: string;
}
