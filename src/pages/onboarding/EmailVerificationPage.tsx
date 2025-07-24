import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { useAppSelector } from '@/store/hooks';
import { CheckCircle, Clock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const userEmail = useAppSelector((state) => state.auth.user?.email);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerifyEmail = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit verification code');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to verify email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Email verified successfully!');
      // Navigate to the final success step
      navigate('/onboarding?step=success');
    } catch (error) {
      toast.error('Invalid verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Verification code sent!');
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      toast.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
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

      {/* Email Verification Content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-auto">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
            <div className="mb-6 lg:mb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                  <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 lg:mb-3">
                Verify Your Email
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                We've sent a verification code to
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
                {userEmail || 'your email address'}
              </p>
            </div>

            <div className="space-y-6">
              {/* Verification Code Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Verification Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  className="text-center text-lg tracking-widest font-mono"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerifyEmail}
                disabled={verificationCode.length !== 6 || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>

              {/* Resend Code */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the code?
                </p>
                {canResend ? (
                  <Button
                    variant="outline"
                    onClick={handleResendCode}
                    disabled={isResending}
                    size="sm"
                  >
                    {isResending ? 'Sending...' : 'Resend Code'}
                  </Button>
                ) : (
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Resend in {countdown}s</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
