import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  MoreVertical,
  Plus,
  Settings,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample cards data
const sampleCards = [
  {
    id: 1,
    type: 'Credit Card',
    name: 'Nextfin Premium',
    lastFour: '4532',
    expiryDate: '12/26',
    balance: 2500.0,
    limit: 10000.0,
    status: 'Active',
    cardNetwork: 'Visa',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 2,
    type: 'Debit Card',
    name: 'Nextfin Checking',
    lastFour: '8901',
    expiryDate: '08/27',
    balance: 5678.45,
    limit: null,
    status: 'Active',
    cardNetwork: 'Mastercard',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 3,
    type: 'Credit Card',
    name: 'Nextfin Travel',
    lastFour: '2468',
    expiryDate: '03/25',
    balance: 1250.0,
    limit: 5000.0,
    status: 'Frozen',
    cardNetwork: 'Visa',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    id: 4,
    type: 'Virtual Card',
    name: 'Online Shopping',
    lastFour: '1357',
    expiryDate: '06/28',
    balance: 0.0,
    limit: 2000.0,
    status: 'Active',
    cardNetwork: 'Visa',
    color: 'from-orange-600 to-orange-800',
  },
];

export default function CardsPage() {
  const [showCardNumbers, setShowCardNumbers] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleCardNumber = (cardId: number) => {
    setShowCardNumbers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Frozen':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Cards</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">Cards</h1>
          <p className="text-muted-foreground">
            Manage your credit and debit cards
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Card
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Cards Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleCards.length}</div>
            <p className="text-xs text-muted-foreground">
              {sampleCards.filter((card) => card.status === 'Active').length}{' '}
              active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {sampleCards
                .reduce((sum, card) => sum + card.balance, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all cards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credit Utilization
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">
              $3,750 of $15,000 limit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Spending
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,456</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleCards.map((card) => (
          <Card key={card.id} className="relative overflow-hidden">
            {/* Card Visual */}
            <div
              className={`relative h-48 bg-gradient-to-br ${card.color} rounded-t-lg p-6 text-white`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">{card.type}</p>
                  <p className="font-semibold">{card.name}</p>
                </div>
                <Badge className={getStatusColor(card.status)}>
                  {card.status}
                </Badge>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-75 mb-1">Card Number</p>
                    <p className="font-mono text-lg tracking-wider">
                      {showCardNumbers[card.id]
                        ? `**** **** **** ${card.lastFour}`
                        : `•••• •••• •••• ${card.lastFour}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75 mb-1">Expires</p>
                    <p className="font-mono">{card.expiryDate}</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => toggleCardNumber(card.id)}
                >
                  {showCardNumbers[card.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Card Info */}
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Available Balance
                    </p>
                    <p className="text-2xl font-bold">
                      ${card.balance.toLocaleString()}
                    </p>
                  </div>
                  {card.limit && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Credit Limit
                      </p>
                      <p className="text-lg font-semibold">
                        ${card.limit.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {card.limit && (
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Used</span>
                      <span>
                        {Math.round((card.balance / card.limit) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(card.balance / card.limit) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Lock className="h-3 w-3" />
                      {card.status === 'Frozen' ? 'Unfreeze' : 'Freeze'}
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Card Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        View Statements
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Report Lost/Stolen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common card management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <Plus className="h-6 w-6" />
              Request New Card
            </Button>
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <Lock className="h-6 w-6" />
              Report Lost Card
            </Button>
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <Settings className="h-6 w-6" />
              Update PIN
            </Button>
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <CreditCard className="h-6 w-6" />
              View Statements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
