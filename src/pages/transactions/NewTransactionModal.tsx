import { Calendar } from '@/components/ui/calendar';
import {
  CalendarIcon,
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
  const [openCalendar, setOpenCalendar] = useState(false);
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
                      <FormLabel>Transaction Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                          className="grid grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="ACCOUNT"
                              id="account"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="account"
                              className={labelClasses}
                            >
                              <Wallet className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">
                                Account
                              </span>
                            </FormLabel>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="CARD"
                              id="card"
                              className="peer sr-only"
                            />
                            <FormLabel htmlFor="card" className={labelClasses}>
                              <CreditCard className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">Card</span>
                            </FormLabel>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="EXTERNAL"
                              id="external"
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor="external"
                              className={labelClasses}
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
                        {transactionType === TransactionMethod.ACCOUNT
                          ? 'Transfer money between your accounts'
                          : transactionType === TransactionMethod.CARD
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
                                    transactionType ===
                                    TransactionMethod.EXTERNAL
                                      ? 'details'
                                      : 'account ID'
                                  }`}
                                  className=" pl-9 pr-10"
                                  value={searchQuery}
                                  onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setOpenCombobox(true);
                                  }}
                                />
                                {searchQuery != null && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-7 w-7 rounded-full p-0"
                                    onClick={() => {
                                      setSearchQuery('');
                                      setOpenCombobox(false);
                                      handleSelectedRecipient(null);
                                      form.setValue('targetAccountId', 0);
                                    }}
                                    type="button"
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
                                    <CommandEmpty className="flex h-12 items-center justify-center">
                                      {searchStatus === 'idle' && (
                                        <span>No results found.</span>
                                      )}
                                      {searchStatus === 'pending' && (
                                        <BarLoader
                                          height="10px"
                                          width="20vw"
                                          className="rounded"
                                          color={
                                            theme === 'dark'
                                              ? '#ccc'
                                              : '#18181B'
                                          }
                                        />
                                      )}
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {searchResults != null &&
                                        searchResults.content?.map((item) => (
                                          <CommandItem
                                            key={item.id}
                                            value={item.id.toString()}
                                            onSelect={() =>
                                              handleSelectedRecipient(item)
                                            }
                                            className="flex flex-col items-start py-3"
                                          >
                                            <div className="font-medium">
                                              {item.firstName} {item.lastName}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                              {friendlyFormatIBAN(item.iban)}{' '}
                                              {item.currency}
                                            </div>
                                          </CommandItem>
                                        ))}
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
                            {selectedRecipient.firstName}{' '}
                            {selectedRecipient.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {friendlyFormatIBAN(selectedRecipient.iban)}{' '}
                            {selectedRecipient.currency}
                          </div>
                        </div>
                      )}
                      {!selectedRecipient && (
                        <FormDescription>
                          {transactionType === TransactionMethod.ACCOUNT
                            ? 'Search for one of your accounts to transfer to'
                            : transactionType === TransactionMethod.CARD
                            ? 'Search for a card to pay'
                            : 'Search for an external recipient'}
                        </FormDescription>
                      )}
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
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

                {isScheduled && (
                  <div className="flex items-center gap-4 justify-between">
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-1/2">
                          <FormLabel>Date</FormLabel>
                          <Popover
                            open={openCalendar}
                            onOpenChange={setOpenCalendar}
                          >
                            <FormControl>
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  className="dark:bg-accent text-white"
                                >
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  {field.value
                                    ? field.value.toLocaleDateString()
                                    : 'Select date'}
                                </Button>
                              </PopoverTrigger>
                            </FormControl>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setOpenCalendar(false);
                                }}
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
                      name="scheduledTime"
                      render={({ field }) => (
                        <FormItem className=" flex-1">
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              value={field.value}
                              onChange={field.onChange}
                              className="border px-2 py-1 rounded"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
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
                    className="dark:text-white"
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
