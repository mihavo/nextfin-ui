import './App.css';
import { ThemeProvider } from './components/theme/theme-provider';
import Dashboard from './layouts/dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
