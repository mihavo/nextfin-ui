import { inferTransactionDirection } from '@/features/transactions/transactionUtils';
import { Transaction } from '@/types/Transaction';
import { ArrowDown, Send } from 'lucide-react';
import { useState } from 'react';
import TransactionDetailsModal from '../transactions/TransactionDetailsModal';
import { currencyFormatter } from '../utils/currency-formatter';

type AccountTransactionItemProps = {
  accountId: string;
  transaction: Transaction;
};
export default function AccountTransactionItem({
  accountId,
  transaction,
}: AccountTransactionItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTransactionModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  const isIncoming =
    inferTransactionDirection(accountId, transaction) === 'INCOMING';

  return (
    <>
      <div
        className="transaction-item group relative flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 hover:bg-accent/10 hover:shadow-md cursor-pointer dark:border-gray-800 dark:hover:bg-gray-800/50"
        onClick={() => openTransactionModal()}
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            isIncoming
              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
          }`}
        >
          {isIncoming ? (
            <ArrowDown className="h-5 w-5 text-green-500" />
          ) : (
            <Send className="h-5 w-5 text-blue-500" />
          )}
        </div>
        <div className="grid flex-1 gap-1">
          <div className="flex items-center">
            <div className="font-medium text-base">
              {transaction.targetName}
            </div>
            <div
              className={`ml-2 inline-flex h-5 items-center rounded-full px-2 text-xs font-medium ${
                isIncoming
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              }`}
            >
              {transaction.type.charAt(0).toUpperCase() +
                transaction.type.slice(1)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {transaction.category}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {new Date(transaction.createdAt).toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`text-lg font-semibold ${
              isIncoming
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isIncoming ? '+' : '-'}
            {currencyFormatter(transaction.currency, transaction.amount)}
          </div>
          <div className="flex items-center justify-end gap-1 text-xs capitalize text-muted-foreground">
            <div
              className={`h-2 w-2 rounded-full ${
                transaction.status === 'COMPLETED'
                  ? 'bg-green-500'
                  : 'bg-amber-300'
              }`}
            ></div>
            {transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1).toLowerCase()}
          </div>
        </div>
      </div>
      <TransactionDetailsModal
        isModalOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        transaction={transaction}
        isIncoming={isIncoming}
      />
    </>
  );
}
