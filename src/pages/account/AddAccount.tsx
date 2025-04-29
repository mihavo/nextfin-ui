'use client';

import type React from 'react';

import { Check, PiggyBank, Shield, Wallet } from 'lucide-react';
import { useState } from 'react';

import Breadcrumb from '@/components/navigation/Breadcrumb';
import { useTheme } from '@/components/theme/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { newAccountSchema } from '@/features/account/schemas/accountSchemas';
import { AccountType } from '@/types/Account';
import { zodResolver } from '@hookform/resolvers/zod';
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

const accountManagers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Account Manager',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Account Manager',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '3',
    name: 'Jessica Williams',
    role: 'Account Manager',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Junior Account Manager',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

export default function AddAccount() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [clickedType, setClickedType] = useState<string | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);
  const [selectedManager, setSelectedManager] = useState(accountManagers[0].id);

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

  const labelClasses = `flex flex-col items-center justify-between p-8 rounded-md transition-all duration-300 border-2 border-muted 
                                peer-data-[state=checked]:border-primary   ${
                                  theme === 'dark'
                                    ? 'main-grain-dark peer-data-[state=checked]:bg-slate-900 hover:bg-slate-900 hover:text-accent-foreground'
                                    : 'main-grain hover:text-accent-foreground hover:bg-slate-400 peer-data-[state=checked]:bg-slate-400'
                                }`;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Breadcrumb />

      <main
        className={`flex flex-1 flex-col ${
          theme === 'dark' ? 'main-grain-dark' : 'main-grain'
        }`}
      >
        <Card className="mx-auto w-full mt-12 max-w-5xl min-h-[1000px] px-18 py-12 border-b-accent">
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
                <CardContent className="flex flex-col justify-center  text-center space-y-8">
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
                                className={labelClasses}
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
                              <Label htmlFor="savings" className={labelClasses}>
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
                              <Label htmlFor="trust" className={labelClasses}>
                                <Shield className="mb-3 h-10 w-10" />
                                <span className="font-semibold">Trust</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="friendlyName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Friendly Name</FormLabel>
                        <p className="mr-auto text-xs text-muted-foreground">
                          A name to help you identify this account
                        </p>
                        <FormControl>
                          <Input
                            id="friendly-name"
                            className="w-full rounded"
                            placeholder="e.g. Vacation Fund, Emergency Savings"
                            {...field}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currencyCode"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Default Currency</FormLabel>
                        <p className="mr-auto text-xs text-muted-foreground">
                          The default currency for this account
                        </p>
                        <FormControl>
                          <Select
                            defaultValue={selectedCurrency}
                            onValueChange={setSelectedCurrency}
                          >
                            <SelectTrigger
                              id="default-currency"
                              className="w-full rounded "
                            >
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem
                                  key={currency.code}
                                  value={currency.code}
                                >
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
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="managerId"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Account Manager</FormLabel>
                        <p className="mr-auto text-xs text-muted-foreground">
                          The employee responsible for opening this account
                        </p>
                        <FormControl>
                          <Select
                            defaultValue={selectedManager}
                            onValueChange={setSelectedManager}
                          >
                            <SelectTrigger
                              id="account-manager"
                              className="w-full rounded"
                            >
                              <SelectValue
                                className="p-2"
                                placeholder="Select account manager"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {accountManagers.map((manager) => (
                                <SelectItem key={manager.id} value={manager.id}>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={
                                          manager.avatar || '/placeholder.svg'
                                        }
                                        alt={manager.name}
                                      />
                                      <AvatarFallback>
                                        {manager.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">
                                        {manager.name}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {manager.role}
                                      </div>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter className="mt-12 flex justify-end gap-6">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="dark:text-accent-foreground"
                  >
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
