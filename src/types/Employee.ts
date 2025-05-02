import { Address, addressSchema } from './Address';

import { z } from 'zod';

export enum EmployeeRole {
  JUNIOR_ACCOUNT_MANAGER = 'JUNIOR_ACCOUNT_MANAGER',
  SENIOR_ACCOUNT_MANAGER = 'SENIOR_ACCOUNT_MANAGER',
  MEDIOR_ACCOUNT_MANAGER = 'MEDIOR_ACCOUNT_MANAGER',
  ADMIN = 'ADMIN',
  HR = 'HR',
  FINANCE_MANAGER = 'FINANCE_MANAGER',
  OTHER = 'OTHER',
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;
  phoneNumber: string;
  role: EmployeeRole;
}

export const employeeSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 digits',
  }),
  role: z.nativeEnum(EmployeeRole),
  address: addressSchema,
}) satisfies z.ZodType<Employee>;
