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
  TransactionSchedulingOptions,
} from './transactionApi';

interface TransactionsState {
  entities: Transaction[];

  newTransaction: NewTransactionResponse | null;

  pendingTransaction: TransactionRequest | null;
  fetchUserTransactionsStatus: Status;
  newTransactionOptions: TransactionSchedulingOptions | null;
  newTransactionStatus: Status;
}

const initialState: TransactionsState = {
  entities: [],
  newTransaction: null,
  pendingTransaction: null,
  newTransactionOptions: null,
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
    options: TransactionSchedulingOptions;
  }): Promise<NewTransactionResponse> => {
    return await transact(request, options);
  }
);
export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetStatus(state, action: { payload: keyof TransactionsState }) {
      if (action.payload in state && action.payload.endsWith('Status')) {
        (state[action.payload] as Status) = 'idle';
      }
    },
  },
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
      state.newTransactionStatus = 'succeeded';
    });
    builder.addCase(transactAction.pending, (state, action) => {
      state.newTransactionStatus = 'pending';
      state.pendingTransaction = action.meta.arg.request;
      state.newTransactionOptions = action.meta.arg.options;
    });
    builder.addCase(transactAction.rejected, (state) => {
      state.newTransactionStatus = 'failed';
      state.pendingTransaction = null;
      state.newTransactionOptions = null;
      state.newTransaction = null;
    });
  },
});

export const { resetStatus } = transactionSlice.actions;

export default transactionSlice.reducer;
