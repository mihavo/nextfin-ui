import { PageRequest } from '@/types/PageRequest';
import { Transaction } from '@/types/Transaction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUserTransactions,
  GetTransactionsResponse,
} from './transactionApi';

interface TransactionsState {
  entities: Transaction[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: TransactionsState = {
  entities: [],
  status: 'idle',
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
      state.status = 'succeeded';
    });
    builder.addCase(fetchUserTransactionsAction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchUserTransactionsAction.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default transactionSlice.reducer;
