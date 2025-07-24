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
  HOLDER_CREATION = 1,
  TOS_ACCEPTANCE = 2,
  EMAIL_VERIFICATION = 3,
  COMPLETED = 4,
}

export interface OnboardingStatus {
  onboardingComplete: boolean;
  step: OnboardingStep;
}
