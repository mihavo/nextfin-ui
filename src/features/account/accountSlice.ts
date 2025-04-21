import { AccountStatus, AccountType } from '@/types/Account';
import { createSlice } from '@reduxjs/toolkit';

interface AccountState {
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

const initialState: AccountState = {} as AccountState;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
});

export default accountSlice.reducer;
