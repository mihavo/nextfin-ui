'use client';

import type React from 'react';

import {
  ArrowDownUp,
  ArrowLeft,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Search,
  Send,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
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
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';

export function TransactionsPage() {
  const navigate = useNavigate();
  const transactions = useAppSelector((state) => state.transactions.entities);

  useEffect(() => {}, []);
  const [searchInput, setSearchInput] = useState('');

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockTransactions.length / itemsPerPage);

  const filteredTransactions = mockTransactions
    .filter((tx) => {
      if (
        search &&
        !tx.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Filter by tab
      if (tab === 'income' && tx.amount <= 0) return false;
      if (tab === 'expenses' && tx.amount > 0) return false;

      // Filter by category
      if (category !== 'All Categories' && tx.category !== category)
        return false;

      // Filter by account
      if (account !== 'All Accounts' && tx.account !== account) return false;

      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortBy === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }

      if (sortBy === 'description') {
        return sortOrder === 'asc'
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      }

      return 0;
    });

  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Update URL with new filters
  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update params with new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    if (!newFilters.hasOwnProperty('page')) {
      params.set('page', '1');
    }

    router.push(`/transactions?${params.toString()}`);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Transactions</h1>
          </div>
          <Button asChild>
            <Link href="/transactions/new">
              <Send className="mr-2 h-4 w-4" />
              New Transaction
            </Link>
          </Button>
        </div>

        {/* Transaction Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredTransactions.length}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowDownUp className="h-4 w-4 text-blue-600" />
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
                  <p className="text-2xl font-bold text-green-600">
                    +$
                    {filteredTransactions
                      .filter((tx) => tx.amount > 0)
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
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
                  <p className="text-2xl font-bold text-red-500">
                    -$
                    {Math.abs(
                      filteredTransactions
                        .filter((tx) => tx.amount < 0)
                        .reduce((sum, tx) => sum + tx.amount, 0)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={tab}
              onValueChange={(value) => updateFilters({ tab: value })}
            >
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-2">
                  <Select
                    value={account}
                    onValueChange={(value) => updateFilters({ account: value })}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Accounts</SelectLabel>
                        {accounts.map((acc) => (
                          <SelectItem key={acc} value={acc}>
                            {acc}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    value={category}
                    onValueChange={(value) =>
                      updateFilters({ category: value })
                    }
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Calendar className="mr-2 h-4 w-4" />
                        Date Range
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
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="w-full pl-8"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="secondary">
                    Search
                  </Button>
                </form>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    Filters
                    {(category !== 'All Categories' ||
                      account !== 'All Accounts' ||
                      search) && (
                      <Badge variant="secondary" className="ml-2">
                        {(category !== 'All Categories' ? 1 : 0) +
                          (account !== 'All Accounts' ? 1 : 0) +
                          (search ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <ArrowDownUp className="mr-2 h-3.5 w-3.5" />
                        Sort
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
                        checked={
                          sortBy === 'description' && sortOrder === 'asc'
                        }
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
                        checked={
                          sortBy === 'description' && sortOrder === 'desc'
                        }
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
                </div>

                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Export
                </Button>
              </div>

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
              Showing {paginatedTransactions.length} of{' '}
              {filteredTransactions.length} transactions
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
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

                  // Logic to show relevant page numbers
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
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
                    href="#"
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
        </Card>
      </div>
    </div>
  );
}
