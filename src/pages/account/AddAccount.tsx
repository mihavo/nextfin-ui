'use client';

import type React from 'react';

import { Check, PiggyBank, Shield, Wallet } from 'lucide-react';
import { useState } from 'react';

import Breadcrumb from '@/components/navigation/Breadcrumb';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { newAccountSchema } from '@/features/account/schemas/accountSchemas';
import { AccountType } from '@/types/Account';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [clickedType, setClickedType] = useState<string | null>(null);

  const [friendlyName, setFriendlyName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);

  const handleSubmit = async (e: React.FormEvent) => {};

  const handleAccountTypeChange = (value: string) => {
    setClickedType(value);
    console.log(value);
    // Reset the animation after it completes
    setTimeout(() => {
      setClickedType(null);
    }, 600);
  };

  const form = useForm<z.infer<typeof newAccountSchema>>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: {
      managerId: '',
      friendlyName: '',
      accountType: AccountType.CHECKING,
      currencyCode: 'USD',
    },
  });

  const onSubmit = async (data: z.infer<typeof newAccountSchema>) => {};

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Breadcrumb />

      <main className="flex flex-1 flex-col main-grain">
        <Card className="mx-auto w-full mt-12 max-w-5xl min-h-[1000px]">
          <CardHeader>
            <CardTitle>Add a New Account</CardTitle>
            <CardDescription>
              Enter the details for your new account
            </CardDescription>
          </CardHeader>

          {isSuccess ? (
            <CardContent className="flex flex-col items-center justify-center  text-center">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="flex flex-col justify-center  text-center space-y-6">
                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Account Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue={AccountType.CHECKING}
                            className="grid grid-cols-3 gap-8"
                            onValueChange={handleAccountTypeChange}
                          >
                            <div>
                              <RadioGroupItem
                                value={AccountType.CHECKING}
                                id="checking"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="checking"
                                className="flex flex-col items-center justify-between p-8 rounded-md transition-all duration-300 border-2 border-muted hover:bg-slate-900 hover:text-accent-foreground 
                                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-slate-900 grained"
                              >
                                <Wallet className="mb-3 h-10 w-10" />
                                <span className="font-semibold">Checking</span>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                id="savings"
                                value={AccountType.SAVINGS}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="savings"
                                className="flex flex-col items-center justify-between p-8 rounded-md relative grain transition-all duration-300 border-2 border-muted hover:bg-slate-900 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-slate-900 grained"
                              >
                                <PiggyBank className="mb-3 h-10 w-10" />
                                <span className="font-semibold">Savings</span>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                id="trust"
                                value={AccountType.TRUST}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="trust"
                                className="flex flex-col items-center justify-between p-8 rounded-md transition-all duration-300 border-2 border-muted hover:bg-slate-900 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-slate-900 grained"
                              >
                                <Shield className="mb-3 h-10 w-10" />
                                <span className="font-semibold">Trust</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

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
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          )}
        </Card>
      </main>
    </div>
  );
}
