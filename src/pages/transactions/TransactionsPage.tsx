'use client';


import {
  ArrowDownUp,
  ArrowLeft,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Search,
  Send,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchUserTransactionsAction } from '@/features/transactions/transactionSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';
import NewTransactionModal from './NewTransactionModal';
import { TransactionItem } from './TransactionItem';

export function TransactionsPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.entities);

  useEffect(() => {
    dispatch(fetchUserTransactionsAction());
  }, [dispatch]);

  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const [account, setAccount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateFilters = (
    filters: Partial<{
      account: string;
      category: string;
      sortBy: string;
      sortOrder: 'asc' | 'desc';
      page: string;
    }>
  ) => {
    if (filters.account !== undefined) {
      setAccount(filters.account);
      setPage(1);
    }
    if (filters.category !== undefined) {
      setCategory(filters.category);
      setPage(1);
    }
    if (filters.sortBy !== undefined) {
      setSortBy(filters.sortBy);
    }
    if (filters.sortOrder !== undefined) {
      setSortOrder(filters.sortOrder);
    }
    if (filters.page !== undefined) {
      setPage(Number(filters.page));
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 px-4 md:px-16 py-4 md:py-8">
      <div className="flex flex-col gap-4 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Transactions</h1>
          </div>
          <Button
            asChild
            variant="default"
            className="dark:text-white"
            onClick={() => setIsModalOpen(true)}
          >
            <div>
              <Send className="mr-2 h-4 w-4" />
              New Transaction
            </div>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <ArrowDownUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Income
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +$
                    {transactions
                      .filter((tx) => tx.amount > 0)
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Expenses
                  </p>
                  <p className="text-2xl font-bold text-red-500 dark:text-red-400">
                    -$
                    {Math.abs(
                      transactions
                        .filter((tx) => tx.amount < 0)
                        .reduce((sum, tx) => sum + tx.amount, 0)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-red-500 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    placeholder="Search transactions..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <Select
                  value={account}
                  onValueChange={(value) => updateFilters({ account: value })}
                >
                  <SelectTrigger className="h-8 w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Accounts</SelectLabel>
                      {/* {accounts.map((acc) => (
                        <SelectItem key={acc} value={acc}>
                          {acc}
                        </SelectItem>
                      ))} */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  value={category}
                  onValueChange={(value) => updateFilters({ category: value })}
                >
                  <SelectTrigger className="h-8 w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {/* {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))} */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className=" gap-1 w-full sm:w-auto"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Date Range</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Select Period</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Last 30 days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Last 90 days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      This year
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Last year
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Custom range
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className=" gap-1 w-full sm:w-auto"
                    >
                      <ArrowDownUp className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={sortBy === 'date' && sortOrder === 'desc'}
                      onClick={() =>
                        updateFilters({ sortBy: 'date', sortOrder: 'desc' })
                      }
                    >
                      Date (newest first)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === 'date' && sortOrder === 'asc'}
                      onClick={() =>
                        updateFilters({ sortBy: 'date', sortOrder: 'asc' })
                      }
                    >
                      Date (oldest first)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === 'amount' && sortOrder === 'desc'}
                      onClick={() =>
                        updateFilters({ sortBy: 'amount', sortOrder: 'desc' })
                      }
                    >
                      Amount (highest first)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === 'amount' && sortOrder === 'asc'}
                      onClick={() =>
                        updateFilters({ sortBy: 'amount', sortOrder: 'asc' })
                      }
                    >
                      Amount (lowest first)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === 'description' && sortOrder === 'asc'}
                      onClick={() =>
                        updateFilters({
                          sortBy: 'description',
                          sortOrder: 'asc',
                        })
                      }
                    >
                      Description (A-Z)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === 'description' && sortOrder === 'desc'}
                      onClick={() =>
                        updateFilters({
                          sortBy: 'description',
                          sortOrder: 'desc',
                        })
                      }
                    >
                      Description (Z-A)
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className=" gap-1 w-full sm:w-auto">
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="space-y-1">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        No transactions found
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="income" className="mt-0">
                <div className="space-y-1">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        No income transactions found
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="expenses" className="mt-0">
                <div className="space-y-1">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        No expense transactions found
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
              Showing {paginatedTransactions.length} of {transactions.length}{' '}
              transactions
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) {
                        updateFilters({ page: (page - 1).toString() });
                      }
                    }}
                    className={
                      page <= 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum: number;

                  if (totalPages <= 5 || totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          updateFilters({ page: pageNum.toString() });
                        }}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) {
                        updateFilters({ page: (page + 1).toString() });
                      }
                    }}
                    className={
                      page >= totalPages ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
          <NewTransactionModal
            isModalOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
        </Card>
      </div>
    </div>
  );
}
