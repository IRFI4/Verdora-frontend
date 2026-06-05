import { Separator } from '@components/ui/separator';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CheckIcon from '@assets/icons/checkbox.svg?react';

type Props = {
  totalItems: number;
  totalItemsPrice: number;
  shippingCost: number;
  totalCost: number;
  agreeToTerms: boolean;
  agreeToTermsError?: string;
  onAgreeToTermsChange: (value: boolean) => void;
  handleProceedToCheckout: () => void;
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
}: Props) => {
  return (
    <div className="bg-white p-[32px] flex flex-col items-center rounded-2xl w-full lg:max-w-sm gap-10">
      <div className="w-full flex flex-col mb-6">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="flex flex-col mt-6 gap-[16px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal ({totalItems} items)</span>
            <span>${totalItemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="w-full flex items-center justify-between my-6">
        <h3 className="text-lg font-bold">Total</h3>
        <span className="text-lg font-bold">${totalCost.toFixed(2)}</span>
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
          <span className="text-[14px] text-(--text) [font-family:var(--font-sans)]">
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
