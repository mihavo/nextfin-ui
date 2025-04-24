import { User } from '@/types/User';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  GetUserResponse,
  login,
  logout,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutResponse,
} from './authApi';

interface AuthState {
  isAuthenticated: boolean;
  status: AuthStatus;
  user?: User;
}

type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
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

export const fetchUserAction = createAsyncThunk(
  'auth/me',
  async (): Promise<GetUserResponse> => {
    return await fetchCurrentUser();
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
    builder.addCase(fetchUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
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
