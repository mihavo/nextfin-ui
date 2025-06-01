import { Holder } from '@/types/Holder';
import { Status } from '@/types/Status';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerHolder,
  RegisterHolderRequest,
  RegisterHolderResponse,
} from './holderApi';

interface HolderState {
  holderCreatedStatus: Status;
  holder?: Holder;
}

const initialState: HolderState = {
  holder: undefined,
  holderCreatedStatus: 'idle',
};

export const registerHolderAction = createAsyncThunk(
  'holders/createHolder',
  async (request: RegisterHolderRequest): Promise<RegisterHolderResponse> => {
    return await registerHolder(request);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    resetStatus(state, action: { payload: keyof HolderState }) {
      if (action.payload in state && action.payload.endsWith('Status')) {
        (state[action.payload] as Status) = 'idle';
      }
    },
  },
  extraReducers: (builder) => {
    //Register Holder
    builder.addCase(registerHolderAction.fulfilled, (state, action) => {
      state.holderCreatedStatus = 'succeeded';
      state.holder = action.payload.holder;
    });
    builder.addCase(registerHolderAction.pending, (state) => {
      state.holderCreatedStatus = 'pending';
    });
    builder.addCase(registerHolderAction.rejected, (state) => {
      state.holderCreatedStatus = 'failed';
    });
  },
});

export const { reset: authReset, resetStatus } = authSlice.actions;
export default authSlice.reducer;
