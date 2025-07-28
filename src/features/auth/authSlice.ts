import { Status } from '@/types/Status';
import { User } from '@/types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {
  fetchCurrentUser,
  GetUserResponse,
  login,
  logout,
  register,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from './authApi';

interface AuthState {
  isAuthenticated: boolean;
  loginStatus: Status;
  registerStatus: Status;
  logoutStatus: Status;
  user?: User;
}

const initialState: AuthState = {
  isAuthenticated: Cookies.get('SESSION') !== null,
  user: undefined,
  loginStatus: 'idle',
  registerStatus: 'idle',
  logoutStatus: 'idle',
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (requestBody: UserLoginRequest): Promise<UserLoginResponse> => {
    return await login(requestBody);
  }
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (requestBody: UserRegisterRequest): Promise<UserRegisterResponse> => {
    return await register(requestBody);
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
  reducers: {
    reset: () => {
      return initialState;
    },
    resetStatus(state, action: { payload: keyof AuthState }) {
      if (action.payload in state && action.payload.endsWith('Status')) {
        (state[action.payload] as Status) = 'idle';
      }
    },
    setAuthenticated(state, action: { payload: { isAuthenticated: boolean } }) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loginStatus = 'idle';
    });
    builder.addCase(loginAction.pending, (state) => {
      state.loginStatus = 'pending';
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.loginStatus = 'failed';
    });

    //Register Action
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.registerStatus = 'succeeded';
      state.user = action.payload.user;
    });
    builder.addCase(registerAction.pending, (state) => {
      state.registerStatus = 'pending';
    });
    builder.addCase(registerAction.rejected, (state) => {
      state.registerStatus = 'failed';
    });

    //Logout Action
    builder.addCase(logoutAction.pending, (state) => {
      state.logoutStatus = 'pending';
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.logoutStatus = 'succeeded';
      Object.assign(state, initialState);
    });

    //FetchUser Action
    builder.addCase(fetchUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  reset: authReset,
  resetStatus,
  setAuthenticated,
} = authSlice.actions;
export default authSlice.reducer;
