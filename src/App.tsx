import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { ThemeProvider } from './components/theme/theme-provider';
import Dashboard from './layouts/dashboard/Dashboard';
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
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <AuthPage />}
          />
          <Route path="/logout" element={<LogoutPage />} />

          <Route path="accounts">
            <Route index element={<AccountPage />} />
            <Route path="new" element={<AddAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
