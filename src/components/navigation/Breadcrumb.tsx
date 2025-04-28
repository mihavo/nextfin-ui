import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router';

export default function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/');

  return (
    <Breadcrumb className="mb-4 h-8 w-full items-center justify-start border-b border-gray-200 dark:border-[#1F1F23]">
      <BreadcrumbList>
        <BreadcrumbItem key={'home'}>
          <BreadcrumbLink asChild href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(1, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          {
            console.log(routeTo);
          }
          return (
            <BreadcrumbItem key={routeTo}>
              <BreadcrumbSeparator />
              <BreadcrumbLink
                asChild
                href={routeTo}
                className={isLast ? 'text-muted-foreground' : ''}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
