import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { onboardingAcceptTosAction } from '@/features/onboarding/onboardingSlice';
import { termsSchema } from '@/features/onboarding/schemas/onboardingSchemas';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AcceptTermsPage() {
  const terms = useAppSelector((state) => state.onboarding.terms);
  const status = useAppSelector((state) => state.onboarding.proceedStatus);
  const dispatch = useAppDispatch();

  const termsForm = useForm<z.infer<typeof termsSchema>>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      acceptedTerms: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof termsSchema>) => {
    dispatch(onboardingAcceptTosAction());
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="terms-form"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 0.5 }, y: { duration: 0.4 } }}
      >
        <div>
          <Form {...termsForm}>
            <form
              onSubmit={termsForm.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <Info className="w-5 h-5 text-primary" />
                <span>
                  Please review and accept our terms of service to continue
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Terms of Service
                  </h3>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    {terms?.version && (
                      <div className="text-right">
                        <span className="font-medium">Version:</span>{' '}
                        {terms.version}
                      </div>
                    )}
                    {terms?.publishedAt && (
                      <div className="text-right">
                        <span className="font-medium">Published:</span>{' '}
                        {new Date(terms.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <ScrollArea className="h-48 w-full border border-gray-300/60 dark:border-gray-600/40 rounded-lg p-4 bg-white/50 dark:bg-gray-800/50">
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                    {terms?.content || 'No terms available.'}
                  </div>
                </ScrollArea>
              </div>

              <FormField
                control={termsForm.control}
                name="acceptedTerms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="terms"
                      className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-normal"
                    >
                      I have read and agree to the Terms of Service
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {status === 'pending' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Accept and Continue'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
