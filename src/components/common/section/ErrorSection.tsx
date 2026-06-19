import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

type ErrorSectionProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  icon?: ReactNode;
};

const ErrorSection = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try again',
  icon = <AlertCircle className="text-destructive" aria-hidden="true" />,
}: ErrorSectionProps) => {
  return (
    <div
      role="alert"
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center"
    >
      {icon && (
        <div className="flex items-center justify-center rounded-full bg-destructive/10 p-3">
          {icon}
        </div>
      )}

      <div className="space-y-1">
        <h3 className="text-2xl text-red-600">{title}</h3>
        {message && (
          <p className="text-sm text-muted-foreground max-w-md">{message}</p>
        )}
      </div>

      {onRetry && (
        <Button onClick={onRetry}>
          <RefreshCw
            className="mr-2 h-4 w-4 animate-spin-reverse"
            aria-hidden="true"
          />
          {retryText}
        </Button>
      )}
    </div>
  );
};

export default ErrorSection;
