import { Account } from '@/types/Account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAccount,
  CreateAccountRequest,
  CreateAccountResponse,
  fetchUserAccounts,
  UserAccountsResponse,
} from './accountApi';

interface AccountState {
  entities: Account[];
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AccountState = { entities: [], isLoading: 'idle' };

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

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch User Acounts
    builder.addCase(fetchUserAccountsAction.fulfilled, (state, action) => {
      state.entities = action.payload.accounts;
      state.isLoading = 'succeeded';
    });
    builder.addCase(fetchUserAccountsAction.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(fetchUserAccountsAction.rejected, (state) => {
      state.isLoading = 'failed';
    });

    //Create Account
    builder.addCase(createAccountAction.fulfilled, (state) => {
      state.isLoading = 'succeeded';
    });
    builder.addCase(createAccountAction.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(createAccountAction.rejected, (state) => {
      state.isLoading = 'failed';
    });
  },
});

export default accountSlice.reducer;
