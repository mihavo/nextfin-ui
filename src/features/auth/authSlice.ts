import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import {
  login,
  logout,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutResponse,
} from './authApi';

interface AuthState {
  isAuthenticated: boolean;
  status: AuthStatus;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (requestBody: UserLoginRequest): Promise<UserLoginResponse> => {
    return await login(requestBody);
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (): Promise<UserLogoutResponse> => {
    return await logout();
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
      state.status = 'succeeded';
      //TODO: Save user data to local storage
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.status = 'failed';
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      Object.assign(state, initialState);
    });
    builder.addMatcher(
      (action) => isPending(loginAction, logoutAction)(action),
      (state) => {
        state.status = 'loading';
      }
    );
  },
});

export default authSlice.reducer;
