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
import { DollarSign } from 'lucide-react';
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

  useEffect(() => {});
  return (
    <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-4 h-36">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {totalBalance == null ? (
              <Skeleton className="p-2 h-5 w-1/2" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {currencyFormatter(
                    accounts[0] != null
                      ? accounts[0].currency
                      : getDefaultCurrency().code,
                    totalBalance
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,350.00</div>
            <p className="text-xs text-muted-foreground">
              +4.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,980.45</div>
            <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234.00</div>
            <p className="text-xs text-muted-foreground">
              +18.7% from last month
            </p>
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
