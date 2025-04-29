import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export default function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/');

  return (
    <Breadcrumb className=" px-12 h-10 p-2  font-medium  w-full flex items-center border-b  dark:border-[#1F1F23] dark:bg-[#0e0e11]">
      <BreadcrumbList className="text-md">
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
            <BreadcrumbItem key={routeTo}>
              <BreadcrumbSeparator />
              <BreadcrumbLink
                asChild
                className={isLast ? 'text-muted-foreground' : ''}
              >
                <Link to={routeTo}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
