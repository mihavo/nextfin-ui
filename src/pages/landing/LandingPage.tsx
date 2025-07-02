import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4 sm:p-6 lg:p-8">
        <div className="flex items-center space-x-2">
          <img
            src="assets/logo.png"
            alt="nextfin-logo"
            className="h-8 w-10 sm:h-10 sm:w-12 object-contain"
          />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Nextfin
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link to="/auth">
            <Button
              variant="outline"
              className="backdrop-blur-sm bg-white/80 dark:bg-gray-700/50 border-gray-300/60 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700/70 transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col px-4 py-8 sm:px-8 lg:px-16 min-h-[calc(100vh-120px)]">
        <div className="text-center space-y-6 lg:space-y-12">
          {/* Hero Logo */}
          <div className="flex justify-center mb-8 lg:mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-400/40 dark:from-blue-500/30 dark:to-purple-500/30 rounded-2xl blur-2xl" />
              <div className="relative p-4 lg:p-12 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-white/50 dark:border-gray-600/50">
                <img
                  src="assets/logo.png"
                  alt="nextfin-logo"
                  className="h-20 w-24 sm:h-28 sm:w-32 lg:h-40 lg:w-48 object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                Nextfin
              </span>
              <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 lg:mt-4">
                Your Financial
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Future Starts Here
                </span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-normal max-w-3xl mx-auto">
              Experience next-generation banking with advanced security,
              intelligent insights, and seamless financial management.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 lg:mt-12">
            <Link to="/auth">
              <Button
                size="lg"
                className="backdrop-blur-sm from-blue-500 to-indigo-500 text-white shadow-lg hover:bg-blue-500 transition-all duration-300 transform px-8 py-3 text-lg"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/features">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-sm bg-white/80 dark:bg-gray-700/50 border-gray-300/60 dark:border-gray-600/40 hover:bg-white dark:hover:bg-gray-700/70 transition-all duration-300 px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24 max-w-6xl mx-auto px-4">
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/30 dark:group-hover:bg-blue-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110"
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
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Bank-Grade Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Advanced encryption and multi-factor authentication protect your
                financial data around the clock.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500/20 dark:bg-purple-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/30 dark:group-hover:bg-purple-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110"
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
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Smart Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                AI-powered financial analytics provide personalized
                recommendations for better money management.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-500/20 dark:bg-indigo-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/30 dark:group-hover:bg-indigo-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-600 dark:text-indigo-400 transition-all duration-300 group-hover:scale-110"
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
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Global Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Manage your finances from anywhere in the world with our secure
                mobile and web platforms.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-500/20 dark:bg-green-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/30 dark:group-hover:bg-green-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-green-600 dark:text-green-400 transition-all duration-300 group-hover:scale-110"
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
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Instant Transfers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Send and receive money instantly with real-time notifications
                and confirmation.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-500/20 dark:bg-orange-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/30 dark:group-hover:bg-orange-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Smart Cards
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Virtual and physical cards with spending controls, rewards, and
                real-time transaction monitoring.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-500/20 dark:bg-teal-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-500/30 dark:group-hover:bg-teal-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-teal-600 dark:text-teal-400 transition-all duration-300 group-hover:scale-110"
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
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Investment Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Build wealth with automated investing, portfolio management, and
                market insights all in one place.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-pink-500/20 dark:bg-pink-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500/30 dark:group-hover:bg-pink-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-pink-600 dark:text-pink-400 transition-all duration-300 group-hover:scale-110"
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
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Savings Goals
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Set and track savings goals with automated transfers and
                competitive interest rates on your deposits.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-violet-500/20 dark:bg-violet-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-500/30 dark:group-hover:bg-violet-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-violet-600 dark:text-violet-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Bill Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Never miss a payment with automated bill pay, payment reminders,
                and expense categorization features.
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/40 dark:border-gray-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer group aspect-video flex flex-col justify-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/30 dark:group-hover:bg-emerald-400/30">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600 dark:text-emerald-400 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Budget Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                Take control of your spending with intelligent budget tracking
                and spending alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-8 border-t border-white/20 dark:border-gray-700/40">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © 2025 Nextfin. All rights reserved. | Your trusted financial partner.
        </p>
      </div>
    </div>
  );
}
