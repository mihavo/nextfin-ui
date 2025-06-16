import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { useAppSelector } from '@/store/hooks';
import { Transaction, TransactionCategoryLabels } from '@/types/Transaction';
import dayjs from 'dayjs';
import { CreditCard, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Transactions({ items }: { items: Transaction[] }) {
  const navigate = useNavigate();
  const status = useAppSelector(
    (state) => state.transactions.newTransactionStatus
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const calculateSign = (item: Transaction): '+' | '-' => {
    return item.sourceUserId === currentUserId ? '-' : '+';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {status === 'pending' ? (
          <Skeleton className="p-2 h-5 w-1/2" />
        ) : items.length == 0 ? (
          <div className="text-center text-muted-foreground">
            No transactions found.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="grid gap-1">
                <div className="font-semibold">{item.targetName}</div>
                <div className="text-xs text-muted-foreground">
                  {TransactionCategoryLabels[item.category]}
                </div>
              </div>
              <div className="ml-auto text-right">
                <div
                  className={
                    calculateSign(item) === '-'
                      ? 'text-red-500'
                      : 'text-green-500'
                  }
                >
                  {calculateSign(item)}
                  {currencyFormatter(item.currency, item.amount)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dayjs(item.createdAt).format('MMM D, HH:mm')}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          variant="outline"
          className="w-full gap-1"
          onClick={() => navigate('/transactions')}
        >
          <History className="h-3.5 w-3.5" />
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}
