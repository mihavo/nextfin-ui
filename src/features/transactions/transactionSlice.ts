import { PageRequest } from '@/types/PageRequest';
import { Status } from '@/types/Status';
import { Transaction } from '@/types/Transaction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUserTransactions,
  GetTransactionsResponse,
  NewTransactionResponse,
  transact,
  TransactionRequest,
  TransactionRequestOptions,
} from './transactionApi';

interface TransactionsState {
  entities: Transaction[];

  newTransaction: NewTransactionResponse | null;
  fetchUserTransactionsStatus: Status;
  newTransactionStatus: Status;
}

const initialState: TransactionsState = {
  entities: [],
  newTransaction: null,
  fetchUserTransactionsStatus: 'idle',
  newTransactionStatus: 'idle',
};

export const fetchUserTransactionsAction = createAsyncThunk(
  '/transactions',
  async (page?: PageRequest): Promise<GetTransactionsResponse> => {
    return await fetchUserTransactions(page);
  }
);

export const transactAction = createAsyncThunk(
  '/transactions/new',
  async ({
    request,
    options,
  }: {
    request: TransactionRequest;
    options: TransactionRequestOptions;
  }): Promise<NewTransactionResponse> => {
    return await transact(request, options);
  }
);
export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserTransactionsAction.fulfilled, (state, action) => {
      Object.assign(state.entities, action.payload.content);
      state.fetchUserTransactionsStatus = 'succeeded';
    });
    builder.addCase(fetchUserTransactionsAction.pending, (state) => {
      state.fetchUserTransactionsStatus = 'pending';
    });
    builder.addCase(fetchUserTransactionsAction.rejected, (state) => {
      state.fetchUserTransactionsStatus = 'failed';
    });
    builder.addCase(transactAction.fulfilled, (state, action) => {
      state.newTransaction = action.payload;
      state.fetchUserTransactionsStatus = 'succeeded';
    });
    builder.addCase(transactAction.pending, (state) => {
      state.fetchUserTransactionsStatus = 'pending';
    });
    builder.addCase(transactAction.rejected, (state) => {
      state.fetchUserTransactionsStatus = 'failed';
    });
  },
});

export default transactionSlice.reducer;
