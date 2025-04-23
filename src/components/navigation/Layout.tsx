import { ReactNode } from 'react';
import { useTheme } from '../theme/theme-provider';
import AppSidebar from '../ui/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { Toaster } from '../ui/sonner';
import TopNav from './TopNav';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <SidebarProvider className="p-2 ">
      <AppSidebar />
      <main className="w-full">
        <header className="h-16 w-full flex border-b border-gray-200 dark:border-[#1F1F23] items-center">
          <SidebarTrigger className="text-8xl" />
          <TopNav />
        </header>
        <div className="flex flex-1 p-6 bg-primary-gray dark:bg-background h-full">
          {children}
        </div>
        <Toaster richColors closeButton theme={theme} />
      </main>
    </SidebarProvider>
  );
}
