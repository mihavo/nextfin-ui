import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, LogOut, Plus, Send, Settings } from 'lucide-react';

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button className="h-20 flex-col gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 dark:text-white dark:bg-blue-700 dark:hover:bg-blue-600">
          <Send className="h-5 w-5" />
          <div className="text-xs">Send Money</div>
        </Button>
        <Button className="h-20 flex-col gap-1 rounded-xl bg-violet-400 hover:bg-violet-500 dark:text-white dark:bg-violet-700 dark:hover:bg-violet-600">
          <CreditCard className="h-5 w-5" />
          <div className="text-xs">Pay Bills</div>
        </Button>
        <Button className="h-20 flex-col gap-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:text-white dark:bg-emerald-700 dark:hover:bg-emerald-600">
          <Plus className="h-5 w-5" />
          <div className="text-xs">Add Money</div>
        </Button>
        <Button className="h-20 flex-col gap-1 rounded-xl bg-gray-400 hover:bg-gray-500 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600">
          <Settings className="h-5 w-5" />
          <div className="text-xs">Settings</div>
        </Button>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          variant="outline"
          className="w-full gap-1 text-red-500 hover:text-red-500"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}
