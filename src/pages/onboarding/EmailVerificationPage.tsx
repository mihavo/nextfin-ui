import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/store/hooks';
import { CheckCircle, Clock } from 'lucide-react';
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
  };

  const handleResendCode = async () => {};

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
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
  );
}
