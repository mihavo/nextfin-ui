import { Transaction } from '@/types/Transaction';
import { ArrowDown, Download, Pencil, Send } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { currencyFormatter } from '../utils/currency-formatter';

type TransactionDetailsModalProps = {
  isModalOpen: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction;
  isIncoming: boolean;
};

export default function TransactionDetailsModal({
  isModalOpen,
  onOpenChange,
  transaction,
  isIncoming,
}: TransactionDetailsModalProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md dialog-content">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isIncoming
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              }`}
            >
              {isIncoming ? (
                <ArrowDown className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </div>
            <span>Transaction Details</span>
          </DialogTitle>
          <DialogDescription>
            Complete information about this transaction
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          {transaction && (
            <div className="space-y-6 p-1">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  {transaction.targetName}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-5 items-center rounded-full px-2 text-xs font-medium ${
                      isIncoming
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {transaction.category}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div
                  className={`text-2xl font-bold mb-1 ${
                    isIncoming ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isIncoming ? '+' : '-'}
                  {currencyFormatter(transaction.currency, transaction.amount)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(transaction.createdAt).toLocaleDateString(
                    undefined,
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Transaction ID
                  </h4>
                  <p className="font-mono text-sm">{transaction.id}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        transaction.status === 'COMPLETED'
                          ? 'bg-green-500'
                          : 'bg-amber-300'
                      }`}
                    ></div>
                    <span className="capitalize">{transaction.status}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Category
                  </h4>
                  <p>{transaction.category}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Account
                  </h4>
                  <p>{transaction.sourceAccountId}</p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="sm">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
