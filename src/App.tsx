import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { ThemeProvider } from './components/theme/theme-provider';
import AuthPage from './features/auth/AuthPage';
import LogoutPage from './features/auth/LogoutPage';
import Dashboard from './layouts/dashboard/Dashboard';
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
