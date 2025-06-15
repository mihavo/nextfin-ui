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
import NewTransactionModal from '@/pages/transactions/NewTransactionModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Account } from '@/types/Account';
import {
  CreditCard,
  Download,
  Handshake,
  PiggyBank,
  Plus,
  Send,
  UserX,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountItem from './AccountItem';

export function EmptyCategory({ category }: { category: string }) {
  const navigate = useNavigate();
  const formatted =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const iconProps = 'mx-auto h-12 w-12 text-gray-400 dark:text-gray-500';
  const renderAccountIcon = (type: string) => {
    switch (type) {
      case 'CHECKING':
        return <CreditCard className={iconProps} />;
      case 'SAVINGS':
        return <PiggyBank className={iconProps} />;
      case 'TRUST':
        return <Handshake className={iconProps} />;
      default:
        return <UserX className={iconProps} />;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center">
      {renderAccountIcon(category)}
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        No {formatted} Accounts
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        You have no {category.toLowerCase()} accounts yet.
      </p>
      <Button
        variant="outline"
        size={'lg'}
        className="mt-6 inline-flex items-center gap-2"
        onClick={() => navigate('/accounts/new')}
      >
        <Plus className="h-5 w-5" />
        Add {formatted} Account
      </Button>
    </div>
  );
}

export default function Accounts({ items }: { items: Account[] }) {
  const status = useAppSelector(
    (state) => state.accounts.getUserAccountsStatus
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      dispatch(resetStatus('getUserAccountsStatus'));
    }
  }, [status, dispatch]);

  const toggleTransferModal = () => {
    setTransferModalOpen(true);
  };

  const renderByCategory = (category: string) => {
    const list = items
      .filter((item) => item.accountType === category)
      .sort((a, b) => b.balance - a.balance);

    if (list.length === 0) {
      return <EmptyCategory category={category} />;
    }

    return list.map((item) => <AccountItem item={item} key={item.id} />);
  };

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
            className="flex  flex-col pt-4 max-h-72 overflow-y-auto gap-6"
          >
            {status === 'pending' ? (
              <Skeleton className="h-6 w-2/3 rounded" />
            ) : (
              renderByCategory('CHECKING')
            )}
          </TabsContent>
          <TabsContent value="savings" className="pt-4">
            <div className="grid gap-4">
              {status === 'pending' ? (
                <Skeleton className="h-6 w-2/3 rounded" />
              ) : (
                renderByCategory('SAVINGS')
              )}
            </div>
          </TabsContent>
          <TabsContent value="trust" className="pt-4">
            {status === 'pending' ? (
              <Skeleton className="h-6 w-2/3 rounded" />
            ) : (
              renderByCategory('TRUST')
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between border-t px-6 py-4">
        <div className="text-xs text-muted-foreground">
          Updated 2 minutes ago
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={toggleTransferModal}
          >
            <Send className="h-3.5 w-3.5" />
            Transfer
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            Download
          </Button>
        </div>
      </CardFooter>
      <NewTransactionModal
        isModalOpen={transferModalOpen}
        onOpenChange={setTransferModalOpen}
      />
    </Card>
  );
}
