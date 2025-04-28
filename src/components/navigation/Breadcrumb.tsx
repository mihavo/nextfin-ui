import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router';

export default function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb className="mb-4 h-8 w-full items-center justify-start border-b border-gray-200 dark:border-[#1F1F23]">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbLink>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(1, index).join('/')}`;
          const isLast = index === pathnames.length - 1;
          {
            console.log(routeTo);
          }
          return (
            <BreadcrumbItem key={routeTo}>
              <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link
                  to={routeTo}
                  className={isLast ? 'text-muted-foreground' : ''}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbLink>
    </Breadcrumb>
  );
}
