export const onboardingSteps = [
  {
    id: 1,
    title: 'Profile',
    description: 'Create holder',
  },
  {
    id: 2,
    title: 'Terms',
    description: 'Accept T&C',
  },
  {
    id: 3,
    title: 'Verification',
    description: 'Verify email',
  },
  {
    id: 4,
    title: 'Complete',
    description: 'All done!',
  },
];

export enum OnboardingStep {
  HOLDER_CREATION = 'HOLDER_CREATION',
  TOS_ACCEPTANCE = 'TOS_ACCEPTANCE',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  COMPLETED = 'COMPLETED',
}

export interface OnboardingStatus {
  onboardingComplete: boolean;
  step: OnboardingStep;
}

export const OnboardingStepOrder: Record<OnboardingStep, number> = {
  [OnboardingStep.HOLDER_CREATION]: 1,
  [OnboardingStep.TOS_ACCEPTANCE]: 2,
  [OnboardingStep.EMAIL_VERIFICATION]: 3,
  [OnboardingStep.COMPLETED]: 4,
};

