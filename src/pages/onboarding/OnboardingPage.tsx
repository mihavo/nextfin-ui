import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ProgressSteps from '@/components/onboarding/ProgressSteps';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { setAuthenticated } from '@/features/auth/authSlice';
import { getCurrentOnboardingStatusAction } from '@/features/onboarding/onboardingSlice';
import {
  getStepDescription,
  getStepTitle,
} from '@/features/onboarding/onboardingUtils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { OnboardingStep, onboardingSteps } from '@/types/Onboarding';
import { Loader2 } from 'lucide-react';
import AcceptTermsPage from './AcceptTermsPage';
import CompleteRegistration from './CompleteRegistration';
import CreateHolderPage from './CreateHolderPage';

export default function OnboardingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);
  const loadStepStatus = useAppSelector(
    (state) => state.onboarding.loadStepStatus
  );

  useEffect(() => {
    dispatch(setAuthenticated({ isAuthenticated: true }));
    dispatch(getCurrentOnboardingStatusAction());
  }, [dispatch]);

  const { theme } = useTheme();

  const renderCurrentStep = () => {
    console.log(currentStep);
    switch (currentStep) {
      case OnboardingStep.HOLDER_CREATION:
        return <CreateHolderPage />;
      case OnboardingStep.TOS_ACCEPTANCE:
        return <AcceptTermsPage />;
      case OnboardingStep.COMPLETED:
        return <CompleteRegistration />;
      default:
        return <CreateHolderPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
      </div>

      <div className="relative z-10 flex justify-between items-center p-4 sm:p-6 lg:p-8">
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src="/assets/logo.png"
            alt="nextfin-logo"
            className="h-8 w-10 sm:h-10 sm:w-12 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Nextfin
          </span>
        </Link>
        <ModeToggle />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
            <ProgressSteps currentStep={currentStep} steps={onboardingSteps} />

            <div className="mb-6 lg:mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 lg:mb-3">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                {getStepDescription(currentStep)}
              </p>
            </div>

            {loadStepStatus === 'pending' ? (
              <div className="relative flex flex-col items-center justify-center py-12">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
                  <Loader2 className="mx-auto mb-4 h-12 w-12 text-blue-500 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Registration successful!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Let's get started with your onboarding!
                  </p>
                </div>
              </div>
            ) : loadStepStatus === 'succeeded' ? (
              <div className="relative">{renderCurrentStep()}</div>
            ) : loadStepStatus === 'failed' ? (
              <div className="relative flex flex-col items-center justify-center py-12">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Error Loading Onboarding Status
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please try again later or contact support.
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center py-12">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
                  <Loader2 className="mx-auto mb-4 h-12 w-12 text-blue-500 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Loading Onboarding Status
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please wait while we determine your current step...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
