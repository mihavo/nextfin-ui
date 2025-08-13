import { nextfinRequest } from '@/api/apiClient';
import { OnboardingStatus, Verification } from '@/types/Onboarding';
import { ToS } from '@/types/ToS';
import { HolderRequest, RegisterHolderResponse } from '../holders/holderApi';

export type CreateHolderOnboardingRequest = HolderRequest;
export type CreateHolderOnboardingResponse = RegisterHolderResponse;
export type TosAcceptanceOnboardingResponse = {
  id: string;
  user_id: string;
  tosVersion: string;
  acceptanceDate: string;
};

export interface OnbooardingStepResponse<
  T extends CreateHolderOnboardingResponse | TosAcceptanceOnboardingResponse
> {
  onboardingStatus: OnboardingStatus;

  stepData: T;
}

export interface OnboardingStatusResponse {
  onboardingComplete: boolean;
  step: string;
}

export type GetTermsResponse = ToS;

export type VerifyEmailResponse = Verification;

export type ValidateEmailOtpRequest = {
  code: string;
};

export type ValidateEmailOtpResponse = string;

export const onboardingRegisterHolder = async (
  request: CreateHolderOnboardingRequest
): Promise<OnbooardingStepResponse<CreateHolderOnboardingResponse>> => {
  return await nextfinRequest('/onboarding/create-holder', 'POST', request);
};

export const onboardingAcceptTos = async (): Promise<
  OnbooardingStepResponse<TosAcceptanceOnboardingResponse>
> => {
  return await nextfinRequest('/onboarding/accept-terms', 'POST');
};

export const onboardingGetTos = async (): Promise<GetTermsResponse> => {
  return await nextfinRequest('/onboarding/terms', 'GET');
};

export const getCurrentOnboardingStatus =
  async (): Promise<OnboardingStatusResponse> => {
    return await nextfinRequest('/onboarding/status', 'GET');
  };

export const verifyEmail = async (
  email: string
): Promise<VerifyEmailResponse> => {
  return await nextfinRequest('/onboarding/verify-email', 'POST');
};

export const validateEmailOtp = async (
  request: ValidateEmailOtpRequest
): Promise<ValidateEmailOtpResponse> => {
  return await nextfinRequest(
    '/onboarding/validate-email-otp',
    'POST',
    request
  );
};