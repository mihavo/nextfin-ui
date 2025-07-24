import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ModeToggle } from '@/components/theme/mode-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export default function AcceptTermsPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAcceptTerms = async () => {
    if (!acceptedTerms || !acceptedPrivacy) {
      toast.error(
        'Please accept both Terms of Service and Privacy Policy to continue'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Terms accepted successfully!');
      navigate('/onboarding?step=email-verification');
    } catch (error) {
      toast.error('Failed to accept terms. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Terms Content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/30 dark:border-gray-700/40 p-6 sm:p-8 shadow-2xl">
            <div className="mb-6 lg:mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 lg:mb-3">
                Terms & Conditions
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                Please review and accept our terms of service and privacy policy
                to continue
              </p>
            </div>

            <div className="space-y-6">
              {/* Terms of Service */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Terms of Service
                </h3>
                <ScrollArea className="h-48 w-full border border-gray-300/60 dark:border-gray-600/40 rounded-lg p-4 bg-white/50 dark:bg-gray-800/50">
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                    <p>
                      <strong>1. Acceptance of Terms</strong>
                      <br />
                      By accessing and using Nextfin, you accept and agree to be
                      bound by the terms and provision of this agreement.
                    </p>
                    <p>
                      <strong>2. Financial Services</strong>
                      <br />
                      Nextfin provides financial management tools and services.
                      You are responsible for the accuracy of the information
                      you provide and the decisions you make based on our
                      services.
                    </p>
                    <p>
                      <strong>3. User Responsibilities</strong>
                      <br />
                      You agree to provide accurate, complete, and current
                      information about yourself as prompted by our registration
                      forms. You are responsible for maintaining the
                      confidentiality of your account credentials.
                    </p>
                    <p>
                      <strong>4. Prohibited Uses</strong>
                      <br />
                      You may not use our service for any illegal or
                      unauthorized purpose. You must not transmit any malicious
                      code, viruses, or any code that could damage our systems.
                    </p>
                    <p>
                      <strong>5. Limitation of Liability</strong>
                      <br />
                      Nextfin shall not be liable for any indirect, incidental,
                      special, consequential, or punitive damages resulting from
                      your use of our service.
                    </p>
                    <p>
                      <strong>6. Modifications</strong>
                      <br />
                      We reserve the right to modify these terms at any time. We
                      will notify users of any significant changes via email or
                      through our platform.
                    </p>
                  </div>
                </ScrollArea>
              </div>

              {/* Privacy Policy */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Privacy Policy
                </h3>
                <ScrollArea className="h-48 w-full border border-gray-300/60 dark:border-gray-600/40 rounded-lg p-4 bg-white/50 dark:bg-gray-800/50">
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                    <p>
                      <strong>1. Information We Collect</strong>
                      <br />
                      We collect information you provide directly to us, such as
                      when you create an account, use our services, or contact
                      us for support.
                    </p>
                    <p>
                      <strong>2. How We Use Your Information</strong>
                      <br />
                      We use the information we collect to provide, maintain,
                      and improve our services, process transactions, and
                      communicate with you.
                    </p>
                    <p>
                      <strong>3. Information Sharing</strong>
                      <br />
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      as described in this policy.
                    </p>
                    <p>
                      <strong>4. Data Security</strong>
                      <br />
                      We implement appropriate security measures to protect your
                      personal information against unauthorized access,
                      alteration, disclosure, or destruction.
                    </p>
                    <p>
                      <strong>5. Your Rights</strong>
                      <br />
                      You have the right to access, update, or delete your
                      personal information. You may also opt out of certain
                      communications from us.
                    </p>
                    <p>
                      <strong>6. Contact Us</strong>
                      <br />
                      If you have any questions about this privacy policy,
                      please contact us at privacy@nextfin.com.
                    </p>
                  </div>
                </ScrollArea>
              </div>

              {/* Acceptance Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                      setAcceptedTerms(checked === true)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    I have read and agree to the Terms of Service
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={acceptedPrivacy}
                    onCheckedChange={(checked) =>
                      setAcceptedPrivacy(checked === true)
                    }
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    I have read and agree to the Privacy Policy
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleAcceptTerms}
                disabled={!acceptedTerms || !acceptedPrivacy || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Processing...' : 'Accept and Continue'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors closeButton theme={theme} />
    </div>
  );
}
