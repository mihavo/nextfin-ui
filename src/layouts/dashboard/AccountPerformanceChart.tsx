import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { getDefaultCurrency } from '@/components/utils/currency';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { Transaction } from '@/types/Transaction';
import { DollarSign, Eye, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function AccountPerformanceChart() {
  const transactions: Transaction[] = useAppSelector(
    (state) => state.transactions.entities
  );
  const accounts: Account[] = useAppSelector(
    (state) => state.accounts.entities
  );
  const transactionStatus = useAppSelector(
    (state) => state.transactions.fetchUserTransactionsStatus
  );

  // Generate chart data based on account balance over time
  const chartData = useMemo(() => {
    if (!accounts.length || !transactions.length) return [];

    // Start with current balance and work backwards
    const primaryAccount = accounts[0];
    const accountTransactions = transactions
      .filter((t) => t.amount !== 0)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    if (accountTransactions.length === 0) return [];

    let runningBalance = primaryAccount.balance;
    const data = [];

    // Add current balance as the latest point
    data.unshift({
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      balance: runningBalance,
      dayChange: 0,
    });

    // Work backwards through transactions to build historical balance
    for (
      let i = accountTransactions.length - 1;
      i >= Math.max(0, accountTransactions.length - 30);
      i--
    ) {
      const transaction = accountTransactions[i];
      const previousBalance = runningBalance;
      runningBalance -= transaction.amount;

      const transactionDate = new Date(transaction.createdAt);
      data.unshift({
        date: transactionDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        balance: runningBalance,
        dayChange: previousBalance - runningBalance,
      });
    }

    return data.slice(-14); // Show last 14 days
  }, [accounts, transactions]);

  const chartConfig: ChartConfig = {
    balance: {
      label: 'Balance',
      color: 'hsl(var(--chart-1))',
    },
  };

  const totalChange = useMemo(() => {
    if (chartData.length < 2) return 0;
    return chartData[chartData.length - 1].balance - chartData[0].balance;
  }, [chartData]);

  const changePercentage = useMemo(() => {
    if (chartData.length < 2 || chartData[0].balance === 0) return 0;
    return (totalChange / Math.abs(chartData[0].balance)) * 100;
  }, [chartData, totalChange]);

  const currentBalance = accounts[0]?.balance || 0;
  const currency = accounts[0]?.currency || getDefaultCurrency().code;

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Account Performance
          </CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">
              {currencyFormatter(currency, currentBalance)}
            </p>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                totalChange >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {totalChange >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {totalChange >= 0 ? '+' : ''}
              {currencyFormatter(currency, Math.abs(totalChange))}
              <span className="text-sm">
                ({totalChange >= 0 ? '+' : ''}
                {changePercentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/accounts" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span className="text-sm">View All</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        {transactionStatus === 'pending' ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted/20 p-3 mb-3">
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-base font-medium text-muted-foreground">
              No performance data
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Transaction history will generate your chart
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <ChartContainer config={chartConfig} className="h-32 w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={totalChange >= 0 ? '#10b981' : '#ef4444'}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={totalChange >= 0 ? '#10b981' : '#ef4444'}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  height={25}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  width={45}
                  tickFormatter={(value) => {
                    if (value >= 1000000)
                      return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value.toFixed(0);
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-md">
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-sm">
                            Balance:{' '}
                            <span className="font-semibold">
                              {currencyFormatter(currency, data.balance)}
                            </span>
                          </p>
                          {data.dayChange !== 0 && (
                            <p
                              className={`text-sm ${
                                data.dayChange > 0
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-red-600 dark:text-red-400'
                              }`}
                            >
                              Daily Change: {data.dayChange > 0 ? '+' : ''}
                              {currencyFormatter(currency, data.dayChange)}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke={totalChange >= 0 ? '#10b981' : '#ef4444'}
                  strokeWidth={2}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ChartContainer>

            <div className="flex items-center justify-between text-sm border-t pt-4">
              <span className="text-muted-foreground">
                Last 14 days • {accounts[0]?.friendlyName || 'Primary Account'}
              </span>
              <Button variant="outline" size="sm" asChild className="h-8 px-3">
                <Link to="/transactions">
                  <span className="text-sm">View Transactions</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
