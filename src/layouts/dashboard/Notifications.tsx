import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Info,
  Settings,
  Shield,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'security';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from Chrome on macOS',
      timestamp: '2 minutes ago',
      read: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'success',
      title: 'Payment Processed',
      message: 'Your transfer of $250.00 to Sarah was successful',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'info',
      title: 'Account Performance',
      message: 'Your savings account earned $45.20 this month',
      timestamp: '3 hours ago',
      read: true,
      priority: 'low',
    },
    {
      id: '4',
      type: 'warning',
      title: 'Low Balance Alert',
      message: 'Your checking account balance is below $500',
      timestamp: '1 day ago',
      read: false,
      priority: 'medium',
    },
    {
      id: '5',
      type: 'info',
      title: 'Statement Ready',
      message: 'Your December statement is now available',
      timestamp: '2 days ago',
      read: true,
      priority: 'low',
    },
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'security':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
      default:
        return 'bg-gray-400';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-7 px-2 text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-40">
          <div className="space-y-1 px-4 py-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="rounded-full bg-muted/20 p-3 mb-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  No notifications
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're all caught up!
                </p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`group relative flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                      !notification.read
                        ? 'bg-primary/5 border border-primary/20'
                        : ''
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium truncate">
                            {notification.title}
                          </h4>
                          <div
                            className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${getPriorityColor(
                              notification.priority
                            )}`}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.timestamp}</span>
                        </div>

                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 px-2 text-xs text-primary hover:text-primary"
                          >
                            Mark read
                          </Button>
                        )}
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
                    )}
                  </div>

                  {index < notifications.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <Button variant="outline" className="w-full h-8 text-xs">
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
