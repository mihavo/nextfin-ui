import { Account } from '@/types/Account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAccount,
  CreateAccountRequest,
  CreateAccountResponse,
  fetchAccountById,
  fetchUserAccounts,
  UserAccountsResponse,
} from './accountApi';

interface AccountState {
  entities: Account[];
  currentAccount?: Account;
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | 'submitting';
}

const initialState: AccountState = { entities: [], status: 'idle' };

export const fetchUserAccountsAction = createAsyncThunk(
  'accounts/fetchUserAccounts',
  async (): Promise<UserAccountsResponse> => {
    return await fetchUserAccounts();
  }
);

export const createAccountAction = createAsyncThunk(
  'accounts/createAccount',
  async (account: CreateAccountRequest): Promise<CreateAccountResponse> => {
    return await createAccount(account);
  }
);

export const getAccountByIdAction = createAsyncThunk(
  'accounts/getAccountById',
  async (accountId: string): Promise<Account | undefined> => {
    return await fetchAccountById(accountId);
  }
);

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    //Fetch User Acounts
    builder.addCase(fetchUserAccountsAction.fulfilled, (state, action) => {
      state.entities = action.payload.accounts;
      state.status = 'succeeded';
    });
    builder.addCase(fetchUserAccountsAction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchUserAccountsAction.rejected, (state) => {
      state.status = 'failed';
    });

    //Create Account
    builder.addCase(createAccountAction.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(createAccountAction.pending, (state) => {
      state.status = 'submitting';
    });
    builder.addCase(createAccountAction.rejected, (state) => {
      state.status = 'failed';
    });

    //Get Account By Id
    builder.addCase(getAccountByIdAction.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(getAccountByIdAction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAccountByIdAction.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { resetStatus } = accountSlice.actions;

export default accountSlice.reducer;