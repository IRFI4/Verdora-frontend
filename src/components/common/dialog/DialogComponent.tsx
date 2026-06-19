import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@components/ui/dialog';
import type React from 'react';

type Props = {
  triggerText?: string;
  children: React.ReactNode;
  headerTitle: string;
  headerDescription?: string;

  cancelText?: string;
  cancelVariant?:
    | 'default'
    | 'active'
    | 'inactive'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'secondary'
    | 'link';

  submitText?: string;
  submitDisabled?: boolean;
  submitVariant?:
    | 'default'
    | 'active'
    | 'inactive'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'secondary'
    | 'link';
  onSubmit?: () => void;

  thirdActionText?: string;
  thirdActionDisabled?: boolean;
  thirdActionVariant?:
    | 'default'
    | 'active'
    | 'inactive'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'secondary'
    | 'link';
  onThirdAction?: () => void;

  open?: boolean;
  loading?: boolean;
  contentClassName?: string;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
};

export const DialogComponent = ({
  triggerText,
  children,
  headerTitle,
  headerDescription,
  cancelText = 'Cancel',
  cancelVariant = 'outline',
  submitText,
  submitDisabled = false,
  submitVariant = 'active',
  thirdActionText,
  thirdActionDisabled = false,
  thirdActionVariant,
  onSubmit,
  onThirdAction,
  open,
  onOpenChange,
  contentClassName,
  triggerClassName,
  loading = false,
}: Props) => {
  const resolvedThirdActionVariant =
    thirdActionVariant ??
    (thirdActionText?.toLowerCase() === 'delete' ? 'destructive' : 'default');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerText && (
        <DialogTrigger asChild>
          <Button className={triggerClassName ?? 'w-full text-center'}>
            {triggerText}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className={contentClassName ?? 'sm:max-w-md'}>
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>

          {headerDescription && (
            <DialogDescription>{headerDescription}</DialogDescription>
          )}
        </DialogHeader>

        {children}

        <DialogFooter className="flex w-full flex-row items-center justify-between sm:justify-between">
          {thirdActionText ? (
            <>
              <Button
                type="button"
                variant={resolvedThirdActionVariant}
                disabled={thirdActionDisabled || loading}
                onClick={onThirdAction}
                className="mr-auto"
              >
                {thirdActionText}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={cancelVariant}
                  onClick={() => onOpenChange?.(false)}
                  disabled={loading}
                >
                  {cancelText}
                </Button>

                {submitText && (
                  <Button
                    onClick={() => {
                      onSubmit?.();
                      onOpenChange?.(false);
                    }}
                    type="submit"
                    variant={submitVariant}
                    disabled={submitDisabled || loading}
                  >
                    {loading ? 'Loading...' : submitText}
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant={cancelVariant}
                onClick={() => onOpenChange?.(false)}
                className="mr-auto"
                disabled={loading}
              >
                {cancelText}
              </Button>

              {submitText && (
                <Button
                  onClick={() => {
                    onSubmit?.();
                    onOpenChange?.(false);
                  }}
                  type="submit"
                  variant={submitVariant}
                  disabled={submitDisabled || loading}
                >
                  {loading ? 'Loading...' : submitText}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
