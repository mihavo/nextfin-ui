'use client';

import { ArrowLeftRightIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types/Transaction';
import dayjs from 'dayjs';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = dayjs(transaction.createdAt).format('MMM d, yyyy');
  const formattedTime = dayjs(transaction.createdAt).format('h:mm a');

  const isIncome = transaction.amount > 0;

  return (
    <div className="group">
      <div
        className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              isIncome
                ? 'bg-green-100 text-green-600'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <ArrowLeftRightIcon className="h-5 w-5" />
          </div>
          <div className="grid gap-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{transaction.category}</span>
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
                isIncome ? 'text-green-600' : 'text-red-500'
              )}
            >
              {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {transaction.sourceAccountId}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Transaction Details
                  </h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Transaction ID</div>
                    <div>{transaction.id}</div>
                    <div className="font-medium">Date & Time</div>
                    <div>
                      {formattedDate} at {formattedTime}
                    </div>
                    <div className="font-medium">Status</div>
                    <div className="capitalize">
                      <Badge variant="outline" className="capitalize">
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="font-medium">Category</div>
                    <div>{transaction.category}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Payment Details
                  </h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Amount</div>
                    <div
                      className={cn(
                        'font-medium',
                        isIncome ? 'text-green-600' : 'text-red-500'
                      )}
                    >
                      {isIncome ? '+' : '-'}$
                      {Math.abs(transaction.amount).toFixed(2)}{' '}
                      {transaction.currency}
                    </div>
                    <div className="font-medium">Account</div>
                    <div>{transaction.sourceAccountId}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Report Issue
              </Button>
              <Button size="sm">Download Receipt</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
