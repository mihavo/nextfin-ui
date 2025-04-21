'use client';

import { BellIcon, Search, User } from 'lucide-react';
import { Link } from 'react-router';
import { ModeToggle } from '../theme/mode-toggle';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function TopNav() {
  return (
    <nav className="px-3 sm:px-6 w-full font-medium flex items-center justify-between">
      <div className="left-items flex items-center gap-6  h-full">
        <Link to="#" className="flex items-center gap-3 text-xl font-semibold">
          <img
            src="assets/logo.png"
            alt="nextfin-logo"
            className="h-14 w-14 object-contain"
          />
          <span className="tracking-tight">Nextfin</span>
        </Link>

        <Link to={{ pathname: '/' }} className="text-primary  ">
          Dashboard
        </Link>
        <Link to={{ pathname: '/accounts' }} className="text-muted-foreground">
          Accounts
        </Link>
        <Link
          to={{ pathname: '/transactions' }}
          className="text-muted-foreground"
        >
          Transactions
        </Link>
        <Link to={{ pathname: '/cards' }} className="text-muted-foreground">
          Cards
        </Link>
      </div>
      <div className="right-items flex gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 md:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Button variant="outline" size="icon" className="rounded-full">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <div className="rounded-full">
          <ModeToggle />
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <User className="h-4 w-4" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </nav>
  );
}
