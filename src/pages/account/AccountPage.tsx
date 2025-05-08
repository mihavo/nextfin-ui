'use client';

import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CreditCard,
  Dot,
  Download,
  Filter,
  MoreHorizontal,
  Pencil,
  Search,
  Send,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { GetAccountTransactionsRequest } from '@/features/account/accountApi';
import {
  getAccountByIdAction,
  getAccountTransactionsAction,
  resetStatus,
} from '@/features/account/accountSlice';
import { inferTransactionDirection } from '@/features/transactions/transactionUtils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Transaction } from '@/types/Transaction';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function AccountDetailsPage() {
  const { id: accountId } = useParams();
  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  const themeBg = theme === 'dark' ? 'main-grain-dark' : 'main-grain';

  const [transactionPeriod, setTransactionPeriod] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');

  const account = useAppSelector((state) => state.accounts.currentAccount);
  const transactions: Transaction[] = useAppSelector(
    (state) => state.accounts.currentAccount?.transactions ?? []
  );
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const status = useAppSelector((state) => state.accounts.status);

  useEffect(() => {
    if (accountId) {
      dispatch(getAccountByIdAction(accountId));
    } else {
      toast.error('Account ID is missing');
    }
  }, [accountId, dispatch]);

  useEffect(() => {
    if (account) {
      const request: GetAccountTransactionsRequest = {
        accountId: account.id,
        direction: 'ALL',
      };
      dispatch(getAccountTransactionsAction(request));
    }
  }, [account, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && transactions.length > 0) {
      setFilteredTransactions(transactions);
    }
  }, [status, transactions]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTransactions(
        transactions.filter((tx) =>
          tx.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, transactions]);

  if (status === 'pending') {
    return (
      <div className={`flex min-h-screen w-full flex-col ${themeBg}`}>
        <Breadcrumb />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
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
      case 'checking':
      case 'savings':
        return <Wallet className="h-6 w-6" />;
      case 'credit':
        return <CreditCard className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  const getStatusBadge = () => {
    switch (account.status) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
        );
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'pending':
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500"
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
                    {account.accountType}
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
              {account.accountType === 'savings' && (
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Interest Rate
                  </h3>
                  <div className="text-2xl font-bold">
                    {account.interestRate}
                  </div>
                </div>
              )}
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
              {account.accountType === 'credit' && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Last Update
                  </h3>
                  <p>{new Date(account.lastUpdated).toLocaleDateString()}</p>
                </div>
              )}
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={transactionPeriod}
                  onValueChange={setTransactionPeriod}
                >
                  <SelectTrigger className="account-type-grain h-8 w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Date Range
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="account-type-grain pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>

              {/* All Transactions Tab */}
              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions.length === 0 ? (
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
                      <div
                        key={transaction.id}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {inferTransactionDirection(
                            account.id,
                            transaction
                          ) === 'INCOMING' ? (
                            <ArrowDown className="h-5 w-5 text-green-500" />
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                        </div>
                        <div className="grid flex-1 gap-1">
                          <div className="font-semibold">
                            {transaction.description}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={
                              transaction.amount > 0
                                ? 'text-green-500'
                                : 'text-red-500'
                            }
                          >
                            {transaction.amount > 0 ? '+' : ''}
                            {currencyFormatter(
                              transaction.currency,
                              transaction.amount
                            )}
                          </div>
                          <div className="text-xs capitalize text-muted-foreground">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
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
                        inferTransactionDirection(account.id, tx) === 'INCOMING'
                    )
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <ArrowDown className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="grid flex-1 gap-1">
                          <div className="font-semibold">
                            Description Placeholder
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-500">
                            +
                            {currencyFormatter(
                              transaction.currency,
                              transaction.amount
                            )}
                          </div>
                          <div className="text-xs capitalize text-muted-foreground">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              {/* Withdrawal Transactions */}
              <TabsContent value="withdrawals" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions
                    .filter(
                      (tx) =>
                        inferTransactionDirection(account.id, tx) === 'OUTGOING'
                    )
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <ArrowUp className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="grid flex-1 gap-1">
                          <div className="font-semibold">
                            Description Placeholder
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-500">
                            {currencyFormatter(
                              transaction.currency,
                              transaction.amount
                            )}
                          </div>
                          <div className="text-xs capitalize text-muted-foreground">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
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
