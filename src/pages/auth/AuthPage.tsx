('');

import { useEffect, useState } from 'react';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      dispatch(holderResetStatus('holderCreatedStatus'));
    }
  }, [dispatch, holderRegistrationStatus]);

  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-gray dark:bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[550px] justify-center">
        <CardHeader className="space-y-1">
          <ModeToggle />
          <img
            src="assets/logo.png"
            alt="nextfin-logo"
            className="h-22 w-32 object-contain mx-auto"
          />
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Nextfin
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to
            {activeTab === 'login' ? ' sign in to' : ' create'} your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
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
        </CardContent>
        {activeSignupStage === 'USER' && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <img
                  height="16"
                  width="16"
                  src="https://cdn.simpleicons.org/Github/white"
                />
                GitHub
              </Button>
              <Button variant="outline">
                <img
                  height="16"
                  width="16"
                  src="https://cdn.simpleicons.org/Google/white"
                />
                Google
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
