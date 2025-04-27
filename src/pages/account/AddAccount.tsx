'use client';

import type React from 'react';

import { ArrowLeft, Check, CreditCard, Wallet } from 'lucide-react';
import { useState } from 'react';

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
import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { Link, useNavigate } from 'react-router';

// Currency options
const currencies = [
  { code: 'USD', name: 'US Dollar ($)', symbol: '$' },
  { code: 'EUR', name: 'Euro (€)', symbol: '€' },
  { code: 'GBP', name: 'British Pound (£)', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen (¥)', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar (C$)', symbol: 'C$' },
];

export default function AddAccount() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('checking');

  const [friendlyName, setFriendlyName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);

  const handleSubmit = async (e: React.FormEvent) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Add New Account</h1>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle>Add a New Account</CardTitle>
            <CardDescription>
              Enter the details for your new account
            </CardDescription>
          </CardHeader>

          {isSuccess ? (
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">
                Account Created Successfully!
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your new account has been added to your dashboard.
              </p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Account Type</Label>
                  <RadioGroup
                    defaultValue="checking"
                    className="grid grid-cols-3 gap-4"
                    value={accountType}
                    onValueChange={setAccountType}
                  >
                    <div>
                      <RadioGroupItem
                        value="checking"
                        id="checking"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="checking"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Wallet className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Checking</span>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="savings"
                        id="savings"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="savings"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Wallet className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Savings</span>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="credit"
                        id="credit"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="credit"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Credit</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friendly-name">Friendly Name</Label>
                  <Input
                    id="friendly-name"
                    placeholder="e.g. Vacation Fund, Emergency Savings"
                    value={friendlyName}
                    onChange={(e) => setFriendlyName(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    A name to help you identify this account
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select
                    defaultValue={selectedCurrency}
                    onValueChange={setSelectedCurrency}
                  >
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {currency.symbol}
                            </span>
                            <span>{currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {accountType !== 'credit' ? (
                  <div className="space-y-2">
                    <Label htmlFor="initial-deposit">
                      Initial Deposit (
                      {currencies.find((c) => c.code === selectedCurrency)
                        ?.symbol || '$'}
                      )
                    </Label>
                    <Input
                      id="initial-deposit"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="credit-limit">
                      Credit Limit (
                      {currencies.find((c) => c.code === selectedCurrency)
                        ?.symbol || '$'}
                      )
                    </Label>
                    <Input
                      id="credit-limit"
                      type="number"
                      min="500"
                      step="100"
                      placeholder="5000"
                      required
                    />
                  </div>
                )}

                {accountType === 'savings' && (
                  <div className="space-y-2">
                    <Label htmlFor="interest-rate">Interest Rate Type</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="interest-rate">
                        <SelectValue placeholder="Select interest rate type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          Standard (0.5% APY)
                        </SelectItem>
                        <SelectItem value="high-yield">
                          High-Yield (2.0% APY)
                        </SelectItem>
                        <SelectItem value="premium">
                          Premium (2.5% APY)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {accountType === 'credit' && (
                  <div className="space-y-2">
                    <Label htmlFor="card-type">Card Type</Label>
                    <Select defaultValue="rewards">
                      <SelectTrigger id="card-type">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rewards">Rewards Card</SelectItem>
                        <SelectItem value="cashback">Cash Back Card</SelectItem>
                        <SelectItem value="travel">Travel Card</SelectItem>
                        <SelectItem value="secured">Secured Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push('/')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
