import { OnboardingStep } from '@/types/Onboarding';
import { Status } from '@/types/Status';
import { ToS } from '@/types/ToS';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterHolderResponse } from '../holders/holderApi';
import {
  CreateHolderOnboardingRequest,
  getCurrentOnboardingStatus,
  onboardingAcceptTos,
  onboardingGetTos,
  onboardingRegisterHolder,
  OnbooardingStepResponse,
} from './onboardingApi';

interface OnboardingState {
  currentStep: OnboardingStep | null;
  onboardingComplete: boolean;
  proceedStatus: Status;
  loadStepStatus: Status;
  getTermsStatus: Status;
  terms: ToS | null;
}

const initialState: OnboardingState = {
  currentStep: null,
  onboardingComplete: false,
  proceedStatus: 'idle',
  loadStepStatus: 'idle',
  getTermsStatus: 'idle',
  terms: null,
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
export const onboardingGetTosAction = createAsyncThunk(
  'onboarding/getTos',
  async () => {
    return await onboardingGetTos();
  }
);
export const getCurrentOnboardingStatusAction = createAsyncThunk(
  'onboarding/getCurrentStep',
  async () => {
    return await getCurrentOnboardingStatus();
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
      state.proceedStatus = 'succeeded';
      state.currentStep = OnboardingStep.TOS_ACCEPTANCE;
    });
    builder.addCase(onboardingCreateHolderAction.pending, (state) => {
      state.proceedStatus = 'pending';
    });
    builder.addCase(onboardingCreateHolderAction.rejected, (state) => {
      state.proceedStatus = 'failed';
    });
    builder.addCase(onboardingAcceptTosAction.fulfilled, (state) => {
      state.proceedStatus = 'succeeded';
      state.currentStep = OnboardingStep.COMPLETED;
    });
    builder.addCase(onboardingAcceptTosAction.pending, (state) => {
      state.proceedStatus = 'pending';
    });
    builder.addCase(onboardingAcceptTosAction.rejected, (state) => {
      state.proceedStatus = 'failed';
    });
    builder.addCase(onboardingGetTosAction.fulfilled, (state, action) => {
      state.getTermsStatus = 'succeeded';
      state.terms = action.payload;
    });
    builder.addCase(onboardingGetTosAction.pending, (state) => {
      state.getTermsStatus = 'pending';
    });
    builder.addCase(onboardingGetTosAction.rejected, (state) => {
      state.getTermsStatus = 'failed';
    });
    builder.addCase(
      getCurrentOnboardingStatusAction.fulfilled,
      (state, action) => {
        state.currentStep = action.payload.step as OnboardingStep;
        state.onboardingComplete = action.payload.onboardingComplete;
        state.loadStepStatus = 'succeeded';
      }
    );
    builder.addCase(getCurrentOnboardingStatusAction.pending, (state) => {
      state.loadStepStatus = 'pending';
    });
    builder.addCase(getCurrentOnboardingStatusAction.rejected, (state) => {
      state.loadStepStatus = 'failed';
    });
  },
});

export const { resetStatus } = onboardingSlice.actions;

export default onboardingSlice.reducer;
