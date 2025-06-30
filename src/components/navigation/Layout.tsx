import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../theme/theme-provider';
import AppSidebar from '../ui/NextfinSidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { Toaster } from '../ui/sonner';
import TopNav from './TopNav';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main
        className={`w-full  ${
          theme === 'dark' ? ' main-grain-dark' : 'main-grain'
        }`}
      >
        <header className="h-16 w-full flex border-b border-gray-200 dark:border-[#1F1F23] items-center bg-white dark:bg-[#09090B]">
          <SidebarTrigger className="text-8xl" />
          <TopNav />
        </header>
        <div>
          <Outlet />
        </div>
        <Toaster richColors closeButton theme={theme} />
      </main>
    </SidebarProvider>
  );
}
