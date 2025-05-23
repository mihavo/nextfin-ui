import { z } from 'zod';

export const newTransactionSchema = z.object({
  sourceAccountId: z.number(),
  targetAccountId: z.number(),
  amount: z.number().positive({ message: 'Amount must be positive' }),
  currency: z
    .string()
    .length(3, { message: 'Currency code must be 3 characters' }),
  transactionType: z.enum(['CARD', 'ACCOUNT', 'EXTERNAL']),
  isScheduled: z.boolean(),
  scheduledDate: z.date().optional(),
  scheduledTime: z.string().optional(),
});
