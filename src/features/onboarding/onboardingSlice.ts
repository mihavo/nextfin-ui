import { OnboardingStep } from '@/types/Onboarding';
import { Status } from '@/types/Status';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterHolderResponse } from '../holders/holderApi';
import {
  CreateHolderOnboardingRequest,
  onboardingAcceptTos,
  onboardingRegisterHolder,
  OnbooardingStepResponse,
} from './onboardingApi';

interface OnboardingState {
  currentStep: OnboardingStep;
  status: Status;
}

const initialState: OnboardingState = {
  currentStep: OnboardingStep.HOLDER_CREATION,
  status: 'idle',
};

export const onboardingCreateHolderAction = createAsyncThunk(
  'onboarding/registerHolderAction',
  async (
    request: CreateHolderOnboardingRequest
  ): Promise<OnbooardingStepResponse<RegisterHolderResponse>> => {
    return await onboardingRegisterHolder(request);
  }
);

export const onboardingAcceptTosAction = createAsyncThunk(
  'onboarding/acceptTos',
  async () => {
    return await onboardingAcceptTos();
  }
);

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    resetStatus(state, action: { payload: keyof OnboardingState }) {
      if (action.payload in state && action.payload.endsWith('status')) {
        (state[action.payload] as Status) = 'idle';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onboardingCreateHolderAction.fulfilled, (state) => {
      state.status = 'succeeded';
      state.currentStep = OnboardingStep.TOS_ACCEPTANCE;
    });
    builder.addCase(onboardingCreateHolderAction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(onboardingCreateHolderAction.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(onboardingAcceptTosAction.fulfilled, (state) => {
      state.status = 'succeeded';
      state.currentStep = OnboardingStep.COMPLETED;
    });
    builder.addCase(onboardingAcceptTosAction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(onboardingAcceptTosAction.rejected, (state) => {
      state.status = 'failed';
    });
  },
});
