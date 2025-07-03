import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { logoutAction } from '@/features/auth/authSlice';
import NewTransactionModal from '@/pages/transactions/NewTransactionModal';
import { useAppDispatch } from '@/store/hooks';
import {
  ArrowUpRight,
  LogOut,
  Plus,
  Receipt,
  Send,
  Settings,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [transferModalOpen, setTransferModalOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(logoutAction());
    navigate('/logout');
  };

  const quickActions = [
    {
      title: 'Send Money',
      description: 'Transfer funds instantly',
      icon: Send,
      onClick: () => setTransferModalOpen(true),
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700',
      darkGradient: 'dark:from-blue-600 dark:to-blue-700',
      darkHoverGradient: 'dark:hover:from-blue-500 dark:hover:to-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Pay Bills',
      description: 'Schedule payments',
      icon: Receipt,
      onClick: () => {},
      gradient: 'from-violet-500 to-violet-600',
      hoverGradient: 'hover:from-violet-600 hover:to-violet-700',
      darkGradient: 'dark:from-violet-600 dark:to-violet-700',
      darkHoverGradient: 'dark:hover:from-violet-500 dark:hover:to-violet-600',
      iconBg: 'bg-violet-100 dark:bg-violet-900',
      iconColor: 'text-violet-600 dark:text-violet-400',
      badge: 'Soon',
      disabled: true,
    },
    {
      title: 'Add Money',
      description: 'Deposit to account',
      icon: Plus,
      onClick: () => {},
      gradient: 'from-emerald-500 to-emerald-600',
      hoverGradient: 'hover:from-emerald-600 hover:to-emerald-700',
      darkGradient: 'dark:from-emerald-600 dark:to-emerald-700',
      darkHoverGradient:
        'dark:hover:from-emerald-500 dark:hover:to-emerald-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badge: 'Soon',
      disabled: true,
    },
    {
      title: 'Quick Settings',
      description: 'Account preferences',
      icon: Settings,
      onClick: () => navigate('/settings'),
      gradient: 'from-gray-500 to-gray-600',
      hoverGradient: 'hover:from-gray-600 hover:to-gray-700',
      darkGradient: 'dark:from-gray-600 dark:to-gray-700',
      darkHoverGradient: 'dark:hover:from-gray-500 dark:hover:to-gray-600',
      iconBg: 'bg-gray-100 dark:bg-gray-900',
      iconColor: 'text-gray-600 dark:text-gray-400',
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-primary" />
              Quick Actions
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Perform common tasks instantly
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pb-3">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            onClick={action.disabled ? undefined : action.onClick}
            disabled={action.disabled}
            className={`
              relative w-full h-auto p-3 justify-start text-left
              bg-gradient-to-r ${action.gradient} ${action.hoverGradient}
              ${action.darkGradient} ${action.darkHoverGradient}
              border-0 text-white
              transition-all duration-200 ease-out
              hover:scale-[1.02] hover:shadow-lg
              active:scale-[0.98]
              group
              ${
                action.disabled
                  ? 'opacity-60 cursor-not-allowed hover:scale-100'
                  : ''
              }
            `}
          >
            <div className="flex items-center gap-3 w-full">
              <div
                className={`
                p-1.5 rounded-lg ${action.iconBg}
                transition-transform duration-200
                group-hover:scale-110
              `}
              >
                <action.icon className={`h-4 w-4 ${action.iconColor}`} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm">
                    {action.title}
                  </span>
                  {action.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/20 text-white border-white/30 py-0 px-1.5"
                    >
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-white/80 mt-0.5">
                  {action.description}
                </p>
              </div>

              {!action.disabled && (
                <ArrowUpRight className="h-3.5 w-3.5 text-white/60 transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </div>
          </Button>
        ))}
      </CardContent>

      <Separator className="mx-4" />

      <CardFooter className="pt-3 pb-4">
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950 border-red-200 dark:border-red-800 transition-all duration-200 hover:scale-[1.02] h-9"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </CardFooter>

      <NewTransactionModal
        isModalOpen={transferModalOpen}
        onOpenChange={setTransferModalOpen}
      />
    </Card>
  );
}
