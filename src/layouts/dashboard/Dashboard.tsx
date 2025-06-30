import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getDefaultCurrency } from '@/components/utils/currency';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { fetchUserAccountsAction } from '@/features/account/accountSlice';
import { fetchUserAction } from '@/features/auth/authSlice';
import { fetchUserTransactionsAction } from '@/features/transactions/transactionSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { Transaction } from '@/types/Transaction';
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import Accounts from '../../components/account/Accounts';
import Transactions from '../../components/transactions/Transactions';
import QuickActions from './QuickActions';

export default function Dashboard() {
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const accounts: Account[] = useAppSelector(
    (state) => state.accounts.entities
  );
  const transactions: Transaction[] = useAppSelector(
    (state) => state.transactions.entities
  );
  const hasLoaded =
    useAppSelector((state) => state.accounts.getUserAccountsStatus) ===
    'succeeded';

  useEffect(() => {
    if (hasLoaded) {
      const total = accounts
        .map((acc) => Number(acc.balance))
        .reduce((sum, balance) => sum + balance, 0);
      setTotalBalance(total);
    }
  }, [hasLoaded, accounts]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAction());
    dispatch(fetchUserAccountsAction());
    dispatch(fetchUserTransactionsAction());
  }, [dispatch]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-4">
        {/* Total Balance Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/15 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white dark:text-gray-100">
              Total Balance
            </CardTitle>
            <div className="p-2 rounded-full bg-white/20 dark:bg-emerald-700 group-hover:bg-white/30 dark:group-hover:bg-emerald-800 transition-all duration-500 group-hover:rotate-12">
              <Wallet className="h-4 w-4 text-white dark:text-emerald-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            {totalBalance == null ? (
              <Skeleton className="h-8 w-32 bg-white/20 dark:bg-slate-700" />
            ) : (
              <>
                <div className="text-2xl font-bold leading-tight mb-2 text-white dark:text-gray-100 group-hover:text-emerald-100 dark:group-hover:text-gray-200 transition-colors duration-500">
                  {currencyFormatter(
                    accounts[0] != null
                      ? accounts[0].currency
                      : getDefaultCurrency().code,
                    totalBalance
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-emerald-100 dark:text-emerald-300 flex-shrink-0" />
                  <p className="text-xs text-emerald-100 dark:text-emerald-300 leading-tight">
                    +20.1% from last month
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Income Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-800 dark:via-blue-900 dark:to-blue-950 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/15 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white dark:text-gray-100">
              Income
            </CardTitle>
            <div className="p-2 rounded-full bg-white/20 dark:bg-blue-700 group-hover:bg-white/30 dark:group-hover:bg-blue-800 transition-all duration-500 group-hover:rotate-12">
              <TrendingUp className="h-4 w-4 text-white dark:text-blue-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-2xl font-bold leading-tight mb-2 text-white dark:text-gray-100 group-hover:text-blue-100 dark:group-hover:text-gray-200 transition-colors duration-500">
              $6,350.00
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-blue-100 dark:text-blue-300 flex-shrink-0" />
              <p className="text-xs text-blue-100 dark:text-blue-300 leading-tight">
                +4.3% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-800 dark:via-orange-900 dark:to-orange-950 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/15 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white dark:text-gray-100">
              Expenses
            </CardTitle>
            <div className="p-2 rounded-full bg-white/20 dark:bg-orange-700 group-hover:bg-white/30 dark:group-hover:bg-orange-800 transition-all duration-500 group-hover:rotate-12">
              <TrendingDown className="h-4 w-4 text-white dark:text-orange-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-2xl font-bold leading-tight mb-2 text-white dark:text-gray-100 group-hover:text-orange-100 dark:group-hover:text-gray-200 transition-colors duration-500">
              $2,980.45
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-orange-100 dark:text-orange-300 flex-shrink-0" />
              <p className="text-xs text-orange-100 dark:text-orange-300 leading-tight">
                +10.1% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Savings Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 dark:from-purple-800 dark:via-purple-900 dark:to-purple-950 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/40 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-600/3 dark:to-transparent group-hover:from-white/15 dark:group-hover:from-gray-600/5 transition-all duration-500" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white dark:text-gray-100">
              Savings
            </CardTitle>
            <div className="p-2 rounded-full bg-white/20 dark:bg-purple-700 group-hover:bg-white/30 dark:group-hover:bg-purple-800 transition-all duration-500 group-hover:rotate-12">
              <PiggyBank className="h-4 w-4 text-white dark:text-purple-200" />
            </div>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-2xl font-bold leading-tight mb-2 text-white dark:text-gray-100 group-hover:text-purple-100 dark:group-hover:text-gray-200 transition-colors duration-500">
              $12,234.00
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-purple-100 dark:text-purple-300 flex-shrink-0" />
              <p className="text-xs text-purple-100 dark:text-purple-300 leading-tight">
                +18.7% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="main-cards grid gap-4 md:gap-8 lg:grid-cols-3">
        <Accounts items={accounts}></Accounts>
        <Transactions items={transactions}></Transactions>
        <QuickActions></QuickActions>
      </div>
    </main>
  );
}
