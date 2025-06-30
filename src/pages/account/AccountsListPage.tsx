import Accounts from '@/components/account/Accounts';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import { useTheme } from '@/components/theme/theme-provider';
import { fetchUserAccountsAction } from '@/features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

export default function AccountsListPage() {
  const { theme } = useTheme();
  const bgTheme = theme === 'dark' ? 'main-grain-dark' : 'main-grain';

  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts.entities);

  useEffect(() => {
    dispatch(fetchUserAccountsAction());
  }, [dispatch]);

  return (
    <div className={`flex min-h-screen w-full flex-col ${bgTheme}`}>
      <Breadcrumb />
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Accounts</h1>
          <p className="text-muted-foreground">
            Manage and view all your bank accounts
          </p>
        </div>
        <Accounts items={accounts} />
      </main>
    </div>
  );
}
