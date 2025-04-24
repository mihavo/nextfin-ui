import { PageRequest } from '@/types/PageRequest';
import { Transaction } from '@/types/Transaction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUserTransactions,
  GetTransactionsResponse,
} from './transactionApi';

interface TransactionsState {
  transactions: Transaction[];
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: TransactionsState = {
  transactions: [],
  isLoading: 'idle',
};

export const fetchUserTransactionsAction = createAsyncThunk(
  '/transactions',
  async (page: PageRequest): Promise<GetTransactionsResponse> => {
    return await fetchUserTransactions(page);
  }
);

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserTransactionsAction.fulfilled, (state) => {
      state.isLoading = 'succeeded';
    });
    builder.addCase(fetchUserTransactionsAction.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(fetchUserTransactionsAction.rejected, (state) => {
      state.isLoading = 'failed';
    });
  },
});

export default transactionSlice.reducer;
