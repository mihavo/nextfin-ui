export type TransactionStatus = 'CREATED' | 'PENDING' | 'COMPLETED' | 'FAILED';
export type TransactionType = 'INSTANT' | 'SCHEDULED';

export interface Transaction {
  id: string;
  amount: string;
  currency: string;
  sourceAccountId: number;
  targetAccountId: number;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  scheduledAt?: string;
  fee: string;
  createdAt: string;
  updatedAt: string;
}
