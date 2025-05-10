import { PageRequest } from '@/types/PageRequest';
import { Status } from '@/types/Status';
import { Transaction } from '@/types/Transaction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUserTransactions,
  GetTransactionsResponse,
} from './transactionApi';

interface TransactionsState {
  entities: Transaction[];
  fetchUserTransactionsStatus: Status;

  transaction: Transaction | null;
}

const initialState: TransactionsState = {
  entities: [],
  fetchUserTransactionsStatus: 'idle',
  transaction: null,
};

export const fetchUserTransactionsAction = createAsyncThunk(
  '/transactions',
  async (page?: PageRequest): Promise<GetTransactionsResponse> => {
    return await fetchUserTransactions(page);
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
  },
});

export default transactionSlice.reducer;
