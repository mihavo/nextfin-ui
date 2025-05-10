'use client';

import {
  Calendar,
  Dot,
  Download,
  Filter,
  MoreHorizontal,
  Pencil,
  PiggyBank,
  Search,
  Send,
  Shield,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import AccountTransactionItem from '@/components/account/AccountTransactionItem';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import { useTheme } from '@/components/theme/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { GetAccountTransactionsRequest } from '@/features/account/accountApi';
import {
  getAccountByIdAction,
  getAccountTransactionsAction,
  resetStatus,
} from '@/features/account/accountSlice';
import {
  filterTransactionsByDate,
  inferTransactionDirection,
} from '@/features/transactions/transactionUtils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { DatePeriod } from '@/types/Dates';
import { Transaction } from '@/types/Transaction';
import { Link, useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';

export default function AccountDetailsPage() {
  const { id: accountId } = useParams();
  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  const themeBg = theme === 'dark' ? 'main-grain-dark' : 'main-grain';

  const [transactionPeriod, setTransactionPeriod] = useState<DatePeriod>('7d');
  const [searchQuery, setSearchQuery] = useState('');

  const account = useAppSelector(
    (state) => state.accounts.currentAccount
  ) as Account;
  const transactions: Transaction[] = useAppSelector(
    (state) => state.accounts.currentAccount?.transactions ?? []
  );
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const getAccountTransactionsStatus = useAppSelector(
    (state) => state.accounts.getAccountTransactionsStatus
  );
  const getAccountByIdStatus = useAppSelector(
    (state) => state.accounts.getAccountByIdStatus
  );

  useEffect(() => {
    if (accountId) {
      dispatch(getAccountByIdAction(accountId));
    } else {
      toast.error('Account ID is missing');
    }
  }, [accountId, dispatch]);

  useEffect(() => {
    if (account?.id && getAccountByIdStatus === 'succeeded') {
      const request: GetAccountTransactionsRequest = {
        accountId: account.id.toString(),
        options: {
          direction: 'ALL',
          pageSize: 7,
          sortBy: 'CREATED_AT',
          sortDirection: 'DESC',
        },
      };
      dispatch(getAccountTransactionsAction(request));
    }
  }, [account?.id, getAccountByIdStatus, dispatch]);

  useEffect(() => {
    if (
      getAccountByIdStatus === 'succeeded' ||
      getAccountByIdStatus === 'failed'
    ) {
      dispatch(resetStatus('getAccountByIdStatus'));
    }
  }, [getAccountByIdStatus, dispatch]);

  useEffect(() => {
    if (
      getAccountTransactionsStatus === 'succeeded' &&
      transactions.length > 0
    ) {
      setFilteredTransactions(transactions);
    }
  }, [getAccountTransactionsStatus, transactions]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTransactions(
        transactions.filter(
          (tx) =>
            tx.category?.toLowerCase().includes(searchQuery.toLowerCase()) ??
            true
        )
      );
    } else setFilteredTransactions(transactions);
  }, [searchQuery, transactions]);

  useEffect(() => {
    console.log(filterTransactionsByDate(transactions, transactionPeriod));
    setFilteredTransactions(
      filterTransactionsByDate(transactions, transactionPeriod)
    );
  }, [transactionPeriod, transactions]);

  if (getAccountByIdStatus === 'pending') {
    return (
      <div className={`flex min-h-screen w-full flex-col ${themeBg}`}>
        <Breadcrumb />
        <div className="flex flex-1 items-center justify-center w-1/2 mx-auto">
          <BarLoader
            height="10px"
            width="35vw"
            className="rounded"
            color={theme === 'dark' ? '#ccc' : '#18181B'}
          />
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className={`flex min-h-screen w-full flex-col ${themeBg}`}>
        <Breadcrumb />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Account Not Found</h2>
            <p className="mt-2 text-muted-foreground">
              The account you're looking for doesn't exist or you don't have
              access to it.
            </p>
            <Button asChild className="mt-4 text-white">
              <Link to="/">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getAccountIcon = () => {
    switch (account.accountType) {
      case 'CHECKING':
        return <PiggyBank className="h-6 w-6" />;
      case 'TRUST':
        return <Shield className="h-6 w-6" />;
      case 'SAVINGS':
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  const getStatusBadge = () => {
    switch (account.status) {
      case 'ACTIVE':
        return (
          <Badge className="bg-emerald-400 rounded hover:bg-emerald-300 transition-all duration-300">
            Active
          </Badge>
        );
      case 'INACTIVE':
        return (
          <Badge variant="secondary" className="rounded">
            Inactive
          </Badge>
        );
      case 'CLOSED':
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500 rounded border-orange-500"
          >
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex min-h-screen w-full flex-col ${themeBg}`}>
      <Breadcrumb />

      <main className={` relative flex flex-1 flex-col p-4 md:p-6 mx-56`}>
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {getAccountIcon()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">
                    {account.friendlyName ?? `Account No #{account.id}`}
                  </CardTitle>
                  {getStatusBadge()}
                </div>
                <CardDescription className="mt-1 flex items-center gap-0.5">
                  <span
                    className={`font-semibold ${
                      theme === 'dark' ? 'text-emerald-300' : 'text-emerald-400'
                    } `}
                  >
                    {account.id}
                  </span>
                  <Dot></Dot>
                  <span className="text-emerald-400 font-semibold">
                    {account.accountType.charAt(0).toUpperCase() +
                      account.accountType.slice(1).toLowerCase()}
                  </span>
                </CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit Account Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Statements</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="mr-2 h-4 w-4" />
                  <span>Transfer Money</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Current Balance
                </h3>
                <div className="text-2xl font-bold">
                  {currencyFormatter(account.currency, account.balance)}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Available Balance
                </h3>
                <div className="text-2xl font-bold">
                  {currencyFormatter(account.currency, account.balance)}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Account ID
                </h3>
                <div className="text-2xl font-bold">{account.id}</div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Opened On
                </h3>
                <p>{new Date(account.dateOpened).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Currency
                </h3>
                <p>{account.currency}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Last Update
                </h3>
                <p>{new Date(account.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Send className="h-3.5 w-3.5" />
                Transfer
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Transactions Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between flex-wrap">
              <CardTitle className="text-lg md:text-2xl">
                Transaction History
              </CardTitle>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  defaultValue={transactionPeriod}
                  onValueChange={(value) =>
                    setTransactionPeriod(value as DatePeriod)
                  }
                >
                  <SelectTrigger className="h-8 w-full sm:w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">This year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 w-full sm:w-auto"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 w-full sm:w-auto"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="flex w-full ">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>

              {/* All Transactions Tab */}
              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  {getAccountTransactionsStatus === 'pending' ? (
                    <>
                      <Skeleton className="p-2 h-5 w-1/4" />
                      <Skeleton className="p-2 h-5 w-1/3" />
                      <Skeleton className="p-2 h-5 w-1/2" />
                    </>
                  ) : filteredTransactions.length === 0 ? (
                    <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
                      <p className="text-sm font-medium">
                        No transactions found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <AccountTransactionItem
                        key={transaction.id}
                        accountId={account.id.toString()}
                        transaction={transaction}
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Deposit Transactions */}
              <TabsContent value="deposits" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions
                    .filter(
                      (tx) =>
                        inferTransactionDirection(account.id.toString(), tx) ===
                        'INCOMING'
                    )
                    .map((transaction) => (
                      <AccountTransactionItem
                        accountId={account.id.toString()}
                        transaction={transaction}
                      />
                    ))}
                </div>
              </TabsContent>

              {/* Withdrawal Transactions */}
              <TabsContent value="withdrawals" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions
                    .filter(
                      (tx) =>
                        inferTransactionDirection(account.id.toString(), tx) ===
                        'OUTGOING'
                    )
                    .map((transaction) => (
                      <AccountTransactionItem
                        accountId={account.id.toString()}
                        transaction={transaction}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-xs text-muted-foreground">
              Showing {filteredTransactions.length} transactions
            </div>
            <Button variant="outline" className="gap-1">
              <Download className="h-3.5 w-3.5" />
              Export Transactions
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
} 
