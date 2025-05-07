import { Employee, EmployeeRole } from '@/types/Employee';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees } from './employeeApi';

interface EmployeeState {
  entities: Employee[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: EmployeeState = {
  entities: [],
  status: 'idle',
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
      state.status = 'succeeded';
    });
    builder.addCase(fetchEmployeesAction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchEmployeesAction.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default employeeSlice.reducer;
