import { Employee, EmployeeRole } from '@/types/Employee';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees } from './employeeApi';

interface EmployeeState {
  entities: Employee[];
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: EmployeeState = {
  entities: [],
  isLoading: 'idle',
};

export const fetchEmployeesAction = createAsyncThunk(
  '/employees',
  async (roles?: EmployeeRole[]): Promise<Employee[]> => {
    return await fetchEmployees(roles);
  }
);

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeesAction.fulfilled, (state, action) => {
      Object.assign(state.entities, action.payload);
      state.isLoading = 'succeeded';
    });
    builder.addCase(fetchEmployeesAction.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(fetchEmployeesAction.rejected, (state) => {
      state.isLoading = 'failed';
    });
  },
});

export default employeeSlice.reducer;
