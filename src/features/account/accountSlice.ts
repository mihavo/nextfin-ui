import { Account } from '@/types/Account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAccount,
  CreateAccountRequest,
  CreateAccountResponse,
  fetchUserAccounts,
  UserAccountsResponse,
} from './account-api';

interface AccountState {
  entities: Account[];
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AccountState = { entities: [], isLoading: 'idle' };

const fetchUserAccountsThunk = createAsyncThunk(
  'accounts/fetchUserAccounts',
  async (): Promise<UserAccountsResponse> => {
    return await fetchUserAccounts();
  }
);

const createAccountThunk = createAsyncThunk(
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
    builder.addCase(fetchUserAccountsThunk.fulfilled, (state, action) => {
      state.entities.push(...action.payload.accounts);
      state.isLoading = 'succeeded';
    });
    builder.addCase(fetchUserAccountsThunk.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(fetchUserAccountsThunk.rejected, (state) => {
      state.isLoading = 'failed';
    });

    //Create Account
    builder.addCase(createAccountThunk.fulfilled, (state) => {
      state.isLoading = 'succeeded';
    });
    builder.addCase(createAccountThunk.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(createAccountThunk.rejected, (state) => {
      state.isLoading = 'failed';
    });
  },
});

export default accountSlice.reducer;
