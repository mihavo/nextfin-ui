import { z } from 'zod';

export const newTransactionSchema = z.object({
  sourceAccountId: z.number(),
  targetAccountId: z.number(),
  amount: z.string().regex(/^\d+(\.\d{2})$/, {
    message: 'Must be a decimal with exactly 2 digits after the dot',
  }),
  currency: z
    .string()
    .length(3, { message: 'Currency code must be 3 characters' }),
  transactionType: z.enum(['CARD', 'ACCOUNT', 'EXTERNAL']),
  isScheduled: z.boolean(),
  scheduledDate: z.date().optional(),
  scheduledTime: z.string().optional(),
});
