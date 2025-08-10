import { Suspense, lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/navigation/Layout';
import { ThemeProvider } from './components/theme/theme-provider';
import { useAppSelector } from './store/hooks';

// Lazy load components for better code splitting
const Dashboard = lazy(() => import('./layouts/dashboard/Dashboard'));
const AccountPage = lazy(() => import('./pages/account/AccountPage'));
const AccountsListPage = lazy(() => import('./pages/account/AccountsListPage'));
const AddAccount = lazy(() => import('./pages/account/AddAccount'));
const AuthPage = lazy(() => import('./pages/auth/AuthPage'));
const OAuthSuccess = lazy(() => import('./pages/auth/OAuthLoginSuccess'));
const LogoutPage = lazy(() => import('./pages/auth/LogoutPage'));
const CardsPage = lazy(() => import('./pages/cards/CardsPage'));
const FeaturesPage = lazy(() => import('./pages/features/FeaturesPage'));
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const NotFound = lazy(() => import('./pages/misc/NotFound'));
const OnboardingPage = lazy(() => import('./pages/onboarding/OnboardingPage'));
const AcceptTermsPage = lazy(
  () => import('./pages/onboarding/AcceptTermsPage')
);
const EmailVerificationPage = lazy(
  () => import('./pages/onboarding/EmailVerificationPage')
);
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const FinancialStatisticsPage = lazy(
  () => import('./pages/statistics/FinancialStatisticsPage')
);
const TransactionsPage = lazy(() =>
  import('./pages/transactions/TransactionsPage').then((module) => ({
    default: module.TransactionsPage,
  }))
);
const UserDetailsPage = lazy(() => import('./pages/user/UserDetailsPage'));

// Loading component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            {isAuthenticated ? (
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="accounts">
                  <Route index element={<AccountsListPage />} />
                  <Route path="new" element={<AddAccount />} />
                  <Route path=":id" element={<AccountPage />} />
                </Route>
                <Route path="transactions">
                  <Route index element={<TransactionsPage />} />
                </Route>
                <Route path="cards">
                  <Route index element={<CardsPage />} />
                </Route>
                <Route path="settings">
                  <Route index element={<SettingsPage />} />
                </Route>
                <Route
                  path="statistics"
                  element={<FinancialStatisticsPage />}
                />
                <Route path="user-details" element={<UserDetailsPage />} />
              </Route>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/features" element={<FeaturesPage />} />
              </>
            )}
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
