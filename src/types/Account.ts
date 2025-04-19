export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';
export type AccountType = 'SAVINGS' | 'CHECKING';

export interface Account {
  id: number;
  balance: string;
  currency: string;
  status?: AccountStatus;
  accountType: AccountType;
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
