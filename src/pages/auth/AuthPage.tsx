import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resetStatus as authResetStatus } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'sonner';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const registerStatus = useAppSelector((state) => state.auth.registerStatus);

  useEffect(() => {
    if (registerStatus === 'succeeded') {
      dispatch(authResetStatus('registerStatus'));
      toast.success('Registration successful! Redirecting to onboarding...');
      navigate('/onboarding');
    }
  }, [registerStatus, dispatch, navigate]);

  const { theme } = useTheme();

  const handleGoogleOAuth = async () => {
    window.location.href = `${
      import.meta.env.VITE_NEXTFIN_API_URL
    }/oauth2/authorization/google`;
  };

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
            src="assets/logo.png"
            alt="nextfin-logo"
            className="h-8 w-10 sm:h-10 sm:w-12 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Nextfin
          </span>
        </Link>
        <ModeToggle />
      </div>

      {/* Auth Content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-auto">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
            <div className="mb-6 lg:mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 lg:mb-3">
                {activeTab === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                {activeTab === 'login'
                  ? 'Access your financial dashboard'
                  : 'Create your account to begin your financial journey'}
              </p>
            </div>

            <div className="relative">
              <Tabs defaultValue="login" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6 lg:mb-8 bg-gray-100/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/30 rounded-xl p-1 h-12">
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
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </div>

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
                  className="backdrop-blur-sm bg-white/80 dark:bg-gray-700/50 border-gray-300/60 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700/70 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 h-10"
                >
                  <img
                    height="16"
                    width="16"
                    src={`https://cdn.simpleicons.org/Apple/${
                      theme !== 'light' ? 'white' : 'dark'
                    }`}
                    className="mr-2"
                  />
                  Apple
                </Button>
                <Button
                  variant="outline"
                  className="backdrop-blur-sm bg-white/80 dark:bg-gray-700/50 border-gray-300/60 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700/70 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 h-10"
                  onClick={handleGoogleOAuth}
                >
                  <img
                    height="16"
                    width="16"
                    src={`https://cdn.simpleicons.org/Google/${
                      theme !== 'light' ? 'white' : 'dark'
                    }`}
                    className="mr-2"
                  />
                  Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
