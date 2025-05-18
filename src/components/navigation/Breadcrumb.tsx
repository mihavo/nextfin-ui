import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ArrowLeft, Home } from 'lucide-react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function AppBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/');

  return (
    <Breadcrumb className=" px-12 h-10 p-2  font-medium  w-full flex items-center border-b  dark:border-[#1F1F23] dark:bg-[#0e0e11]">
      <BreadcrumbList className="text-md">
        <BreadcrumbItem key={'back'}>
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="mr-2 text-slate-300 hover:bg-accent"
          >
            <ArrowLeft className="text-[#71717B]" />
          </Button>
        </BreadcrumbItem>
        <BreadcrumbItem key={'home'}>
          <Home height="16px" />
          <BreadcrumbLink asChild href="/">
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.slice(1, pathnames.length - 1).map((name, index) => {
          const routeTo = `/${pathnames.slice(1, index + 2).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={routeTo}>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={routeTo}>
                <BreadcrumbLink
                  asChild
                  className={isLast ? 'text-muted-foreground' : ''}
                >
                  <Link to={routeTo}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
