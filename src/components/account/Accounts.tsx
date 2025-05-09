import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resetStatus } from '@/features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import { Download, Plus, Send } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountItem from './AccountItem';

export default function Accounts({ items }: { items: Account[] }) {
  const status = useAppSelector(
    (state) => state.accounts.getUserAccountsStatus
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      dispatch(resetStatus('getUserAccountsStatus'));
    }
  }, [status, dispatch]);

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Accounts</CardTitle>
          <CardDescription>Manage your accounts and cards</CardDescription>
        </div>
        <Link to="/accounts/new" className="ml-auto">
          <Button
            size="sm"
            className=" gap-1 dark:text-white hover:bg-blue-500"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Account
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="checking">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checking">Checking</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="trust">Trust</TabsTrigger>
          </TabsList>
          <TabsContent
            value="checking"
            className="pt-4 max-h-72 overflow-y-auto"
          >
            {status === 'pending' ? (
              <Skeleton className="h-6 w-2/3 rounded" />
            ) : (
              items
                .filter((item) => item.accountType === 'CHECKING')
                .map((item) => <AccountItem item={item} key={item.id} />)
            )}
          </TabsContent>
          <TabsContent value="savings" className="pt-4">
            <div className="grid gap-4">
              {status === 'pending' ? (
                <Skeleton className="h-6 w-2/3 rounded" />
              ) : (
                items
                  .filter((item) => item.accountType === 'SAVINGS')
                  .map((item) => <AccountItem item={item} key={item.id} />)
              )}
            </div>
          </TabsContent>
          <TabsContent value="trust" className="pt-4">
            {status === 'pending' ? (
              <Skeleton className="h-6 w-2/3 rounded" />
            ) : (
              items
                .filter((item) => item.accountType === 'TRUST')
                .map((item) => <AccountItem item={item} key={item.id} />)
            )}
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
