import { TransactionMethod } from '@/types/Transaction';
import { z } from 'zod';

export const newTransactionSchema = z.object({
  sourceAccountId: z.number().nullable(),
  targetAccountId: z.number().nullable(),
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
