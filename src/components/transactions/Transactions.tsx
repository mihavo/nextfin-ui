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
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
        <div className="text-xs text-muted-foreground">
          Latest account activity
        </div>
      </CardHeader>
      <CardContent className="pb-3 flex-1 flex flex-col">
        <div className="space-y-3 flex-1 min-h-72 overflow-y-auto">
          {status === 'pending' ? (
            <Skeleton className="p-2 h-5 w-1/2" />
          ) : items.length == 0 ? (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              No transactions found.
            </div>
          ) : (
            items.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {item.targetName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {TransactionCategoryLabels[item.category]}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-medium ${
                      calculateSign(item) === '-'
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
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
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 mt-auto">
        <Button
          variant="outline"
          className="w-full gap-1 h-8"
          onClick={() => navigate('/transactions')}
        >
          <History className="h-3.5 w-3.5" />
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}
