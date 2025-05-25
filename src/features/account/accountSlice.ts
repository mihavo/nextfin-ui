import { Account } from '@/types/Account';
import { Status } from '@/types/Status';
import { Transaction } from '@/types/Transaction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AccountSearchOptions,
  AccountSearchResponse,
  createAccount,
  CreateAccountRequest,
  CreateAccountResponse,
  fetchAccountById,
  fetchUserAccounts,
  getAccountTransactions,
  GetAccountTransactionsRequest,
  GetAccountTransactionsResponse,
  searchAccounts,
  UserAccountsResponse,
} from './accountApi';

interface AccountState {
  entities: Account[];
  currentAccount: (Account & { transactions: Transaction[] }) | null;

  searchResults: AccountSearchResponse | null;
  getUserAccountsStatus: Status;
  createAccountStatus: Status;
  getAccountByIdStatus: Status;
  getAccountTransactionsStatus: Status;
  searchStatus: Status;
}

const initialState: AccountState = {
  entities: [],
  currentAccount: null,
  getUserAccountsStatus: 'idle',
  createAccountStatus: 'idle',
  getAccountByIdStatus: 'idle',
  getAccountTransactionsStatus: 'idle',
  searchStatus: 'idle',
  searchResults: null,
};

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
  async (accountId: string): Promise<Account> => {
    return await fetchAccountById(accountId);
  }
);

export const getAccountTransactionsAction = createAsyncThunk(
  'accounts/getTransactions',
  async (
    request: GetAccountTransactionsRequest
  ): Promise<GetAccountTransactionsResponse> => {
    return await getAccountTransactions(request);
  }
);

export const searchAccountsAction = createAsyncThunk(
  'accounts/search',
  async (request: { query: string; options?: AccountSearchOptions }) => {
    return await searchAccounts(request.query, request.options);
  }
);

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetStatus(state, action: { payload: keyof AccountState }) {
      if (action.payload in state && action.payload.endsWith('Status')) {
        (state[action.payload] as Status) = 'idle';
      }
    },
  },
  extraReducers: (builder) => {
    //Fetch User Acounts
    builder.addCase(fetchUserAccountsAction.fulfilled, (state, action) => {
      state.entities = action.payload.accounts.sort(
        (a, b) => b.balance - a.balance
      );
      state.getUserAccountsStatus = 'succeeded';
    });
    builder.addCase(fetchUserAccountsAction.pending, (state) => {
      state.getUserAccountsStatus = 'pending';
    });
    builder.addCase(fetchUserAccountsAction.rejected, (state) => {
      state.getUserAccountsStatus = 'failed';
    });

    //Create Account
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.currentAccount = { ...action.payload, transactions: [] };
      state.createAccountStatus = 'succeeded';
    });
    builder.addCase(createAccountAction.pending, (state) => {
      state.createAccountStatus = 'pending';
    });
    builder.addCase(createAccountAction.rejected, (state) => {
      state.createAccountStatus = 'failed';
    });

    //Get Account By Id
    builder.addCase(getAccountByIdAction.fulfilled, (state, action) => {
      state.currentAccount = { ...action.payload, transactions: [] };
      state.getAccountByIdStatus = 'succeeded';
    });
    builder.addCase(getAccountByIdAction.pending, (state) => {
      state.getAccountByIdStatus = 'pending';
    });
    builder.addCase(getAccountByIdAction.rejected, (state) => {
      state.getAccountByIdStatus = 'failed';
    });

    //Get Account transactions
    builder.addCase(getAccountTransactionsAction.fulfilled, (state, action) => {
      state.currentAccount!.transactions = action.payload.content;
      state.getAccountTransactionsStatus = 'succeeded';
    });
    builder.addCase(getAccountTransactionsAction.pending, (state) => {
      state.getAccountTransactionsStatus = 'pending';
    });
    builder.addCase(getAccountTransactionsAction.rejected, (state) => {
      state.getAccountTransactionsStatus = 'failed';
    });

    //Search Accounts
    builder.addCase(searchAccountsAction.fulfilled, (state, action) => {
      state.searchResults = action.payload;
      state.searchStatus = 'succeeded';
    });
    builder.addCase(searchAccountsAction.pending, (state) => {
      state.searchResults = null;
      state.searchStatus = 'pending';
    });
    builder.addCase(searchAccountsAction.rejected, (state) => {
      state.searchStatus = 'failed';
    });
  },
});

export const { resetStatus } = accountSlice.actions;

export default accountSlice.reducer;