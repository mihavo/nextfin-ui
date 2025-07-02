import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/navigation/Layout';
import { ThemeProvider } from './components/theme/theme-provider';
import Dashboard from './layouts/dashboard/Dashboard';
import AccountPage from './pages/account/AccountPage';
import AccountsListPage from './pages/account/AccountsListPage';
import AddAccount from './pages/account/AddAccount';
import AuthPage from './pages/auth/AuthPage';
import LogoutPage from './pages/auth/LogoutPage';
import CardsPage from './pages/cards/CardsPage';
import FeaturesPage from './pages/features/FeaturesPage';
import LandingPage from './pages/landing/LandingPage';
import NotFound from './pages/misc/NotFound';
import SettingsPage from './pages/settings/SettingsPage';
import FinancialStatisticsPage from './pages/statistics/FinancialStatisticsPage';
import { TransactionsPage } from './pages/transactions/TransactionsPage';
import UserDetailsPage from './pages/user/UserDetailsPage';
import { useAppSelector } from './store/hooks';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
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
              <Route path="statistics" element={<FinancialStatisticsPage />} />
              <Route path="user-details" element={<UserDetailsPage />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/features" element={<FeaturesPage />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
