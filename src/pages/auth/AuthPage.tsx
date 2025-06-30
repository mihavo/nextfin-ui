('');

import { useEffect, useState } from 'react';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resetStatus as authResetStatus } from '@/features/auth/authSlice';
import { resetStatus as holderResetStatus } from '@/features/holders/holderSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'sonner';
import CompleteRegistration from './CompleteRegistration';
import CreateHolderForm from './CreateHolderForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('login');
  const [activeSignupStage, setActiveSignupStage] = useState<
    'USER' | 'HOLDER' | 'COMPLETED'
  >('USER');
  const registerStatus = useAppSelector((state) => state.auth.registerStatus);
  const holderRegistrationStatus = useAppSelector(
    (state) => state.holders.holderCreatedStatus
  );

  useEffect(() => {
    if (registerStatus === 'succeeded') {
      dispatch(authResetStatus('registerStatus'));
      setActiveSignupStage('HOLDER');
      toast.success('Registration successful!');
    }
  }, [registerStatus, dispatch]);

  useEffect(() => {
    if (holderRegistrationStatus === 'succeeded') {
      toast.success('Holder registration successful!');
      setActiveSignupStage('COMPLETED');
      dispatch(holderResetStatus('holderCreatedStatus'));
    }
  }, [dispatch, holderRegistrationStatus]);

  const { theme } = useTheme();

  const handleGoogleOAuth = async () => {
    try {
      // Direct redirect to the backend OAuth endpoint
      // The backend should handle the redirect to Google
      window.location.href = `${
        import.meta.env.VITE_NEXTFIN_API_URL || 'http://localhost:3000'
      }/oauth2/authorization/google`;
    } catch (error) {
      console.error('Google OAuth error:', error);
      toast.error('Failed to initiate Google OAuth');
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
      </div>

      {/* Left/Center Landing Section */}
      <div className="flex-[2] flex flex-col justify-center items-center px-8 py-12 lg:px-16 relative z-10">
        <div className="max-w-2xl text-center space-y-8">
          {/* Hero Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-400/40 dark:from-blue-500/30 dark:to-purple-500/30 rounded-2xl blur-2xl" />
              <div className="relative p-8 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-white/50 dark:border-gray-600/50">
                <img
                  src="assets/logo.png"
                  alt="nextfin-logo"
                  className="h-32 w-40 object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                Nextfin
              </span>
              <span className="block text-2xl lg:text-3xl mt-2">
                Your Financial
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Future Starts Here
                </span>
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Experience next-generation banking with advanced security,
              intelligent insights, and seamless financial management.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group">
              <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/30 dark:group-hover:bg-blue-400/30">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                Bank-Grade Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced encryption and multi-factor authentication
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group">
              <div className="w-12 h-12 bg-purple-500/20 dark:bg-purple-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/30 dark:group-hover:bg-purple-400/30">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                Smart Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                AI-powered financial analytics and recommendations
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group">
              <div className="w-12 h-12 bg-indigo-500/20 dark:bg-indigo-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/30 dark:group-hover:bg-indigo-400/30">
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                Global Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your finances anywhere, anytime
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group">
              <div className="w-12 h-12 bg-green-500/20 dark:bg-green-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/30 dark:group-hover:bg-green-400/30">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                Instant Transfers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fast and secure money transfers with real-time confirmation
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group">
              <div className="w-12 h-12 bg-orange-500/20 dark:bg-orange-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/30 dark:group-hover:bg-orange-400/30">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                Digital Wallet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Contactless payments and virtual card management
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group">
              <div className="w-12 h-12 bg-rose-500/20 dark:bg-rose-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-500/30 dark:group-hover:bg-rose-400/30">
                <svg
                  className="w-6 h-6 text-rose-600 dark:text-rose-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                Budget Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automated expense categorization and spending analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 relative z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-l border-white/30 dark:border-gray-700/40">
        <div className="w-full max-w-md mx-auto">
          <div className="absolute top-6 right-6 z-10">
            <ModeToggle />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {activeTab === 'login' ? 'Sign In' : 'Get Started'}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {activeTab === 'login'
                ? 'Access your financial dashboard'
                : 'Create your account to begin your financial journey'}
            </p>
          </div>
          <div className="relative">
            <Tabs defaultValue="login" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/30 rounded-xl p-1 h-12">
                <TabsTrigger
                  value="login"
                  className="rounded-lg text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-300/60 dark:data-[state=active]:border-gray-600/50 transition-all duration-300 text-gray-700 dark:text-gray-300 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-300/60 dark:data-[state=active]:border-gray-600/50 transition-all duration-300 text-gray-700 dark:text-gray-300 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                {activeSignupStage === 'HOLDER' ? (
                  <CreateHolderForm />
                ) : activeSignupStage === 'USER' ? (
                  <RegisterForm />
                ) : (
                  <CompleteRegistration />
                )}
              </TabsContent>
            </Tabs>
          </div>

          {activeSignupStage === 'USER' && (
            <div className="flex flex-col space-y-4 mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300/60 dark:border-gray-600/30" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-300/60 dark:border-gray-600/40 shadow-sm">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-sm bg-white/80 dark:bg-gray-700/50 border-gray-300/60 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700/70 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <img
                    height="16"
                    width="16"
                    src="https://cdn.simpleicons.org/Apple/white"
                    className="mr-2"
                  />
                  Apple
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-sm bg-white/80 dark:bg-gray-700/50 border-gray-300/60 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700/70 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={handleGoogleOAuth}
                >
                  <img
                    height="16"
                    width="16"
                    src="https://cdn.simpleicons.org/Google/white"
                    className="mr-2"
                  />
                  Google
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
