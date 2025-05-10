import {
  Calendar,
  Check,
  Command,
  CreditCard,
  ExternalLink,
  Search,
  Send,
  Wallet,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Checkbox } from '@/components/ui/checkbox';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { fetchUserAccountsAction } from '@/features/account/accountSlice';
import { newTransactionSchema } from '@/features/transactions/schemas/transactionSchema';
import { resetStatus } from '@/features/transactions/transactionSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

export default function NewTransactionPage() {
  const handleNewTransaction = () => {};

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(
    (state) => state.transactions.newTransactionStatus
  );
  const transaction = useAppSelector(
    (state) => state.transactions.newTransaction
  );
  const accounts = useAppSelector((state) => state.accounts.entities);

  const [selectedSourceAccount, setSelectedSourceAccount] = useState<Account>(
    accounts[0]
  );

  const getRecipientLabel = () => {
    switch (transactionType) {
      case 'ACCOUNT':
        return 'To Account';
      case 'CARD':
        return 'To Card';
      case 'EXTERNAL':
        return 'External Recipient';
      default:
        return 'Recipient';
    }
  };

  const form = useForm<z.infer<typeof newTransactionSchema>>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      amount: 0,
      sourceAccountId: 0,
      targetAccountId: 0,
      transactionType: 'ACCOUNT',
      isScheduled: false,
      timestamp: undefined,
    },
  });

  const transactionType = form.watch('transactionType');
  const sourceAccountId = form.watch('sourceAccountId');

  const [searchQuery, setSearchQuery] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Account | null>(
    null
  );

  useEffect(() => {
    const account = accounts.find((account) => account.id === sourceAccountId);
    if (account) setSelectedSourceAccount(account);
  }, [sourceAccountId, accounts]);

  useEffect(() => {
    if (status === 'succeeded') {
      setTimeout(() => {
        dispatch(resetStatus('newTransactionStatus'));
      }, 2000);
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (accounts.length === 0) {
      dispatch(fetchUserAccountsAction());
    }
  }, [accounts, dispatch]);

  const handleSubmit = (data: z.infer<typeof newTransactionSchema>) => {};

  return (
    <main className="main-grain relative flex flex-1 flex-col items-center justify-center p-6 md:p-10">
      <Card className="relative mx-auto w-full max-w-2xl shadow-xl">
        {status === 'succeeded' && transaction ? (
          <div className="success-message">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl">
                  Transaction Submitted!
                </CardTitle>
                <CardDescription className="mt-2 text-center">
                  Your transaction has been submitted for processing and will be
                  completed shortly.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Transaction ID
                    </h4>
                    <p className="font-mono text-sm">
                      {transaction.transactionId}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Status
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>Processing</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Type
                    </h4>
                    <p className="capitalize">
                      {form.getValues('transactionType')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Amount
                    </h4>
                    <p className="font-semibold">
                      {currencyFormatter(
                        transaction.currency,
                        transaction.amount
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      From Account
                    </h4>
                    <p>{form.getValues('sourceAccountId')})</p>
                  </div>
                  <div className="space-y-1">
                    <p>{form.getValues('targetAccountId')}</p>
                  </div>
                  {form.getValues('isScheduled') && (
                    <div className="col-span-2 space-y-1">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Scheduled For
                      </h4>
                      <p className="text-sm">{form.getValues('timestamp')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">What happens next?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your transaction is being processed and will be completed
                      shortly. You'll receive a notification when it's done.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate('/')}
              >
                Return to Dashboard
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={handleNewTransaction}
              >
                Create Another Transaction
              </Button>
            </CardFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle>Create New Transaction</CardTitle>
                <CardDescription>
                  Send money, pay bills, or transfer between accounts
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="transactionType"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>Transaction Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                          disabled={status === 'pending'}
                        >
                          <div>
                            <RadioGroupItem
                              value="account"
                              id="account"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="account"
                              className="account-type-grain flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Wallet className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">
                                Account
                              </span>
                            </FormLabel>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="card"
                              id="card"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="card"
                              className="account-type-grain flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <CreditCard className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">Card</span>
                            </FormLabel>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="external"
                              id="external"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="external"
                              className="account-type-grain flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <ExternalLink className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">
                                External
                              </span>
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        {transactionType === 'ACCOUNT'
                          ? 'Transfer money between your accounts'
                          : transactionType === 'CARD'
                          ? 'Make a payment to your credit card'
                          : 'Send money to an external account or service'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceAccountId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>From Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                        disabled={status === 'pending'}
                      >
                        <FormControl>
                          <SelectTrigger className="account-type-grain">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={account.id.toString()}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>
                                  {account.friendlyName ??
                                    `Account No #${account.id}`}
                                </span>
                                <span className="text-muted-foreground">
                                  ${account.balance.toFixed(2)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Available balance:{' '}
                        {currencyFormatter(
                          selectedSourceAccount.currency,
                          selectedSourceAccount.balance
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAccountId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>{getRecipientLabel()}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <div className="flex items-center">
                              <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder={`Search by name or ${
                                    transactionType === 'EXTERNAL'
                                      ? 'details'
                                      : 'account ID'
                                  }`}
                                  className="account-type-grain pl-9 pr-10"
                                  value={searchQuery}
                                  onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setOpenCombobox(true);
                                  }}
                                  onFocus={() => setOpenCombobox(true)}
                                  disabled={status === 'pending'}
                                />
                                {searchQuery && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-7 w-7 rounded-full p-0"
                                    onClick={() => {
                                      setSearchQuery('');
                                      setSelectedRecipient(null);
                                      form.setValue('targetAccountId', '');
                                    }}
                                    type="button"
                                    disabled={status === 'pending'}
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Clear</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                            {openCombobox && (
                              <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
                                <Command className="rounded-md">
                                  <CommandList>
                                    <CommandEmpty>
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {getFilteredRecipients().map((item) => {
                                        let primaryText = '';
                                        let secondaryText = '';

                                        if ('holder' in item) {
                                          // Account or card
                                          primaryText = item.name;
                                          secondaryText = `${item.holder} • ****${item.id}`;
                                        } else {
                                          // External recipient
                                          primaryText = item.name;
                                          secondaryText =
                                            item.accountNumber ||
                                            item.username ||
                                            item.phone ||
                                            item.method;
                                        }

                                        return (
                                          <CommandItem
                                            key={item.id}
                                            value={item.id}
                                            onSelect={() =>
                                              handleSelectRecipient(item.id)
                                            }
                                            className="flex flex-col items-start py-3"
                                          >
                                            <div className="font-medium">
                                              {primaryText}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                              {secondaryText}
                                            </div>
                                          </CommandItem>
                                        );
                                      })}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                        </FormControl>
                      </div>
                      {selectedRecipient && (
                        <div className="mt-2 rounded-md border bg-muted/30 p-2 text-sm">
                          <div className="font-medium">
                            {selectedRecipient.name}
                            {selectedRecipient.holder &&
                              ` (${selectedRecipient.holder})`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {selectedRecipient.accountNumber ||
                              selectedRecipient.username ||
                              selectedRecipient.phone ||
                              ''}
                            {selectedRecipient.method &&
                              ` • ${selectedRecipient.method}`}
                          </div>
                        </div>
                      )}
                      <FormDescription>
                        {transactionType === 'ACCOUNT'
                          ? 'Search for one of your accounts to transfer to'
                          : transactionType === 'CARD'
                          ? 'Search for a card to pay'
                          : 'Search for an external recipient'}
                      </FormDescription>
                      <FormMessage />
                      <input type="hidden" {...field} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          className="account-type-grain"
                          disabled={status === 'pending'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isScheduled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={status === 'pending'}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Schedule for later</FormLabel>
                        <FormDescription>
                          Select this option to schedule the transaction for a
                          future date and time
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.getValues('isScheduled') && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="isScheduled"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal account-type-grain"
                                  disabled={status === 'pending'}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ?? <span>Pick a date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) =>
                                  date <
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timestamp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal account-type-grain"
                                disabled={status === 'pending'}
                                type="button"
                                onClick={() => {
                                  const timeInput =
                                    document.getElementById('time-input');
                                  if (timeInput) {
                                    timeInput.click();
                                  }
                                }}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value}
                              </Button>
                              <input
                                id="time-input"
                                type="time"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="sr-only"
                                disabled={status === 'pending'}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate('/')}
                  disabled={status === 'pending'}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={status === 'pending'}>
                  {status === 'pending'
                    ? 'Processing...'
                    : 'Submit Transaction'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </main>
  );
}
