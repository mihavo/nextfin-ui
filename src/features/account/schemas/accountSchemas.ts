import { AccountType } from '@/types/Account';
import { z } from 'zod';

export const newAccountSchema = z.object({
  managerId: z.string().min(1, { message: 'Manager is required' }),
  friendlyName: z.string(),
  accountType: z.enum([
    AccountType.CHECKING,
    AccountType.SAVINGS,
    AccountType.TRUST,
  ]),
  currencyCode: z
    .string()
    .length(3, { message: 'Currency code must be 3 characters' }),
});
