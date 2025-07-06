import { Calendar } from '@/components/ui/calendar';
import {
  CalendarIcon,
  Clock,
  CreditCard,
  ExternalLink,
  Search,
  Wallet,
  X,
} from 'lucide-react';

import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { currencies } from '@/components/utils/currency';
import { currencyFormatter } from '@/components/utils/currency-formatter';
import { AccountSearchResult } from '@/features/account/accountApi';
import {
  fetchUserAccountsAction,
  searchAccountsAction,
} from '@/features/account/accountSlice';
import { newTransactionSchema } from '@/features/transactions/schemas/transactionSchema';
import { TransactionSchedulingOptions } from '@/features/transactions/transactionApi';
import { transactAction } from '@/features/transactions/transactionSlice';
import { convertTimeAndDateToTimestamp } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { TransactionMethod } from '@/types/Transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Portal } from '@radix-ui/react-dialog';
import { friendlyFormatIBAN } from 'ibantools';
import omit from 'lodash/omit';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { z } from 'zod';
import CompletedTransactionModal from './CompletedTransactionModal';
import { PendingTransactionModal } from './PendingTransactionModal';

type NewTransactionModalProps = {
  isModalOpen: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account;
};

export default function NewTransactionModal({
  isModalOpen,
  onOpenChange,
}: NewTransactionModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const componentTheme = theme === 'dark' ? 'grained-dark' : 'grained';

  const status = useAppSelector(
    (state) => state.transactions.newTransactionStatus
  );
  const transaction = useAppSelector(
    (state) => state.transactions.newTransaction
  );
  const accounts = useAppSelector((state) => state.accounts.entities);
  const searchResults = useAppSelector((state) => state.accounts.searchResults);
  const searchStatus = useAppSelector((state) => state.accounts.searchStatus);

  const getRecipientLabel = () => {
    switch (transactionType) {
      case TransactionMethod.ACCOUNT:
        return 'To Account';
      case TransactionMethod.CARD:
        return 'To Card';
      case TransactionMethod.EXTERNAL:
        return 'External Recipient';
      default:
        return 'Recipient';
    }
  };

  const form = useForm<z.infer<typeof newTransactionSchema>>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      amount: '0',
      sourceAccountId: null,
      targetAccountId: null,
      transactionType: TransactionMethod.ACCOUNT,
      isScheduled: false,
      scheduledDate: new Date(),
      scheduledTime: '00:00',
      currency: 'EUR',
    },
    mode: 'onChange',
  });

  const transactionType = form.watch('transactionType');
  const sourceAccountId = form.watch('sourceAccountId');
  const isScheduled = form.watch('isScheduled');
  const currency = form.watch('currency');

  const [searchQuery, setSearchQuery] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedSourceAccount, setSelectedSourceAccount] =
    useState<Account | null>(null);

  const [selectedRecipient, setSelectedRecipient] =
    useState<AccountSearchResult | null>(null);

  useEffect(() => {
    const account = accounts.find((account) => account.id === sourceAccountId);
    if (account) setSelectedSourceAccount(account);
  }, [sourceAccountId, accounts]);

  useEffect(() => {
    if (accounts.length === 0) {
      dispatch(fetchUserAccountsAction());
    } else {
      setSelectedSourceAccount(accounts[0]);
    }
  }, [accounts, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 3) {
        dispatch(searchAccountsAction({ query: searchQuery }));
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  const handleSelectedRecipient = (recipient: AccountSearchResult | null) => {
    if (recipient) form.setValue('targetAccountId', recipient.id);
    setSelectedRecipient(recipient);
    setOpenCombobox(false);
  };

  const handleUpdateSourceAccount = (accountId: string) => {
    const account = accounts.find(
      (account) => account.id === Number(accountId)
    );
    if (account) {
      setSelectedSourceAccount(account);
      form.setValue('sourceAccountId', account.id);
    }
  };

  const handleSubmit = (data: z.infer<typeof newTransactionSchema>) => {
    let timestamp;
    let transactionOptions: TransactionSchedulingOptions = {
      isScheduled: data.isScheduled,
    };

    if (data.sourceAccountId == null || data.targetAccountId == null) {
      form.setError('sourceAccountId', {
        type: 'manual',
        message: 'Source and target accounts are required.',
      });
      return;
    }

    if (isScheduled) {
      timestamp = convertTimeAndDateToTimestamp(
        data.scheduledDate!.toISOString().split('T')[0],
        data.scheduledTime!
      );
      transactionOptions = {
        isScheduled: true,
        timestamp,
      };
    }
    const transactionData = {
      ...omit(data, ['isScheduled', 'scheduledDate', 'scheduledTime']),
      sourceAccountId: data.sourceAccountId.toString(),
      targetAccountId: data.targetAccountId.toString(),
      amount: parseFloat(data.amount),
    };
    dispatch(
      transactAction({ request: transactionData, options: transactionOptions })
    );
  };

  const labelClasses = `flex flex-col items-center justify-between transition-all
   rounded-md border-2 border-muted p-4 hover:bg-accent/50
   hover:text-accent-foreground peer-data-[state=checked]:border-primary
    [&:has([data-state=checked])]:border-primary ${componentTheme}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">New Transaction</DialogTitle>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-3xl">
        {status === 'pending' ? (
          <Portal>
            <PendingTransactionModal />
          </Portal>
        ) : status === 'succeeded' ? (
          <CompletedTransactionModal
            onClose={() => {
              form.reset();
              onOpenChange(false);
            }}
          />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="align-center"
            >
              <DialogHeader className="mb-8 mt-2">
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  New Transaction
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Send money, pay bills, or transfer between accounts
                </DialogDescription>
              </DialogHeader>

              <div className="flex-col space-y-6">
                <FormField
                  control={form.control}
                  name="transactionType"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base font-semibold">Transaction Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                          className="grid grid-cols-3 gap-3"
                        >
                          <div className="relative">
                            <RadioGroupItem
                              value="ACCOUNT"
                              id="account"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="account"
                              className="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:from-blue-100 peer-data-[state=checked]:to-indigo-100 dark:peer-data-[state=checked]:from-blue-900/40 dark:peer-data-[state=checked]:to-indigo-900/40 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-primary/20 hover:border-primary/50"
                            >
                              <div className="relative mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-60 peer-data-[state=checked]:opacity-100 transition-opacity blur-lg"></div>
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200/50 dark:border-blue-800/50 group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/70 dark:group-hover:to-blue-800/70 transition-all">
                                  <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Account Transfer</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">Between accounts</span>
                            </FormLabel>
                          </div>

                          <div className="relative">
                            <RadioGroupItem
                              value="CARD"
                              id="card"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="card"
                              className="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-border bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30 cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:from-emerald-100 peer-data-[state=checked]:to-green-100 dark:peer-data-[state=checked]:from-emerald-900/40 dark:peer-data-[state=checked]:to-green-900/40 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-primary/20 hover:border-primary/50"
                            >
                              <div className="relative mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 opacity-0 group-hover:opacity-60 peer-data-[state=checked]:opacity-100 transition-opacity blur-lg"></div>
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border border-emerald-200/50 dark:border-emerald-800/50 group-hover:from-emerald-100 group-hover:to-emerald-200 dark:group-hover:from-emerald-900/70 dark:group-hover:to-emerald-800/70 transition-all">
                                  <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110" />
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Card Payment</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">To credit card</span>
                            </FormLabel>
                          </div>

                          <div className="relative">
                            <RadioGroupItem
                              value="EXTERNAL"
                              id="external"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="external"
                              className="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-border bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 hover:from-purple-100 hover:to-violet-100 dark:hover:from-purple-900/30 dark:hover:to-violet-900/30 cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:from-purple-100 peer-data-[state=checked]:to-violet-100 dark:peer-data-[state=checked]:from-purple-900/40 dark:peer-data-[state=checked]:to-violet-900/40 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-primary/20 hover:border-primary/50"
                            >
                              <div className="relative mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 opacity-0 group-hover:opacity-60 peer-data-[state=checked]:opacity-100 transition-opacity blur-lg"></div>
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border border-purple-200/50 dark:border-purple-800/50 group-hover:from-purple-100 group-hover:to-purple-200 dark:group-hover:from-purple-900/70 dark:group-hover:to-purple-800/70 transition-all">
                                  <ExternalLink className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-transform group-hover:scale-110" />
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">External Transfer</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">To external account</span>
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-muted">
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mt-0.5">
                            {transactionType === TransactionMethod.ACCOUNT ? (
                              <Wallet className="h-3 w-3 text-primary" />
                            ) : transactionType === TransactionMethod.CARD ? (
                              <CreditCard className="h-3 w-3 text-primary" />
                            ) : (
                              <ExternalLink className="h-3 w-3 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">
                              {transactionType === TransactionMethod.ACCOUNT
                                ? 'Account Transfer'
                                : transactionType === TransactionMethod.CARD
                                ? 'Card Payment'
                                : 'External Transfer'}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {transactionType === TransactionMethod.ACCOUNT
                                ? 'Transfer money between your accounts instantly with no fees.'
                                : transactionType === TransactionMethod.CARD
                                ? 'Make a payment to your credit card to reduce your balance.'
                                : 'Send money to an external account or service provider.'}
                            </p>
                          </div>
                        </div>
                      </div>
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
                      {selectedSourceAccount == null ? (
                        <Skeleton className="h-6 w-2/3 rounded" />
                      ) : (
                        <>
                          <FormControl>
                            <Select
                              defaultValue={selectedSourceAccount.toString()}
                              onValueChange={handleUpdateSourceAccount}
                            >
                              <SelectTrigger
                                id="soure-account"
                                className="w-full"
                              >
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent className="max-h-75">
                                {accounts.map((account) => (
                                  <SelectItem
                                    key={account.id}
                                    value={account.id.toString()}
                                  >
                                    <div className="flex items-center justify-between text-muted-foreground gap-2">
                                      <div>
                                        {account.friendlyName ??
                                          `Account No #${account.id}`}
                                      </div>
                                      <div>${account.balance.toFixed(2)}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Available balance:{' '}
                            {currencyFormatter(
                              selectedSourceAccount.currency,
                              selectedSourceAccount.balance
                            )}
                          </FormDescription>
                        </>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAccountId"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold">{getRecipientLabel()}</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {/* Search Input */}
                          <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder={`Search by name or ${
                                transactionType === TransactionMethod.EXTERNAL
                                  ? 'details'
                                  : 'account ID'
                              }`}
                              className="pl-10 pr-10 h-12 border-2 focus:border-primary transition-colors"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setOpenCombobox(true);
                              }}
                            />
                            {searchQuery && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-2 h-8 w-8 rounded-full p-0 hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => {
                                  setSearchQuery('');
                                  setOpenCombobox(false);
                                  handleSelectedRecipient(null);
                                  form.setValue('targetAccountId', 0);
                                }}
                                type="button"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {/* Selected Recipient Display */}
                          {selectedRecipient && (
                            <div className="relative overflow-hidden rounded-lg border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 transition-all hover:border-primary/40">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                                    <Wallet className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">
                                      {selectedRecipient.firstName} {selectedRecipient.lastName}
                                    </p>
                                    <p className="text-sm text-muted-foreground font-mono">
                                      {friendlyFormatIBAN(selectedRecipient.iban)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    {selectedRecipient.currency}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 rounded-full p-0 hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => {
                                      handleSelectedRecipient(null);
                                      form.setValue('targetAccountId', 0);
                                      setSearchQuery('');
                                    }}
                                    type="button"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Search Results Dropdown */}
                          {openCombobox && searchQuery.length > 0 && (
                            <div className="relative z-50">
                              <div className="absolute top-0 w-full rounded-lg border bg-popover shadow-lg overflow-hidden max-h-40">
                                <Command className="rounded-lg">
                                  <CommandList className="max-h-36 overflow-y-auto">
                                    <CommandEmpty className="flex min-h-[100px] flex-col items-center justify-center text-center p-3">
                                      {searchStatus === 'pending' ? (
                                        <div className="flex flex-col items-center gap-2">
                                          <BarLoader
                                            height="3px"
                                            width="50px"
                                            className="rounded"
                                            color={theme === 'dark' ? '#ffffff' : '#000000'}
                                          />
                                          <span className="text-xs text-muted-foreground">Searching...</span>
                                        </div>
                                      ) : (
                                        <div className="flex flex-col items-center gap-2 py-1">
                                          <div className="relative">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 opacity-60 blur-sm"></div>
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/50 dark:border-blue-800/50">
                                              <Search className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                                            </div>
                                          </div>
                                          <div className="space-y-0.5">
                                            <p className="text-xs font-medium text-foreground">No results found</p>
                                            <p className="text-xs text-muted-foreground">Try different search terms</p>
                                          </div>
                                        </div>
                                      )}
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {searchResults?.content?.map((item) => (
                                        <CommandItem
                                          key={item.id}
                                          value={item.id.toString()}
                                          onSelect={() => handleSelectedRecipient(item)}
                                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                                        >
                                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                            <Wallet className="h-4 w-4" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                              {item.firstName} {item.lastName}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-mono truncate">
                                              {friendlyFormatIBAN(item.iban)}
                                            </p>
                                          </div>
                                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                                            {item.currency}
                                          </span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            </div>
                          )}

                          {/* Help Text */}
                          {!selectedRecipient && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                                <Search className="h-3 w-3" />
                              </div>
                              <span>
                                {transactionType === TransactionMethod.ACCOUNT
                                  ? 'Search for one of your accounts to transfer to'
                                  : transactionType === TransactionMethod.CARD
                                  ? 'Search for a card to pay'
                                  : 'Search for an external recipient'}
                              </span>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-8 justify-between">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue="EUR"
                        >
                          <FormControl className=" w-full">
                            <SelectTrigger className="account-type-grain">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency.code}
                                value={currency.code}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-base">
                                    {currency.flag}
                                  </span>
                                  <span>{currency.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the currency for this transaction
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1">
                        <FormLabel>
                          Amount {currency && `(${currency})`}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="decimal"
                            pattern="^\d+(\.\d{0,2})?$"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={(e) => {
                              return field.onChange(
                                parseFloat(e.target.value).toFixed(2)
                              );
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the transaction amount
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isScheduled"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="relative overflow-hidden rounded-xl border-2 border-border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 transition-all duration-200 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30">
                        {/* Header with checkbox */}
                        <div className="flex items-start space-x-4 mb-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                            />
                          </FormControl>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              <FormLabel className="text-base font-semibold text-foreground cursor-pointer">
                                Schedule for later
                              </FormLabel>
                            </div>
                            <FormDescription className="text-sm text-muted-foreground leading-relaxed">
                              Schedule this transaction to be processed at a specific date and time in the future.
                            </FormDescription>
                          </div>
                        </div>

                        {/* Date and Time selection - only show when scheduled */}
                        {isScheduled && (
                          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300 border-t border-amber-200/50 dark:border-amber-800/50 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="scheduledDate"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                                      <CalendarIcon className="h-3 w-3" />
                                      Date
                                    </FormLabel>
                                    <Popover modal={true}>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal h-10 bg-white dark:bg-gray-950 border-2 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
                                          >
                                            <CalendarIcon className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                                            {field.value ? (
                                              <span className="text-foreground text-sm">
                                                {field.value.toLocaleDateString('en-US', {
                                                  month: 'short',
                                                  day: 'numeric',
                                                  year: 'numeric'
                                                })}
                                              </span>
                                            ) : (
                                              <span className="text-muted-foreground text-sm">Select date</span>
                                            )}
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) =>
                                            date < new Date(new Date().setHours(0, 0, 0, 0))
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
                                name="scheduledTime"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                                      <Clock className="h-3 w-3" />
                                      Time
                                    </FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type="time"
                                          value={field.value}
                                          onChange={field.onChange}
                                          className="h-10 border-2 bg-white dark:bg-gray-950 hover:border-amber-300 dark:hover:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                                        />
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                          <Clock className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                                        </div>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            {/* Schedule Summary */}
                            {form.watch('scheduledDate') && form.watch('scheduledTime') && (
                              <div className="mt-4 p-3 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                  <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                                    Will be processed on{' '}
                                    <span className="font-medium">
                                      {form.watch('scheduledDate')?.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>{' '}
                                    at{' '}
                                    <span className="font-medium">
                                      {new Date(`2000-01-01T${form.watch('scheduledTime')}`).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                      })}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-10 flex items-center justify-between sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid}
                  >
                    Submit Transaction
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
