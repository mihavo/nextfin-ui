import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { resetStatus } from '@/features/transactions/transactionSlice';
import { convertTimestampToDateAndTime } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Check, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CompletedTransactionModalProps = {
  onClose: () => void;
};

export default function CompletedTransactionModal({
  onClose,
}: CompletedTransactionModalProps) {
  const navigate = useNavigate();
  const transaction = useAppSelector(
    (state) => state.transactions.newTransaction
  );
  const dispatch = useAppDispatch();
  const transactionOptions = useAppSelector(
    (state) => state.transactions.newTransactionOptions
  );

  const scheduledAt = transactionOptions?.timestamp
    ? convertTimestampToDateAndTime(transactionOptions.timestamp)
    : null;

  const handleNewTransaction = () => {
    dispatch(resetStatus('newTransactionStatus'));
    navigate('/transactions/new');
  };

  const handleReturn = () => {
    onClose();
    dispatch(resetStatus('newTransactionStatus'));
    navigate('/');
  };

  return (
    <>
      {transaction == null ? (
        <div className="error-message">No current transactions found.</div>
      ) : (
        <div className="success-message">
          <CardHeader>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Transaction Submitted!</CardTitle>
              <CardDescription className="mt-2 text-center">
                Your transaction has been submitted for processing and will be
                completed shortly.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Transaction ID
                  </h4>
                  <p className="font-mono text-sm">
                    {transaction.transactionId}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span>Processing</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Currency
                  </h4>
                  <p className="capitalize">{transaction.currency}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Amount
                  </h4>
                  <p className="font-semibold">
                    {currencyFormatter(
                      transaction.currency,
                      transaction.amount
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    From Account
                  </h4>
                  <p>{transaction.sourceAccountId}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    To Account
                  </h4>
                  <p>{transaction.targetAccountId}</p>
                </div>
                {transactionOptions &&
                  transactionOptions.isScheduled &&
                  scheduledAt && (
                    <div className="col-span-2 space-y-1">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Scheduled For
                      </h4>
                      <p className="text-sm">
                        {scheduledAt.date} at {scheduledAt.time}
                      </p>
                    </div>
                  )}
              </div>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">What happens next?</h4>
                  <p className="text-sm text-muted-foreground">
                    Your transaction is being processed and will be completed
                    shortly. You'll receive a notification when it's done.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-end gap-4 mt-12 sm:flex-row">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleReturn}
            >
              Return to Dashboard
            </Button>
            <Button
              className="w-full sm:w-auto dark:text-white"
              onClick={handleNewTransaction}
            >
              Create Another Transaction
            </Button>
          </CardFooter>
        </div>
      )}
    </>
  );
}
