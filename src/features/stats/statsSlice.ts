import { ExpensesStats, IncomeStats, StatsRange } from '@/types/Stats';
import { Status } from '@/types/Status';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExpensesStats, getIncomeStats, StatsRequest } from './statsApi';

interface StatsState {
  incomeStats: IncomeStats | null;
  expensesStats: ExpensesStats | null;
  incomeStatus: Status;
  expensesStatus: Status;
  incomeRange: StatsRange;
  expensesRange: StatsRange;
}

const initialState: StatsState = {
  incomeStats: null,
  expensesStats: null,
  incomeStatus: 'idle',
  expensesStatus: 'idle',
  incomeRange: 'MONTHLY',
  expensesRange: 'MONTHLY',
};

export const getIncomeStatsAction = createAsyncThunk(
  'stats/getIncome',
  async (request: StatsRequest) => {
    return await getIncomeStats(request);
  }
);

export const getExpensesStatsAction = createAsyncThunk(
  'stats/getExpenses',
  async (request: StatsRequest) => {
    return await getExpensesStats(request);
  }
);

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setIncomeRange: (state, action: PayloadAction<StatsRange>) => {
      state.incomeRange = action.payload;
    },
    setExpensesRange: (state, action: PayloadAction<StatsRange>) => {
      state.expensesRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncomeStatsAction.fulfilled, (state, action) => {
        state.incomeStats = action.payload;
        state.incomeStatus = 'succeeded';
      })
      .addCase(getIncomeStatsAction.pending, (state) => {
        state.incomeStatus = 'pending';
      })
      .addCase(getIncomeStatsAction.rejected, (state) => {
        state.incomeStatus = 'failed';
        state.incomeStats = null;
      })
      .addCase(getExpensesStatsAction.fulfilled, (state, action) => {
        state.expensesStats = action.payload;
        state.expensesStatus = 'succeeded';
      })
      .addCase(getExpensesStatsAction.pending, (state) => {
        state.expensesStatus = 'pending';
      })
      .addCase(getExpensesStatsAction.rejected, (state) => {
        state.expensesStatus = 'failed';
        state.expensesStats = null;
      });
  },
});

export const { setIncomeRange, setExpensesRange } = statsSlice.actions;

export default statsSlice.reducer;
