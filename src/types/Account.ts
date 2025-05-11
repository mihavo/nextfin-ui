export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';
export enum AccountType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
  TRUST = 'TRUST',
}


export interface Account {
  id: number;
  iban: string;
  balance: number;
  currency: string;
  status?: AccountStatus;
  accountType: AccountType;
  friendlyName: string;
  holderId?: number;
  managerId?: number;
  transactionLimit: number;
  dailyTotal: string;
  transactionLimitEnabled: boolean;
  transaction2FAEnabled: boolean;
  transactionSMSConfirmationEnabled: boolean;
  dateOpened: string;
  lastUpdated: string;
}
