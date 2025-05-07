import { Check, PiggyBank, Shield, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

import Breadcrumb from '@/components/navigation/Breadcrumb';
import { useTheme } from '@/components/theme/theme-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { currencies } from '@/components/utils/currency';
import { createAccountAction } from '@/features/account/accountSlice';
import { newAccountSchema } from '@/features/account/schemas/accountSchemas';
import { fetchEmployeesAction } from '@/features/employees/employeeSlice';
import { formatEnumKey } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AccountType } from '@/types/Account';
import { Employee, EmployeeRole } from '@/types/Employee';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as z from 'zod';

export default function AddAccount() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const managers = useAppSelector(
    (state) => state.employees.entities
  ) as Employee[];
  useAppSelector((state) => state.accounts);
  const status = useAppSelector((state) => state.accounts.status);

  const [isSuccess, setIsSuccess] = useState(false);
  const [clickedType, setClickedType] = useState<string | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);
  const [selectedManager, setSelectedManager] = useState<Employee | null>(null);

  const location = useLocation();

  useEffect(() => {
    dispatch(
      fetchEmployeesAction([
        EmployeeRole.JUNIOR_ACCOUNT_MANAGER,
        EmployeeRole.MEDIOR_ACCOUNT_MANAGER,
        EmployeeRole.SENIOR_ACCOUNT_MANAGER,
      ])
    );
  }, [location, dispatch]);

  const onSubmit = async (data: z.infer<typeof newAccountSchema>) => {
    dispatch(
      createAccountAction({ ...data, managerId: data.manager?.id.toString() })
    );
  };

  const form = useForm<z.infer<typeof newAccountSchema>>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: {
      manager: undefined,
      friendlyName: '',
      accountType: AccountType.CHECKING,
      currencyCode: 'USD',
    },
  });

  const labelClasses = `flex flex-col items-center justify-between p-8 rounded-md transition-all duration-300 border-2 border-muted 
                                peer-data-[state=checked]:border-primary   ${
                                  theme === 'dark'
                                    ? 'grained-dark peer-data-[state=checked]:bg-slate-900 hover:bg-slate-900 hover:text-accent-foreground'
                                    : 'grained hover:text-accent-foreground hover:bg-slate-400 peer-data-[state=checked]:bg-slate-400'
                                }`;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Breadcrumb />

      <main
        className={`flex flex-1 flex-col ${
          theme === 'dark' ? 'main-grain-dark' : 'main-grain'
        }`}
      >
        <Card className="mx-auto w-full mt-8 max-w-5xl min-h-[350px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] px-12 py-12 border-b-accent">
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
                            onValueChange={setClickedType}
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
                    name="manager"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Account Manager</FormLabel>
                        <p className="mr-auto text-xs text-muted-foreground">
                          The employee responsible for opening this account
                        </p>
                        <FormControl>
                          <Select
                            defaultValue={selectedManager?.id.toString()}
                            onValueChange={(value) => {
                              const manager = managers.find(
                                (e) => e.id.toString() === value
                              );
                              setSelectedManager(manager || null);
                              field.onChange(manager);
                            }}
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
                            <SelectContent className="max-h-100">
                              {managers.map((manager) => (
                                <SelectItem
                                  key={manager.id}
                                  value={manager.id.toString()}
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {manager.firstName.charAt(0) +
                                          manager.lastName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">
                                        {manager.firstName +
                                          ' ' +
                                          manager.lastName}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {formatEnumKey(manager.role)}
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
                    disabled={status === 'submitting' || status === 'pending'}
                    className="dark:text-accent-foreground"
                  >
                    {status === 'submitting'
                      ? 'Creating Account...'
                      : 'Create Account'}
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
