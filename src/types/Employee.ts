import { Address } from './Address';

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
