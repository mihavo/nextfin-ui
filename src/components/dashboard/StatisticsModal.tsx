import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DollarSign,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'balance' | 'income' | 'expenses' | 'savings';
}

// Sample data for charts
const balanceData = [
  { month: 'Jan', amount: 15000, accounts: 3 },
  { month: 'Feb', amount: 18500, accounts: 3 },
  { month: 'Mar', amount: 22000, accounts: 4 },
  { month: 'Apr', amount: 19800, accounts: 4 },
  { month: 'May', amount: 25000, accounts: 4 },
  { month: 'Jun', amount: 28500, accounts: 5 },
];

const incomeData = [
  { month: 'Jan', salary: 5000, freelance: 800, investment: 200 },
  { month: 'Feb', salary: 5000, freelance: 1200, investment: 150 },
  { month: 'Mar', salary: 5200, freelance: 900, investment: 300 },
  { month: 'Apr', salary: 5200, freelance: 1500, investment: 250 },
  { month: 'May', salary: 5500, freelance: 1100, investment: 400 },
  { month: 'Jun', salary: 5500, freelance: 1800, investment: 350 },
];

const expensesData = [
  { category: 'Housing', amount: 1200, color: '#ef4444' },
  { category: 'Food', amount: 600, color: '#f97316' },
  { category: 'Transportation', amount: 300, color: '#eab308' },
  { category: 'Entertainment', amount: 250, color: '#22c55e' },
  { category: 'Healthcare', amount: 180, color: '#3b82f6' },
  { category: 'Shopping', amount: 450, color: '#8b5cf6' },
];

const savingsData = [
  { month: 'Jan', emergency: 2000, retirement: 1500, investment: 800 },
  { month: 'Feb', emergency: 2200, retirement: 1650, investment: 950 },
  { month: 'Mar', emergency: 2400, retirement: 1800, investment: 1100 },
  { month: 'Apr', emergency: 2600, retirement: 1950, investment: 1250 },
  { month: 'May', emergency: 2800, retirement: 2100, investment: 1400 },
  { month: 'Jun', emergency: 3000, retirement: 2250, investment: 1550 },
];

export default function StatisticsModal({
  isOpen,
  onClose,
  activeTab,
}: StatisticsModalProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Sync currentTab with activeTab prop when it changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  const renderBalanceTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,500</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +14% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Monthly Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,250</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              Consistent growth
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Accounts
            </CardTitle>
            <Badge variant="secondary">5</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">
              All accounts active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Highest Balance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,500</div>
            <div className="text-xs text-muted-foreground">June 2025</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <Badge variant="outline">+58%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <div className="text-xs text-muted-foreground">6-month period</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
          <CardDescription>
            Your account balance growth over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderIncomeTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Income
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,650</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +9.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Primary Source
            </CardTitle>
            <Badge variant="outline">Salary</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,500</div>
            <div className="text-xs text-muted-foreground">
              72% of total income
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Income Streams
            </CardTitle>
            <Badge variant="secondary">3</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">
              Salary, Freelance, Investment
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Freelance Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,800</div>
            <div className="text-xs text-muted-foreground">+50% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Income</CardTitle>
            <Badge variant="outline">$45,900</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,900</div>
            <div className="text-xs text-muted-foreground">Year to date</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Breakdown</CardTitle>
          <CardDescription>
            Income sources over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" stackId="a" fill="#3b82f6" name="Salary" />
              <Bar
                dataKey="freelance"
                stackId="a"
                fill="#10b981"
                name="Freelance"
              />
              <Bar
                dataKey="investment"
                stackId="a"
                fill="#f59e0b"
                name="Investment"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderExpensesTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,980</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Largest Category
            </CardTitle>
            <Badge variant="outline">Housing</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <div className="text-xs text-muted-foreground">
              40% of total expenses
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Badge variant="secondary">6</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <div className="text-xs text-muted-foreground">
              Main expense categories
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$99</div>
            <div className="text-xs text-muted-foreground">
              Per day spending
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Expenses</CardTitle>
            <Badge variant="outline">$17,880</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17,880</div>
            <div className="text-xs text-muted-foreground">Year to date</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown by category this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  dataKey="amount"
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={5}
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expensesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="text-sm font-bold">${item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSavingsTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,800</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +17.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Badge variant="outline">44%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">44%</div>
            <div className="text-xs text-muted-foreground">
              Of monthly income
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goals</CardTitle>
            <Badge variant="secondary">3</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">
              Emergency, Retirement, Investment
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Emergency Fund
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,000</div>
            <div className="text-xs text-muted-foreground">
              3 months expenses
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Savings</CardTitle>
            <Badge variant="outline">$28,020</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,020</div>
            <div className="text-xs text-muted-foreground">Year to date</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Savings Growth</CardTitle>
          <CardDescription>
            Your savings goals progress over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="emergency"
                stroke="#ef4444"
                strokeWidth={3}
                name="Emergency Fund"
              />
              <Line
                type="monotone"
                dataKey="retirement"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Retirement"
              />
              <Line
                type="monotone"
                dataKey="investment"
                stroke="#10b981"
                strokeWidth={3}
                name="Investment"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-[98vw] min-w-[1200px] max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Financial Statistics
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={currentTab}
          onValueChange={(value) =>
            setCurrentTab(
              value as 'balance' | 'income' | 'expenses' | 'savings'
            )
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="balance" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Balance
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Income
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              Savings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="mt-6">
            {renderBalanceTab()}
          </TabsContent>

          <TabsContent value="income" className="mt-6">
            {renderIncomeTab()}
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            {renderExpensesTab()}
          </TabsContent>

          <TabsContent value="savings" className="mt-6">
            {renderSavingsTab()}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
