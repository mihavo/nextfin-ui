import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Transaction } from '@/types/Transaction';
import { CreditCard } from 'lucide-react';

export default function Transactions({ items }: { items: Transaction[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {items.map((item) => (
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">{item.targetAccountId}</div>
              <div className="text-xs text-muted-foreground">
                Online Shopping
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-red-500">-{item.amount}</div>
              <div className="text-xs text-muted-foreground">
                {item.updatedAt}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="outline" className="w-full gap-1">
          {/* <History className="h-3.5 w-3.5" /> */}
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}
