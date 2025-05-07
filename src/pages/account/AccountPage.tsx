'use client';

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Calendar,
  ChevronRight,
  CreditCard,
  Download,
  Filter,
  Home,
  MoreHorizontal,
  Pencil,
  Search,
  Send,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
import {
  getAccountByIdAction,
  resetStatus,
} from '@/features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Sample transaction data
const transactions = [
  {
    id: 'tx1',
    date: '2023-05-01',
    description: 'Amazon',
    category: 'Online Shopping',
    amount: -34.59,
    type: 'purchase',
    status: 'completed',
  },
  {
    id: 'tx2',
    date: '2023-05-01',
    description: 'Starbucks',
    category: 'Food & Drink',
    amount: -5.25,
    type: 'purchase',
    status: 'completed',
  },
  {
    id: 'tx3',
    date: '2023-04-30',
    description: 'Payroll Deposit',
    category: 'Income',
    amount: 2450.0,
    type: 'deposit',
    status: 'completed',
  },
  {
    id: 'tx4',
    date: '2023-04-28',
    description: 'Netflix',
    category: 'Subscription',
    amount: -14.99,
    type: 'purchase',
    status: 'completed',
  },
  {
    id: 'tx5',
    date: '2023-04-27',
    description: 'Uber',
    category: 'Transportation',
    amount: -28.5,
    type: 'purchase',
    status: 'completed',
  },
  {
    id: 'tx6',
    date: '2023-04-25',
    description: 'Transfer to Savings',
    category: 'Transfer',
    amount: -500.0,
    type: 'transfer',
    status: 'completed',
  },
  {
    id: 'tx7',
    date: '2023-04-22',
    description: 'Grocery Store',
    category: 'Groceries',
    amount: -78.35,
    type: 'purchase',
    status: 'completed',
  },
  {
    id: 'tx8',
    date: '2023-04-20',
    description: 'Gas Station',
    category: 'Transportation',
    amount: -45.82,
    type: 'purchase',
    status: 'completed',
  },
  {
    id: 'tx9',
    date: '2023-04-15',
    description: 'Payroll Deposit',
    category: 'Income',
    amount: 2450.0,
    type: 'deposit',
    status: 'completed',
  },
  {
    id: 'tx10',
    date: '2023-04-12',
    description: 'Restaurant',
    category: 'Food & Drink',
    amount: -65.37,
    type: 'purchase',
    status: 'completed',
  },
];

export default function AccountDetailsPage() {
  const { id: accountId } = useParams();
  const dispatch = useAppDispatch();
  const [transactionPeriod, setTransactionPeriod] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const account = useAppSelector((state) => state.accounts.currentAccount);
  const status = useAppSelector((state) => state.accounts.status);

  useEffect(() => {
    if (accountId) {
      dispatch(getAccountByIdAction(accountId));
    } else {
      toast.error('Account ID is missing');
    }
  }, [accountId, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Filter transactions based on search query
    if (searchQuery) {
      setFilteredTransactions(
        transactions.filter(
          (tx) =>
            tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchQuery]);

  if (status === 'pending') {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to dashboard</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Account Details</h1>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to dashboard</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Account Details</h1>
        </header>
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: account.currency || 'USD',
    }).format(amount);
  };

  const getAccountIcon = () => {
    switch (account.type) {
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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Account Details</h1>
      </header>

      {/* Breadcrumb navigation */}
      <nav className="z-10 border-b bg-background/80 px-4 py-3 backdrop-blur-sm md:px-6">
        <ol className="flex items-center text-sm">
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <Home className="mr-1 h-3.5 w-3.5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mx-2 text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Accounts
            </Link>
          </li>
          <li className="mx-2 text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <span className="font-medium text-foreground">{account.name}</span>
          </li>
        </ol>
      </nav>

      <main className="main-grain relative flex flex-1 flex-col p-4 md:p-6">
        {/* Account Summary Card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {getAccountIcon()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{account.name}</CardTitle>
                  {getStatusBadge()}
                </div>
                <CardDescription>
                  {account.accountNumber} •{' '}
                  {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
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
                  {formatCurrency(account.balance)}
                </div>
              </div>

              {account.type === 'credit' ? (
                <>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Available Credit
                    </h3>
                    <div className="text-2xl font-bold">
                      {formatCurrency(account.availableCredit)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Credit Limit
                    </h3>
                    <div className="text-2xl font-bold">
                      {formatCurrency(account.creditLimit)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Minimum Payment
                    </h3>
                    <div className="text-2xl font-bold">
                      {formatCurrency(account.minimumPayment)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Available Balance
                    </h3>
                    <div className="text-2xl font-bold">
                      {formatCurrency(account.availableBalance)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Routing Number
                    </h3>
                    <div className="text-2xl font-bold">
                      {account.routingNumber}
                    </div>
                  </div>
                  {account.type === 'savings' && (
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Interest Rate
                      </h3>
                      <div className="text-2xl font-bold">
                        {account.interestRate}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <Separator className="my-6" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Account Manager
                </h3>
                <p>{account.manager}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Opened On
                </h3>
                <p>{new Date(account.openedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Currency
                </h3>
                <p>{account.currency}</p>
              </div>
              {account.type === 'credit' && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Payment Due Date
                  </h3>
                  <p>{new Date(account.dueDate).toLocaleDateString()}</p>
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
                <TabsTrigger value="transfers">Transfers</TabsTrigger>
              </TabsList>
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
                          {transaction.type === 'deposit' ? (
                            <ArrowDown className="h-5 w-5 text-green-500" />
                          ) : transaction.type === 'transfer' ? (
                            <Send className="h-5 w-5" />
                          ) : (
                            <CreditCard className="h-5 w-5" />
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
                              {new Date(transaction.date).toLocaleDateString()}
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
                            {formatCurrency(transaction.amount)}
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
              <TabsContent value="deposits" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions
                    .filter((tx) => tx.amount > 0)
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
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-500">
                            +{formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-xs capitalize text-muted-foreground">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="withdrawals" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions
                    .filter((tx) => tx.amount < 0 && tx.type === 'purchase')
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
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-500">
                            {formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-xs capitalize text-muted-foreground">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="transfers" className="pt-4">
                <div className="space-y-4">
                  {filteredTransactions
                    .filter((tx) => tx.type === 'transfer')
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Send className="h-5 w-5" />
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
                              {new Date(transaction.date).toLocaleDateString()}
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
                            {formatCurrency(transaction.amount)}
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
