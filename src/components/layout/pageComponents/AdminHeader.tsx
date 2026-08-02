import React from 'react';
import { SidebarTrigger } from '@components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 w-full mb-4 bg-background/50 backdrop-blur-md px-4 border border-border shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/admin">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.length > 1 && <BreadcrumbSeparator />}
            {pathnames.slice(1).map((value, index, arr) => {
              const to = `/${pathnames.slice(0, index + 2).join('/')}`;
              const isLast = index === arr.length - 1;
              const title = value.charAt(0).toUpperCase() + value.slice(1);
              return (
                <React.Fragment key={to}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={to}>{title}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AdminHeader;
