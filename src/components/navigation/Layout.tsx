import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../theme/theme-provider';
import { Button } from '../ui/button';
import AppSidebar from '../ui/NextfinSidebar';
import { SidebarProvider, useSidebar } from '../ui/sidebar';
import { Toaster } from '../ui/sonner';
import TopNav from './TopNav';

function CustomSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 ml-4"
      onClick={toggleSidebar}
    >
      {open ? (
        <ArrowLeftToLineIcon className="h-4 w-4" />
      ) : (
        <ArrowRightToLineIcon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export default function Layout() {
  const { theme } = useTheme();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main
        className={`w-full ${
          theme === 'dark' ? ' main-grain-dark' : 'main-grain'
        }`}
      >
        <header className="h-16 w-full flex border-b border-gray-200 dark:border-[#1F1F23] items-center bg-white dark:bg-[#09090B]">
          <CustomSidebarTrigger />
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
