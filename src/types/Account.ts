export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';
export type AccountType = 'SAVINGS' | 'CHECKING' | 'TRUST';

export interface Account {
  id: number;
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
