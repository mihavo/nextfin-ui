import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getDefaultCurrency } from '@/components/utils/currency';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { fetchUserAccountsAction } from '@/features/account/accountSlice';
import { fetchUserAction } from '@/features/auth/authSlice';
import {
  getExpensesStatsAction,
  getIncomeStatsAction,
  setExpensesRange,
  setIncomeRange,
} from '@/features/stats/statsSlice';
import { fetchUserTransactionsAction } from '@/features/transactions/transactionSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { StatsRange } from '@/types/Stats';
import { Transaction } from '@/types/Transaction';
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Accounts from '../../components/account/Accounts';
import TimerangeSelector from '../../components/dashboard/TimerangeSelector';
import Transactions from '../../components/transactions/Transactions';
import AccountPerformanceChart from './AccountPerformanceChart';
import Notifications from './Notifications';
import QuickActions from './QuickActions';

export default function Dashboard() {
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [savingsRange, setSavingsRange] = useState<StatsRange>('MONTHLY');
  const navigate = useNavigate();

  const accounts: Account[] = useAppSelector(
    (state) => state.accounts.entities
  );
  const transactions: Transaction[] = useAppSelector(
    (state) => state.transactions.entities
  );
  const hasLoaded =
    useAppSelector((state) => state.accounts.getUserAccountsStatus) ===
    'succeeded';
  const incomeStats = useAppSelector((state) => state.stats.incomeStats);
  const incomeStatus = useAppSelector((state) => state.stats.incomeStatus);
  const expensesStats = useAppSelector((state) => state.stats.expensesStats);
  const expensesStatus = useAppSelector((state) => state.stats.expensesStatus);
  const incomeRange = useAppSelector((state) => state.stats.incomeRange);
  const expensesRange = useAppSelector((state) => state.stats.expensesRange);

  useEffect(() => {
    if (hasLoaded) {
      const total = accounts
        .map((acc) => Number(acc.balance))
        .reduce((sum, balance) => sum + balance, 0);
      setTotalBalance(total);
    }
  }, [hasLoaded, accounts]);

  const dispatch = useAppDispatch();

  const handleIncomeRangeChange = (range: StatsRange) => {
    dispatch(setIncomeRange(range));
    dispatch(getIncomeStatsAction({ range }));
  };

  const handleExpensesRangeChange = (range: StatsRange) => {
    dispatch(setExpensesRange(range));
    dispatch(getExpensesStatsAction({ range }));
  };

  const handleSavingsRangeChange = (range: StatsRange) => {
    setSavingsRange(range);
  };

  useEffect(() => {
    dispatch(fetchUserAction());
    dispatch(fetchUserAccountsAction());
    dispatch(fetchUserTransactionsAction());
    dispatch(getIncomeStatsAction({ range: incomeRange }));
    dispatch(getExpensesStatsAction({ range: expensesRange }));
  }, [dispatch]);

  const navigateToStatistics = (
    tab: 'balance' | 'income' | 'expenses' | 'savings'
  ) => {
    navigate(`/statistics?tab=${tab}`);
  };

  return (
    <main className="flex flex-1 flex-col gap-3 p-2 md:gap-4 md:p-4 lg:p-6">
      <div className="grid gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-4">
        <Card
          className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-500 group cursor-pointer"
          onClick={() => navigateToStatistics('balance')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/30 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800 dark:text-gray-100">
              Total Balance
            </CardTitle>
            <div className="p-2 rounded-full bg-white/30 dark:bg-emerald-700 group-hover:bg-white/40 dark:group-hover:bg-emerald-800 transition-all duration-500 group-hover:rotate-12">
              <Wallet className="h-4 w-4 text-emerald-700 dark:text-emerald-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            {totalBalance == null ? (
              <Skeleton className="h-8 w-32 bg-white/20 dark:bg-slate-700" />
            ) : (
              <>
                <div className="text-2xl font-bold leading-tight mb-2 text-emerald-900 dark:text-gray-100 group-hover:text-emerald-800 dark:group-hover:text-gray-200 transition-colors duration-500">
                  {currencyFormatter(
                    accounts[0] != null
                      ? accounts[0].currency
                      : getDefaultCurrency().code,
                    totalBalance
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-emerald-700 dark:text-emerald-300 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-tight">
                    Avg:{' '}
                    {currencyFormatter(
                      accounts[0] != null
                        ? accounts[0].currency
                        : getDefaultCurrency().code,
                      totalBalance / 30
                    )}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card
          className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 dark:from-blue-800 dark:via-blue-900 dark:to-blue-950 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500 group cursor-pointer"
          onClick={() => navigateToStatistics('income')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/30 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-gray-100">
              Income
            </CardTitle>
            <div className="p-2 rounded-full bg-white/30 dark:bg-blue-700 group-hover:bg-white/40 dark:group-hover:bg-blue-800 transition-all duration-500 group-hover:rotate-12">
              <TrendingUp className="h-4 w-4 text-blue-700 dark:text-blue-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            {incomeStatus == 'pending' ? (
              <Skeleton className="h-8 w-32 bg-white/20 dark:bg-slate-700" />
            ) : incomeStats != null ? (
              <>
                <div className="text-2xl font-bold leading-tight mb-2 text-blue-900 dark:text-gray-100 group-hover:text-blue-800 dark:group-hover:text-gray-200 transition-colors duration-500">
                  {currencyFormatter(
                    getDefaultCurrency().code,
                    incomeStats.totalIncome
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-blue-700 dark:text-blue-300 flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-tight">
                    Avg:{' '}
                    {currencyFormatter(
                      getDefaultCurrency().code,
                      incomeStats.averageIncome
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold leading-tight mb-2 text-blue-900 dark:text-gray-100 group-hover:text-blue-800 dark:group-hover:text-gray-200 transition-colors duration-500">
                {currencyFormatter(getDefaultCurrency().code, 0)}
              </div>
            )}
            <TimerangeSelector
              currentRange={incomeRange}
              onRangeChange={handleIncomeRangeChange}
            />
          </CardContent>
        </Card>

        <Card
          className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 dark:from-orange-800 dark:via-orange-900 dark:to-orange-950 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-500 group cursor-pointer"
          onClick={() => navigateToStatistics('expenses')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/30 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800 dark:text-gray-100">
              Expenses
            </CardTitle>
            <div className="p-2 rounded-full bg-white/30 dark:bg-orange-700 group-hover:bg-white/40 dark:group-hover:bg-orange-800 transition-all duration-500 group-hover:rotate-12">
              <TrendingDown className="h-4 w-4 text-orange-700 dark:text-orange-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            {expensesStatus == 'pending' ? (
              <Skeleton className="h-8 w-32 bg-white/20 dark:bg-slate-700" />
            ) : expensesStats != null ? (
              <>
                <div className="text-2xl font-bold leading-tight mb-2 text-orange-900 dark:text-gray-100 group-hover:text-orange-800 dark:group-hover:text-gray-200 transition-colors duration-500">
                  {currencyFormatter(
                    getDefaultCurrency().code,
                    expensesStats.totalExpenses
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-orange-700 dark:text-orange-300 flex-shrink-0" />
                  <p className="text-xs text-orange-700 dark:text-orange-300 leading-tight">
                    Avg:{' '}
                    {currencyFormatter(
                      getDefaultCurrency().code,
                      expensesStats.averageExpense
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold leading-tight mb-2 text-orange-900 dark:text-gray-100 group-hover:text-orange-800 dark:group-hover:text-gray-200 transition-colors duration-500">
                {currencyFormatter(getDefaultCurrency().code, 0)}
              </div>
            )}
            <TimerangeSelector
              currentRange={expensesRange}
              onRangeChange={handleExpensesRangeChange}
            />
          </CardContent>
        </Card>

        <Card
          className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 dark:from-purple-800 dark:via-purple-900 dark:to-purple-950 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/40 transition-all duration-500 group cursor-pointer"
          onClick={() => navigateToStatistics('savings')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/30 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-gray-100">
              Savings
            </CardTitle>
            <div className="p-2 rounded-full bg-white/30 dark:bg-purple-700 group-hover:bg-white/40 dark:group-hover:bg-purple-800 transition-all duration-500 group-hover:rotate-12">
              <PiggyBank className="h-4 w-4 text-purple-700 dark:text-purple-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-2xl font-bold leading-tight mb-2 text-purple-900 dark:text-gray-100 group-hover:text-purple-800 dark:group-hover:text-gray-200 transition-colors duration-500">
              €1,234.00
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-purple-700 dark:text-purple-300 flex-shrink-0" />
              <p className="text-xs text-purple-700 dark:text-purple-300 leading-tight">
                +18.7% from last month
              </p>
            </div>
            <TimerangeSelector
              currentRange={savingsRange}
              onRangeChange={handleSavingsRangeChange}
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6 shadow-md bg-border/50" />

      <div className="main-cards grid gap-3 md:gap-4">
        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Accounts items={accounts}></Accounts>
          </div>

          <div className="lg:col-span-1">
            <Transactions items={transactions}></Transactions>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <QuickActions></QuickActions>
          </div>
        </div>

        <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-6">
          <div className="md:col-span-2 lg:col-span-4">
            <AccountPerformanceChart />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <Notifications />
          </div>
        </div>
      </div>
    </main>
  );
}
