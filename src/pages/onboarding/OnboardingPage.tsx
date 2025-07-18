import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { setAuthenticated } from '@/features/auth/authSlice';
import { resetStatus as holderResetStatus } from '@/features/holders/holderSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'sonner';
import CompleteRegistration from './CompleteRegistration';
import CreateHolderForm from './CreateHolderForm';

export default function OnboardingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [onboardingStage, setOnboardingStage] = useState<
    'HOLDER' | 'COMPLETED'
  >('HOLDER');

  const holderRegistrationStatus = useAppSelector(
    (state) => state.holders.holderCreatedStatus
  );

  useEffect(() => {
    dispatch(setAuthenticated({ isAuthenticated: true }));
  }, [dispatch]);

  useEffect(() => {
    if (holderRegistrationStatus === 'succeeded') {
      toast.success('Holder registration successful!');
      setOnboardingStage('COMPLETED');
      dispatch(holderResetStatus('holderCreatedStatus'));
    }
  }, [dispatch, holderRegistrationStatus]);

  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
      </div>

      {/* Header */}
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

      {/* Onboarding Content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
            <div className="mb-6 lg:mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 lg:mb-3">
                {onboardingStage === 'HOLDER'
                  ? 'Complete Your Profile'
                  : 'Welcome to Nextfin!'}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                {onboardingStage === 'HOLDER'
                  ? 'Please provide your personal information to complete your account setup'
                  : 'Your account has been successfully created'}
              </p>
            </div>

            <div className="relative">
              {onboardingStage === 'HOLDER' ? (
                <CreateHolderForm />
              ) : (
                <CompleteRegistration />
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
