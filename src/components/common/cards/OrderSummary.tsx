import { Separator } from '@components/ui/separator';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CheckIcon from '@assets/icons/checkbox.svg?react';
import { Skeleton } from '@components/ui/skeleton';

type Props = {
  totalItems: number;
  totalItemsPrice: number;
  shippingCost: number;
  totalCost: number;
  agreeToTerms: boolean;
  agreeToTermsError?: string;
  onAgreeToTermsChange: (value: boolean) => void;
  handleProceedToCheckout: () => void;
  loading?: boolean;
};

const OrderSummary = ({
  totalItems,
  totalItemsPrice,
  shippingCost,
  totalCost,
  agreeToTerms,
  agreeToTermsError,
  onAgreeToTermsChange,
  handleProceedToCheckout,
  loading = false,
}: Props) => {
  if (loading) {
    return (
      <div className="bg-white p-[32px] flex flex-col rounded-2xl w-full lg:max-w-sm gap-6">
        <Skeleton className="h-[24px] w-[160px]" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-[16px] w-full" />
          <Skeleton className="h-[16px] w-2/3" />
        </div>

        <Skeleton className="h-[1px] w-full" />

        <Skeleton className="h-[24px] w-full" />

        <Skeleton className="h-[48px] w-full" />
        <Skeleton className="h-[40px] w-full" />
      </div>
    );
  }

  return (
    <div className="bg-white p-[32px] flex flex-col items-center rounded-2xl w-full lg:max-w-sm gap-10">
      <div className="w-full flex flex-col mb-6">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="flex flex-col mt-6 gap-[16px]">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Subtotal ({totalItems ?? 0} items)
            </span>
            <span>${(totalItemsPrice ?? 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>${(shippingCost ?? 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="w-full flex items-center justify-between my-6">
        <h3 className="text-lg font-bold">Total</h3>
        <span className="text-lg font-bold">
          ${(totalCost ?? 0).toFixed(2)}
        </span>
      </div>

      <div className="w-full my-[32px]">
        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={agreeToTerms}
            onChange={e => onAgreeToTermsChange(e.target.checked)}
          />
          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-[4px] border transition',
              agreeToTerms
                ? 'border-accent bg-accent'
                : 'border-zinc-400 bg-white',
              agreeToTermsError && !agreeToTerms && 'border-red-500'
            )}
          >
            <CheckIcon
              className={cn(
                'size-8 transition',
                agreeToTerms ? 'opacity-100 text-white' : 'opacity-0'
              )}
            />
          </div>
          <span className="text-[14px] text-text [font-family:var(--font-sans)]">
            I agree to the{' '}
            <Link
              to="/terms"
              className="text-accent underline underline-offset-4"
            >
              Terms and Conditions
            </Link>
          </span>
        </label>

        {agreeToTermsError && !agreeToTerms && (
          <p className="text-red-500 text-xs">{agreeToTermsError}</p>
        )}
      </div>

      <Button
        variant="active"
        className="w-full mt-6"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </Button>

      <Button variant="click" className="w-full mt-4" asChild>
        <Link to="/catalog">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default OrderSummary;
