import { TransactionMethod } from '@/types/Transaction';
import { z } from 'zod';

export const newTransactionSchema = z.object({
  sourceAccountId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: 'Source account is required',
    }),
  targetAccountId: z
    .number()
    .nullable()
    .refine((val) => val !== null, {
      message: 'Target account is required',
    }),
  amount: z.string().regex(/^\d+(\.\d{2})$/, {
    message: 'Must be a decimal with exactly 2 digits after the dot',
  }),
  currency: z
    .string()
    .length(3, { message: 'Currency code must be 3 characters' }),
  transactionType: z.nativeEnum(TransactionMethod),
  isScheduled: z.boolean(),
  scheduledDate: z.date().optional(),
  scheduledTime: z.string().optional(),
});
