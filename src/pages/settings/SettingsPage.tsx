'use client';

import {
  ArrowLeft,
  Bell,
  Download,
  Globe,
  Moon,
  Settings,
  Shield,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/components/theme/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAppSelector } from '@/store/hooks';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const user = useAppSelector((state) => state.auth.user);

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
  });

  const [preferences, setPreferences] = useState({
    currency: 'USD',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/New_York',
  });

  const settingSections = [
    {
      id: 'account',
      title: 'Account & Profile',
      description: 'Personal information and account status',
      icon: User,
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Current notification preferences',
      icon: Bell,
      iconBg: 'bg-amber-100 dark:bg-amber-900',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Account security and data protection',
      icon: Shield,
      iconBg: 'bg-red-100 dark:bg-red-900',
      iconColor: 'text-red-600 dark:text-red-400',
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      description: 'Customize your app experience',
      icon: Settings,
      iconBg: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and app preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Settings Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Settings</h3>
                <nav className="space-y-2">
                  {settingSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                    >
                      <div className={`p-1.5 rounded-md ${section.iconBg}`}>
                        <section.icon
                          className={`h-4 w-4 ${section.iconColor}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{section.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </nav>
              </Card>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Account & Profile Section */}
            <section id="account">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Account & Profile</CardTitle>
                      <CardDescription>
                        Personal information and account status
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={user?.username || ''}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={user?.preferredPhoneNumber || ''}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Account Status</p>
                      <p className="text-sm text-muted-foreground">
                        Your account is verified and active
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Notifications Section */}
            <section id="notifications">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
                      <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Current notification settings (managed by system)
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between opacity-75">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Transaction alerts and security updates via email
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          Enabled
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between opacity-75">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Instant alerts on your device
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          Disabled
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between opacity-75">
                      <div>
                        <p className="font-medium">SMS Security Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Critical security notifications via SMS
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          Enabled
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between opacity-75">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-muted-foreground">
                          Product updates and promotional content
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          Disabled
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <p className="text-sm text-muted-foreground">
                      💡 Notification preferences are managed by your system
                      administrator. Contact support if you need to modify these
                      settings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Security & Privacy Section */}
            <section id="security">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
                      <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <CardTitle>Security & Privacy</CardTitle>
                      <CardDescription>
                        Account security and data protection
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Recommended
                        </Badge>
                        <Switch
                          checked={security.twoFactor}
                          onCheckedChange={(checked) =>
                            setSecurity((prev) => ({
                              ...prev,
                              twoFactor: checked,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Automatically sign you out after period of inactivity
                      </p>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) =>
                          setSecurity((prev) => ({
                            ...prev,
                            sessionTimeout: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Data & Privacy</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Button variant="outline" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* App Preferences Section */}
            <section id="preferences">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                      <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>
                        Customize your app experience
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred appearance
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={theme === 'light' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-4 w-4 mr-1" />
                          Light
                        </Button>
                        <Button
                          variant={theme === 'dark' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-4 w-4 mr-1" />
                          Dark
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select
                          value={preferences.currency}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              currency: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">
                              GBP - British Pound
                            </SelectItem>
                            <SelectItem value="CAD">
                              CAD - Canadian Dollar
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              language: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select
                          value={preferences.dateFormat}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              dateFormat: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="DD/MM/YYYY">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD">
                              YYYY-MM-DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={preferences.timezone}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              timezone: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              Eastern Time
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Save Changes */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
