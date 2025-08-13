import { OnboardingStep, OnboardingStepOrder } from '@/types/Onboarding';

export const getStepTitle = (currentStep: number) => {
  switch (currentStep) {
    case 1:
      return 'Complete Your Profile';
    case 2:
      return 'Terms & Conditions';
    case 3:
      return 'Verify Your Email';
    case 4:
      return 'Welcome to Nextfin!';
    default:
      return 'Complete Your Profile';
  }
};

export const getStepDescription = (currentStep: number) => {
  switch (currentStep) {
    case 1:
      return 'Please provide your personal information to complete your account setup';
    case 3:
      return 'Check your email and enter the verification code';
    case 4:
      return 'Your account has been successfully created';
  }
};

export function isBefore(a: OnboardingStep, b: OnboardingStep): boolean {
  return OnboardingStepOrder[a] < OnboardingStepOrder[b];
}
