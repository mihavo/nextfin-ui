import { AccountType } from '@/types/Account';
import { employeeSchema } from '@/types/Employee';
import { z } from 'zod';

export const newAccountSchema = z.object({
  manager: employeeSchema.nullish(),
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
