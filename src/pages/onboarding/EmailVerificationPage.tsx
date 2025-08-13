import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, 'Please enter a valid 6-digit verification code'),
});

type FormValues = z.infer<typeof FormSchema>;

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const userEmail = useAppSelector((state) => state.auth.user?.email);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { code: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!userEmail) {
      toast.error('No email found. Please complete your profile first.');
      return;
    }
    dispatch();
  }, [dispatch]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setIsResending(true);
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="text-center text-lg tracking-widest font-mono"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, '')
                        .slice(0, 6);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-center">
                  Enter the 6-digit code sent
                  {userEmail ? ` to ${userEmail}` : ' to your email'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn&apos;t receive the code?
            </p>
            {canResend ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                disabled={isResending}
                size="sm"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </Button>
            ) : (
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Resend in {countdown}s</span>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
