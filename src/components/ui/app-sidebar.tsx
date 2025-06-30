import { logoutAction } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  ArrowUpDown,
  Bell,
  Building,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  LogOut,
  PieChart,
  Search,
  Settings,
  Shield,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from './avatar';
import { Badge } from './badge';
import { Input } from './input';
import { Separator } from './separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './sidebar';

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const user = useAppSelector((state) => state.auth.user);
  const accounts = useAppSelector((state) => state.accounts.entities);

  const handleSignOut = () => {
    dispatch(logoutAction());
    navigate('/logout');
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    );
  };

  const mainNavItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
      isActive: location.pathname === '/',
    },
    {
      title: 'Accounts',
      url: '/accounts',
      icon: Wallet,
      isActive: isActive('/accounts'),
      badge: accounts?.length || 0,
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: ArrowUpDown,
      isActive: isActive('/transactions'),
    },
    {
      title: 'Cards',
      url: '/cards',
      icon: CreditCard,
      isActive: isActive('/cards'),
      badge: 'Soon',
      disabled: true,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: PieChart,
      isActive: isActive('/analytics'),
      badge: 'New',
      disabled: true,
    },
  ];

  const quickActions = [
    {
      title: 'Transfer Money',
      icon: DollarSign,
      action: () => navigate('/transactions'),
      className:
        'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20',
    },
    {
      title: 'Pay Bills',
      icon: Building,
      action: () => {},
      className:
        'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      disabled: true,
    },
  ];

  const bottomNavItems = [
    {
      title: 'Notifications',
      url: '/notifications',
      icon: Bell,
      badge: 3,
      disabled: true,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      disabled: true,
    },
    {
      title: 'Help & Support',
      url: '/help',
      icon: HelpCircle,
      disabled: true,
    },
  ];

  return (
    <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">
              Nextfin
            </span>
            <span className="text-xs text-muted-foreground">Financial Hub</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-muted/50"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* User Profile Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3 m-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@nextfin.com'}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2" />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.disabled}
                    data-active={item.isActive}
                    className={`relative ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={item.disabled}
                  >
                    {item.disabled ? (
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              typeof item.badge === 'string'
                                ? 'outline'
                                : 'secondary'
                            }
                            className="ml-auto h-5 px-1.5 text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              typeof item.badge === 'string'
                                ? 'outline'
                                : 'secondary'
                            }
                            className="ml-auto h-5 px-1.5 text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2" />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton
                    onClick={action.disabled ? undefined : action.action}
                    className={`cursor-pointer transition-colors ${
                      action.className
                    } ${
                      action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={action.disabled}
                  >
                    <action.icon className="h-4 w-4" />
                    <span>{action.title}</span>
                    {action.disabled && (
                      <Badge
                        variant="outline"
                        className="ml-auto h-5 px-1.5 text-xs"
                      >
                        Soon
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2" />

        {/* Account Summary */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Account Summary
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 p-2">
              <div className="rounded-lg bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-200 dark:border-emerald-800 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Total Balance
                  </span>
                  <Wallet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                  $
                  {accounts
                    ?.reduce((sum, acc) => sum + Number(acc.balance || 0), 0)
                    .toFixed(2) || '0.00'}
                </p>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200 dark:border-blue-800 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                    Active Accounts
                  </span>
                  <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
                  {accounts?.filter((acc) => acc.status === 'ACTIVE').length ||
                    0}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-4">
        {/* Bottom Navigation */}
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!item.disabled}
                size="sm"
                data-active={isActive(item.url)}
                className={item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                disabled={item.disabled}
              >
                {item.disabled ? (
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="ml-auto h-4 w-4 p-0 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <a href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="ml-auto h-4 w-4 p-0 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <Separator className="my-2" />

        {/* Sign Out Button */}
        <SidebarMenuButton
          onClick={handleSignOut}
          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
