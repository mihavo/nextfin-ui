import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Download, Plus, Send } from 'lucide-react';

export default function Accounts() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Accounts</CardTitle>
          <CardDescription>Manage your accounts and cards</CardDescription>
        </div>
        <Button size="sm" className="ml-auto gap-1">
          <Plus className="h-3.5 w-3.5" />
          Add Account
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="checking">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checking">Checking</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="credit">Credit Cards</TabsTrigger>
          </TabsList>
          <TabsContent value="checking" className="pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="font-semibold">Primary Checking</div>
                  <div className="ml-auto text-sm">**** 4832</div>
                </div>
                <div className="text-2xl font-bold">$24,987.45</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div>Available Balance</div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-green-500">+$1,200.00</span>
                    <span>today</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="font-semibold">Joint Checking</div>
                  <div className="ml-auto text-sm">**** 7645</div>
                </div>
                <div className="text-2xl font-bold">$8,294.32</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div>Available Balance</div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-red-500">-$340.58</span>
                    <span>today</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="savings" className="pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="font-semibold">High-Yield Savings</div>
                  <div className="ml-auto text-sm">**** 9321</div>
                </div>
                <div className="text-2xl font-bold">$12,234.00</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div>Available Balance</div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-green-500">+$234.00</span>
                    <span>this month</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="credit" className="pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="font-semibold">Platinum Rewards</div>
                  <div className="ml-auto text-sm">**** 5678</div>
                </div>
                <div className="text-2xl font-bold">$3,456.78</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div>Current Balance</div>
                  <div className="ml-auto flex items-center gap-1">
                    <span>$10,000.00 limit</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="font-semibold">Cash Back Card</div>
                  <div className="ml-auto text-sm">**** 9012</div>
                </div>
                <div className="text-2xl font-bold">$1,234.56</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div>Current Balance</div>
                  <div className="ml-auto flex items-center gap-1">
                    <span>$5,000.00 limit</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between border-t px-6 py-4">
        <div className="text-xs text-muted-foreground">
          Updated 2 minutes ago
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Send className="h-3.5 w-3.5" />
            Transfer
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
