import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getDefaultCurrency } from '@/components/utils/currency';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { useAppSelector } from '@/store/hooks';
import { Transaction } from '@/types/Transaction';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecentActivity() {
  const transactions: Transaction[] = useAppSelector(
    (state) => state.transactions.entities
  );
  const accounts = useAppSelector((state) => state.accounts.entities);
  const transactionStatus = useAppSelector(
    (state) => state.transactions.fetchUserTransactionsStatus
  );

  // Get the 5 most recent transactions
  const recentTransactions = transactions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const getTransactionIcon = (type: string, amount: number) => {
    if (amount > 0) {
      return <ArrowDownCircle className="h-4 w-4 text-emerald-500" />;
    } else {
      return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTransactionDescription = (transaction: Transaction) => {
    if (transaction.amount > 0) {
      return `Received from ${transaction.targetName || 'External Account'}`;
    } else {
      return `Sent to ${transaction.targetName || 'External Account'}`;
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const transactionDate = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - transactionDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/transactions" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactionStatus === 'pending' ? (
          <>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-2/5" />
              </div>
              <Skeleton className="h-4 w-14" />
            </div>
          </>
        ) : recentTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted/20 p-3 mb-3">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No recent activity
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Your transactions will appear here
            </p>
          </div>
        ) : (
          recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/30">
                {getTransactionIcon(transaction.type, transaction.amount)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {getTransactionDescription(transaction)}
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-semibold ${
                        transaction.amount > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {currencyFormatter(
                        accounts[0]?.currency || getDefaultCurrency().code,
                        Math.abs(transaction.amount)
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(transaction.createdAt)}
                  </p>
                  {transaction.category && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      {transaction.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {recentTransactions.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {recentTransactions.length} recent transactions
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/transactions">View More</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
