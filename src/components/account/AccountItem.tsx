import { Account } from '@/types/Account';
import { currencyFormatter } from '../utils/currency-formatter';

export default function AccountItem({ item }: { item: Account }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2 px-3 py-2 hover:bg-muted  transition-all rounded-xl">
        <div className="flex items-center">
          <div className="font-semibold">{item.accountType}</div>
          <div className="ml-auto text-sm">
            {item.friendlyName?.toUpperCase() ?? `Account No#${item.id}`}
          </div>
        </div>
        <div className="text-2xl font-bold">
          {currencyFormatter(item.currency, item.balance)}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>Available Balance</div>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-green-500">+$1,200.00</span>
            <span>today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
