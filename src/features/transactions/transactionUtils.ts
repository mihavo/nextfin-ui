import { DatePeriod } from '@/types/Dates';
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

export const filterTransactionsByDate = (
  transactions: Transaction[],
  period: DatePeriod
) => {
  const cutoff = getCutoffDate(period);
  const result = transactions.filter((tx) => {
    if (!tx.createdAt) return false;
    return cutoff ? new Date(tx.createdAt) >= cutoff : true;
  });
  console.log(result);
  return result;
};

const getCutoffDate = (period: DatePeriod) => {
  const base = new Date();
  switch (period) {
    case '1d':
      return new Date(base.setDate(base.getDate() - 1));
    case '7d':
      return new Date(base.setDate(base.getDate() - 7));
    case '30d':
      return new Date(base.setDate(base.getDate() - 30));
    case '90d':
      return new Date(base.setDate(base.getDate() - 90));
    case '1y':
      return new Date(base.getFullYear(), 0, 1); // Jan 1st of this year
    case 'all':
    default:
      return null;
  }
};
