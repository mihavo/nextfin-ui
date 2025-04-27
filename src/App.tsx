import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/navigation/Layout';
import { ThemeProvider } from './components/theme/theme-provider';
import DashboardContent from './layouts/dashboard/DashboardContent';
import AccountPage from './pages/account/AccountPage';
import AddAccount from './pages/account/AddAccount';
import AuthPage from './pages/auth/AuthPage';
import LogoutPage from './pages/auth/LogoutPage';
import { useAppSelector } from './store/hooks';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/logout" element={<LogoutPage />} />
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardContent />} />
              <Route path="accounts">
                <Route index element={<AccountPage />} />
                <Route path="new" element={<AddAccount />} />
              </Route>
            </Route>
          ) : (
            <Route path="/" element={<AuthPage />} />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
