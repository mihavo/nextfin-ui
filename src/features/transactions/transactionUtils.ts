import { Transaction } from '@/types/Transaction';
import { TransactionDirection } from './transactionApi';

export const inferTransactionDirection = (
  accountId: string,
  transaction: Transaction
): TransactionDirection => {
  return transaction.sourceAccountId.toString() == accountId
    ? 'OUTGOING'
    : 'INCOMING';
};


export const filterTransactionsByDate(transactions: Transaction[], period: string) {
  return 
}