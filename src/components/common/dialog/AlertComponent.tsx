import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';

type Props = {
  isAlertDialogOpen?: boolean;
  errorText?: string;
  onOpenChange: (open: boolean) => void;
  onAction: () => void;
  isDeleting: boolean;
  buttonText?: string;
  actionText?: string;
  loadingText?: string;
};

const AlertComponent = ({
  isAlertDialogOpen,
  errorText,
  onOpenChange,
  onAction,
  isDeleting,
  buttonText,
  actionText,
  loadingText,
}: Props) => {
  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <p>{buttonText}</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        {errorText && (
          <p className="text-sm text-destructive font-medium" role="alert">
            {errorText}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onAction}>
            {isDeleting ? loadingText || 'Deleting...' : actionText || 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertComponent;
