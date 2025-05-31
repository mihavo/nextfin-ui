import { Button } from '@/components/ui/button';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { holderSchema } from '@/features/auth/schemas/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Info, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function CreateHolderForm() {
  const [showPreview, setShowPreview] = useState(true);
  const holderForm = useForm<z.infer<typeof holderSchema>>({
    resolver: zodResolver(holderSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '09-05-2002',
      phoneNumber: '+1234567890',
      address: {
        street: 'Main Street',
        number: '123',
        city: 'Metropolis',
        state: 'Freedonia',
        zipCode: '55392',
        addressType: 'BILLING',
      },
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowPreview(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (data: z.infer<typeof holderSchema>) => {
    console.log(data);
  };

  return (
    <AnimatePresence mode="wait">
      {showPreview ? (
        <motion.div
          key="preview"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center h-full"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          >
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-semibold mb-2">
              Registration successful!
            </h2>
            <p className="text-sm text-muted-foreground">
              Let&apos;s create a holder for your new account…
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.4 } }}
        >
          <div>
            <Form {...holderForm}>
              <form
                onSubmit={holderForm.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormDescription className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Info className="w-5 h-5 text-primary animate-pulse" />
                  <span>
                    Enter the details for the main holder of the account.
                  </span>
                </FormDescription>

                <FormField
                  name="firstName"
                  control={holderForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={holderForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="dateOfBirth"
                  control={holderForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phoneNumber"
                  control={holderForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123-45-6789"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={holderForm.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={holderForm.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={holderForm.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Metropolis" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={holderForm.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Freedonia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={holderForm.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="55392" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={holderForm.control}
                    name="address.addressType"
                    render={({ field }) => (
                      <div className="col-span-2">
                        <FormItem>
                          <FormLabel>Address Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BILLING">Billing</SelectItem>
                                <SelectItem value="SHIPPING">
                                  Shipping
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full dark:text-white">
                  {status === 'pending' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating holder...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
