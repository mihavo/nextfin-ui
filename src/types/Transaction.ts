export type TransactionStatus = 'CREATED' | 'PENDING' | 'COMPLETED' | 'FAILED';
export type TransactionType = 'INSTANT' | 'SCHEDULED';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  sourceAccountId: number;
  targetAccountId: number;

  sourceUserId: string;
  targetUserId: string;
  targetName: string;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  scheduledAt?: string;
  fee: string;
  createdAt: string;
  updatedAt: string;
}
