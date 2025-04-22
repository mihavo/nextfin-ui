import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, UserLoginRequest, UserLoginResponse } from './authApi';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (requestBody: UserLoginRequest): Promise<UserLoginResponse> => {
    return await login(requestBody);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.fulfilled, (state) => {
      state.isAuthenticated = true;
      //TODO: Save user data to local storage
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
