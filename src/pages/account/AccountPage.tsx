import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Check,
  Copy,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Pencil,
  PiggyBank,
  Search,
  Send,
  Shield,
  TrendingDown,
  TrendingUp,
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
import { currencyFormatter, mapCurrencyToFlag } from '@/components/utils/currency-formatter';
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
import { friendlyFormatIBAN } from 'ibantools';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import NewTransactionModal from '../transactions/NewTransactionModal';

export default function AccountDetailsPage() {
  const { id: accountId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { theme } = useTheme();

  const [transactionPeriod, setTransactionPeriod] = useState<DatePeriod>('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [ibanCopied, setIbanCopied] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

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
      navigate('/accounts');
    }
  }, [accountId, dispatch, navigate]);

  useEffect(() => {
    if (account?.id && getAccountByIdStatus === 'succeeded') {
      const request: GetAccountTransactionsRequest = {
        accountId: account.id.toString(),
        options: {
          direction: 'ALL',
          pageSize: 20,
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
    let filtered = transactions;
    filtered = filterTransactionsByDate(filtered, transactionPeriod);
    if (searchQuery) {
      filtered = filtered.filter(
        (tx) =>
          tx.category?.toLowerCase().includes(searchQuery.toLowerCase()) ?? true
      );
    }
    setFilteredTransactions(filtered);
  }, [searchQuery, transactionPeriod, transactions]);

  const handleIbanCopy = async () => {
    await navigator.clipboard.writeText(account.iban);
    setIbanCopied(true);
    setTimeout(() => {
      setIbanCopied(false);
    }, 3000);
  };

  const toggleTransferModal = () => {
    setTransferModalOpen(true);
  };

  // Calculate transaction statistics
  const incomingTransactions = filteredTransactions.filter(
    (tx) => inferTransactionDirection(account?.id.toString(), tx) === 'INCOMING'
  );
  const outgoingTransactions = filteredTransactions.filter(
    (tx) => inferTransactionDirection(account?.id.toString(), tx) === 'OUTGOING'
  );
  
  const totalIncoming = incomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalOutgoing = outgoingTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  if (getAccountByIdStatus === 'pending') {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/10">
        <Breadcrumb />
        <div className="flex flex-1 items-center justify-center">
          <BarLoader
            height="8px"
            width="200px"
            className="rounded"
            color={theme === 'dark' ? '#ffffff' : '#000000'}
          />
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/10">
        <Breadcrumb />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold">Account Not Found</h2>
            <p className="text-muted-foreground max-w-md">
              The account you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button asChild className="mt-4">
              <Link to="/accounts">Back to Accounts</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getAccountIcon = () => {
    switch (account.accountType) {
      case 'CHECKING':
        return <PiggyBank className="h-5 w-5" />;
      case 'TRUST':
        return <Shield className="h-5 w-5" />;
      case 'SAVINGS':
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  const getStatusBadge = () => {
    switch (account.status) {
      case 'ACTIVE':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
            Active
          </Badge>
        );
      case 'INACTIVE':
        return (
          <Badge variant="secondary" className="bg-gray-500/10 text-gray-600 border-gray-500/20">
            Inactive
          </Badge>
        );
      case 'CLOSED':
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/10">
      <Breadcrumb />

      <main className="flex-1 space-y-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* Account Header */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Account Card */}
          <Card className="md:col-span-2 border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    {getAccountIcon()}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {account.friendlyName ?? `Account ${account.id}`}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-sm">
                        {friendlyFormatIBAN(account.iban)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={handleIbanCopy}
                      >
                        {ibanCopied ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge()}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export Statements
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={toggleTransferModal}>
                        <Send className="mr-2 h-4 w-4" />
                        Transfer Money
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Balance</p>
                <p className="text-3xl font-bold">
                  {currencyFormatter(account.currency, account.balance)}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/30 dark:border-purple-800/30 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide relative z-10">Account Type</p>
                  <div className="flex items-center gap-2 relative z-10">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                      {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1).toLowerCase()}
                    </Badge>
                    {getAccountIcon()}
                  </div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/30 dark:border-green-800/30 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide relative z-10">Currency</p>
                  <div className="flex items-center gap-2 relative z-10">
                    <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                      {account.currency}
                    </Badge>
                    {mapCurrencyToFlag(account.currency)}
                  </div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/30 dark:border-blue-800/30 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide relative z-10">Date Opened</p>
                  <div className="flex items-center gap-2 relative z-10">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                      {new Date(account.dateOpened).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Badge>
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border border-orange-200/30 dark:border-orange-800/30 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide relative z-10">Last Updated</p>
                  <div className="flex items-center gap-2 relative z-10">
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800">
                      {new Date(account.lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Badge>
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  onClick={toggleTransferModal}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Transfer Money
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Account
                </Button>
              </CardContent>
            </Card>

            {/* Transaction Summary */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Transaction Summary</CardTitle>
                <CardDescription>Last {transactionPeriod}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <ArrowDownRight className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Money In</p>
                      <p className="text-xs text-muted-foreground">
                        {incomingTransactions.length} transactions
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-emerald-600">
                    {currencyFormatter(account.currency, totalIncoming)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Money Out</p>
                      <p className="text-xs text-muted-foreground">
                        {outgoingTransactions.length} transactions
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-600">
                    {currencyFormatter(account.currency, totalOutgoing)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transactions Section */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Transaction History</CardTitle>
                <CardDescription>
                  {filteredTransactions.length} transactions found
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9 sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={transactionPeriod}
                  onValueChange={(value) => setTransactionPeriod(value as DatePeriod)}
                >
                  <SelectTrigger className="sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">This year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="deposits" className="text-emerald-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Money In ({incomingTransactions.length})
                </TabsTrigger>
                <TabsTrigger value="withdrawals" className="text-red-600">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  Money Out ({outgoingTransactions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-2">
                  {getAccountTransactionsStatus === 'pending' ? (
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-3 w-1/3" />
                          </div>
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))}
                    </div>
                  ) : filteredTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search filters or time period
                      </p>
                      <Button variant="outline" onClick={() => setSearchQuery('')}>
                        Clear Filters
                      </Button>
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

              <TabsContent value="deposits" className="mt-6">
                <div className="space-y-2">
                  {incomingTransactions.length === 0 ? (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No incoming transactions found</p>
                    </div>
                  ) : (
                    incomingTransactions.map((transaction) => (
                      <AccountTransactionItem
                        key={transaction.id}
                        accountId={account.id.toString()}
                        transaction={transaction}
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="withdrawals" className="mt-6">
                <div className="space-y-2">
                  {outgoingTransactions.length === 0 ? (
                    <div className="text-center py-8">
                      <TrendingDown className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No outgoing transactions found</p>
                    </div>
                  ) : (
                    outgoingTransactions.map((transaction) => (
                      <AccountTransactionItem
                        key={transaction.id}
                        accountId={account.id.toString()}
                        transaction={transaction}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <NewTransactionModal
          isModalOpen={transferModalOpen}
          onOpenChange={setTransferModalOpen}
        />
      </main>
    </div>
  );
}
