import {
  AlertCircle,
  ArrowUpDown,
  BellIcon,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  Search,
  Settings,
  Wallet,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ModeToggle } from '../theme/mode-toggle';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import UserNav from './UserNav';

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    title: 'Payment Received',
    message: 'You received $2,500 from John Doe',
    time: '2 minutes ago',
    type: 'success',
    icon: DollarSign,
    read: false,
  },
  {
    id: 2,
    title: 'Account Update',
    message: 'Your checking account balance has been updated',
    time: '1 hour ago',
    type: 'info',
    icon: CheckCircle,
    read: false,
  },
  {
    id: 3,
    title: 'Security Alert',
    message: 'New login detected from Chrome on Windows',
    time: '3 hours ago',
    type: 'warning',
    icon: AlertCircle,
    read: true,
  },
  {
    id: 4,
    title: 'Transaction Complete',
    message: 'Transfer of $1,200 to Savings completed successfully',
    time: '1 day ago',
    type: 'success',
    icon: CheckCircle,
    read: true,
  },
];

function NotificationsPopover() {
  const unreadCount = sampleNotifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <BellIcon className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>
        <Separator />
        <div className="max-h-80 overflow-y-auto">
          {sampleNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-3 hover:bg-muted/50 cursor-pointer border-l-2 transition-colors ${
                  !notification.read
                    ? 'border-l-primary bg-muted/20'
                    : 'border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-full ${
                      notification.type === 'success'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                        : notification.type === 'warning'
                        ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    }`}
                  >
                    <IconComponent className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm font-medium truncate ${
                          !notification.read
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm" size="sm">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Search pages data
const searchablePages = [
  {
    title: 'Dashboard',
    description: 'Overview of your accounts and recent activity',
    url: '/',
    icon: Home,
    keywords: ['dashboard', 'home', 'overview', 'summary'],
  },
  {
    title: 'Accounts',
    description: 'View and manage your bank accounts',
    url: '/accounts',
    icon: Wallet,
    keywords: ['accounts', 'balance', 'checking', 'savings', 'account'],
  },
  {
    title: 'Transactions',
    description: 'View transaction history and details',
    url: '/transactions',
    icon: ArrowUpDown,
    keywords: ['transactions', 'payments', 'transfers', 'history', 'activity'],
  },
  {
    title: 'Cards',
    description: 'Manage your credit and debit cards',
    url: '/cards',
    icon: CreditCard,
    keywords: ['cards', 'credit', 'debit', 'payment methods'],
  },
  {
    title: 'Settings',
    description: 'Account settings and preferences',
    url: '/settings',
    icon: Settings,
    keywords: ['settings', 'preferences', 'configuration', 'profile'],
  },
  {
    title: 'Help & Support',
    description: 'Get help and contact support',
    url: '/help',
    icon: HelpCircle,
    keywords: ['help', 'support', 'contact', 'assistance', 'faq'],
  },
];

function SearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return searchablePages.slice(0, 4); // Show top 4 when no query

    return searchablePages.filter((page) => {
      const query = searchQuery.toLowerCase();
      return (
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query) ||
        page.keywords.some((keyword) => keyword.includes(query))
      );
    });
  }, [searchQuery]);

  const handleSelectPage = (page: (typeof searchablePages)[0]) => {
    navigate(page.url);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <Popover open={searchOpen} onOpenChange={setSearchOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search pages...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search pages..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="border-none focus:ring-0"
              autoFocus
            />
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No pages found
                </div>
              </CommandEmpty>
              <CommandGroup heading="Pages">
                {filteredPages.map((page) => {
                  const IconComponent = page.icon;
                  return (
                    <CommandItem
                      key={page.url}
                      value={page.title}
                      onSelect={() => handleSelectPage(page)}
                      className="flex items-start gap-3 p-3 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-md bg-muted">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{page.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {page.description}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function TopNav() {
  const location = useLocation();
  
  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path || 
                    (path !== '/' && location.pathname.startsWith(path));
    return isActive 
      ? "text-blue-600 font-semibold" 
      : "text-muted-foreground hover:text-foreground transition-colors";
  };

  return (
    <nav className="px-3 sm:px-6 w-full font-medium flex items-center justify-between bg-background shadow-sm">
      <div className="left-items flex items-center gap-6  h-full">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold">
          <img
            src="/assets/logo.png"
            alt="nextfin-logo"
            className="h-14 w-14 object-contain"
          />
          <span className="tracking-tight">Nextfin</span>
        </Link>

        <Link to="/" className={getLinkClasses('/')}>
          Dashboard
        </Link>
        <Link to="/accounts" className={getLinkClasses('/accounts')}>
          Accounts
        </Link>
        <Link to="/transactions" className={getLinkClasses('/transactions')}>
          Transactions
        </Link>
        <Link to="/cards" className={getLinkClasses('/cards')}>
          Cards
        </Link>
      </div>
      <div className="right-items flex gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchBar />
        <NotificationsPopover />
        <div className="rounded-full">
          <ModeToggle />
        </div>
        <UserNav />
      </div>
    </nav>
  );
}
