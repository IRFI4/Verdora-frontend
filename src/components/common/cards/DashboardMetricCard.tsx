import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { X, type LucideIcon } from 'lucide-react';

type Props = {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
  error: boolean;
  errorMessage: string;
};

const DashboardMetricCard = ({
  value,
  title,
  description,
  icon: Icon,
  error,
  errorMessage,
}: Props) => {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        {!error ? (
          <Icon className="size-4 text-muted-foreground" />
        ) : (
          <X className="size-4 text-red-500" />
        )}
      </CardHeader>

      <CardContent>
        {!error ? (
          <div className="text-2xl font-bold text-foreground">{value}</div>
        ) : (
          <div className="text-sm font-bold text-red-500">{errorMessage}</div>
        )}
        {!error && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardMetricCardSkeleton = () => {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-4 rounded" />
      </CardHeader>

      <CardContent>
        <Skeleton className="mb-2 h-8 w-20" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
};

export { DashboardMetricCardSkeleton, DashboardMetricCard };
