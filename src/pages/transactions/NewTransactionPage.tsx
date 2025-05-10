import { Check, CreditCard, Send, Wallet } from 'lucide-react';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';

export default function NewTransactionPage() {
  const handleNewTransaction = () => {};

  return (
    <main className="main-grain relative flex flex-1 flex-col items-center justify-center p-6 md:p-10">
      <Card className="relative mx-auto w-full max-w-2xl shadow-xl">
        {isSuccess ? (
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
                    <p className="font-mono text-sm">{transactionId}</p>
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
                    <p className="capitalize">{transactionType}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Amount
                    </h4>
                    <p className="font-semibold">
                      ${Number.parseFloat(amount).toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      From Account
                    </h4>
                    <p>
                      {accounts.find((acc) => acc.id === fromAccount)?.name}{' '}
                      (****{fromAccount})
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {transactionType === 'transfer'
                        ? 'To Account'
                        : 'Recipient'}
                    </h4>
                    <p>{toAccount}</p>
                  </div>
                  {isScheduled && (
                    <div className="col-span-2 space-y-1">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Scheduled For
                      </h4>
                      <p className="text-sm">
                        {date ? format(date, 'PPP') : 'Immediate'} at {time}
                      </p>
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
                onClick={() => router.push('/')}
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
          <form ref={formRef} onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Create New Transaction</CardTitle>
              <CardDescription>
                Send money, pay bills, or transfer between accounts
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Transaction Type</Label>
                <RadioGroup
                  defaultValue="transfer"
                  className="grid grid-cols-3 gap-4"
                  value={transactionType}
                  onValueChange={setTransactionType}
                >
                  <div>
                    <RadioGroupItem
                      value="transfer"
                      id="transfer"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="transfer"
                      className="account-type-grain flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Send className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Transfer</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="payment"
                      id="payment"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="payment"
                      className="account-type-grain flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Wallet className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Payment</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="billpay"
                      id="billpay"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="billpay"
                      className="account-type-grain flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Bill Pay</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-account">From Account</Label>
                <Select
                  defaultValue={fromAccount}
                  onValueChange={setFromAccount}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="from-account"
                    className={`account-type-grain ${
                      errors.fromAccount ? 'border-red-500' : ''
                    }`}
                  >
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{account.name}</span>
                          <span className="text-muted-foreground">
                            ${account.balance.toFixed(2)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fromAccount && (
                  <p className="text-xs text-red-500">{errors.fromAccount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-account">
                  {transactionType === 'transfer'
                    ? 'To Account'
                    : transactionType === 'payment'
                    ? 'Recipient'
                    : 'Biller'}
                </Label>
                {transactionType === 'transfer' ? (
                  <Select
                    value={toAccount}
                    onValueChange={setToAccount}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="to-account"
                      className={`account-type-grain ${
                        errors.toAccount ? 'border-red-500' : ''
                      }`}
                    >
                      <SelectValue
                        placeholder={`Select ${
                          transactionType === 'transfer'
                            ? 'account'
                            : 'recipient'
                        }`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter((account) => account.id !== fromAccount)
                        .map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} (****{account.id})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="to-account"
                    placeholder={
                      transactionType === 'payment'
                        ? 'Enter recipient name'
                        : 'Enter biller name'
                    }
                    value={toAccount}
                    onChange={(e) => setToAccount(e.target.value)}
                    className={`account-type-grain ${
                      errors.toAccount ? 'border-red-500' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                )}
                {errors.toAccount && (
                  <p className="text-xs text-red-500">{errors.toAccount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`account-type-grain ${
                    errors.amount ? 'border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.amount ? (
                  <p className="text-xs text-red-500">{errors.amount}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Available balance: $
                    {accounts
                      .find((acc) => acc.id === fromAccount)
                      ?.balance.toFixed(2) || '0.00'}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="schedule"
                    checked={isScheduled}
                    onChange={(e) => setIsScheduled(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="schedule">Schedule for later</Label>
                </div>

                {isScheduled && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant="outline"
                            className={`w-full justify-start text-left font-normal account-type-grain ${
                              errors.date ? 'border-red-500' : ''
                            }`}
                            disabled={isSubmitting}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? { date } : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && (
                        <p className="text-xs text-red-500">{errors.date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="flex items-center">
                        <Button
                          id="time"
                          variant="outline"
                          className="w-full justify-start text-left font-normal account-type-grain"
                          disabled={isSubmitting}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </Button>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="sr-only"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push('/')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Submit Transaction'}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </main>
  );
}
