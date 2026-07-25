import type { Roles } from '@/types/user';
import { Spinner } from '@components/ui/spinner';
import { useGetCurrentUser } from '@api/user/user.hooks';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

type Props = {
  allowedRoles?: Roles[];
  redirectTo?: string;
  requireAuth?: boolean;
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({
  allowedRoles = [],
  redirectTo = '/login',
  requireAuth = true,
  children,
}) => {
  const { data: user, isPending, isError } = useGetCurrentUser();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  if (!requireAuth) {
    if (user && !isError) {
      return <Navigate to="/" replace />;
    }
    return children ? <>{children}</> : <Outlet />;
  }

  if (isError || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0) {
    if (!user.role || !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
