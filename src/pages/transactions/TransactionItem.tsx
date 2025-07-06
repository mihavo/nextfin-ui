'use client';

import { ArrowLeftRightIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, sentenceCase } from '@/lib/utils';
import { Transaction, TransactionStatus } from '@/types/Transaction';
import dayjs from 'dayjs';

interface TransactionItemProps {
  transaction: Transaction;
}

const getStatusBadgeColor = (status: TransactionStatus) => {
  switch (status) {
    case 'COMPLETED':
      return 'text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950';
    case 'PENDING':
      return 'text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950';
    case 'CREATED':
      return 'text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950';
    case 'FAILED':
      return 'text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950';
    default:
      return 'text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950';
  }
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const formattedDate = dayjs(transaction.createdAt).format('MMM D, YYYY');
  const formattedTime = dayjs(transaction.createdAt).format('h:mm a');

  const handleToggleExpanded = () => {
    if (isExpanded) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsClosing(false);
      }, 350); // Animation duration
    } else {
      // Open immediately
      setIsExpanded(true);
      setIsClosing(false);
    }
  };

  const isIncome = transaction.amount > 0;
  return (
    <div className="group">
      <div
        className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-sm hover:scale-[1.01]"
        onClick={handleToggleExpanded}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              isIncome
                ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <ArrowLeftRightIcon className="h-5 w-5" />
          </div>
          <div className="grid gap-1">
            <div className="font-semibold text-sm text-foreground">
              {transaction.targetName ?? 'Unknown Recipient'}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{sentenceCase(transaction.category)}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div
              className={cn(
                'font-medium',
                isIncome
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-500 dark:text-red-400'
              )}
            >
              {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {transaction.sourceAccountId}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge
              variant="outline"
              className={`${getStatusBadgeColor(
                transaction.status
              )} text-xs px-1.5 py-0.5`}
            >
              {sentenceCase(transaction.status)}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-muted/50"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleExpanded();
            }}
          >
            <div
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <ChevronDown className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>

      {(isExpanded || isClosing) && (
        <div
          className={`px-4 pb-6 pt-2 transition-all duration-350 ease-out ${
            isClosing
              ? 'animate-out slide-out-to-top-2 fade-out-0'
              : 'animate-in slide-in-from-top-2 fade-in-0'
          }`}
        >
          <div
            className={`rounded-xl border bg-gradient-to-br from-card to-card/80 p-6 text-card-foreground shadow-lg ring-1 ring-border/20 transition-all duration-350 ease-out ${
              isClosing
                ? 'animate-out slide-out-to-top-4 fade-out-0 scale-95'
                : 'animate-in fade-in-0 slide-in-from-top-4 scale-100'
            }`}
          >
            <div
              className={`mb-6 transition-all duration-350 ease-out ${
                isClosing
                  ? 'animate-out slide-out-to-left-4 fade-out-0'
                  : 'animate-in fade-in-0 slide-in-from-left-4'
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Transaction Details
              </h3>
              <div className="h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>

            <div
              className={`grid gap-6 lg:grid-cols-2 transition-all duration-350 ease-out ${
                isClosing
                  ? 'animate-out slide-out-to-bottom-4 fade-out-0'
                  : 'animate-in fade-in-0 slide-in-from-bottom-4'
              }`}
            >
              <div className="space-y-6">
                <div
                  className={`bg-muted/30 rounded-lg p-4 transition-all duration-350 hover:bg-muted/40 hover:shadow-sm ${
                    isClosing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    Transaction Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Transaction ID
                      </span>
                      <span className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                        {transaction.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Date & Time
                      </span>
                      <span className="text-sm text-foreground">
                        {formattedDate} at {formattedTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(transaction.status)}
                      >
                        {sentenceCase(transaction.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>
                      <span className="text-sm text-foreground font-medium">
                        {sentenceCase(transaction.category)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className={`bg-muted/30 rounded-lg p-4 transition-all duration-350 hover:bg-muted/40 hover:shadow-sm ${
                    isClosing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    Payment Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Amount
                      </span>
                      <div className="text-right">
                        <div
                          className={cn(
                            'text-lg font-bold',
                            isIncome
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-500 dark:text-red-400'
                          )}
                        >
                          {isIncome ? '+' : '-'}$
                          {Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.currency}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Source Account
                      </span>
                      <span className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                        {transaction.sourceAccountId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Target Account
                      </span>
                      <span className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                        {transaction.targetAccountId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Recipient
                      </span>
                      <span className="text-sm text-foreground font-medium">
                        {transaction.targetName || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-6 pt-4 border-t border-border/50 transition-all duration-350 ease-out ${
                isClosing
                  ? 'animate-out slide-out-to-bottom-2 fade-out-0'
                  : 'animate-in fade-in-0 slide-in-from-bottom-2'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-xs text-muted-foreground">
                  Last updated:{' '}
                  {dayjs(transaction.updatedAt).format(
                    'MMM D, YYYY [at] h:mm a'
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs transition-all duration-200 hover:scale-105"
                  >
                    Report Issue
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                  >
                    Download Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
