import { Button } from '@components/ui/button';
import { Trash2 } from 'lucide-react';

type Props = {
  productName: string;
  productImage: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem = ({
  productName,
  productImage,
  price,
  discountPrice,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  const currentPrice = discountPrice !== undefined ? discountPrice : price;
  const totalPrice = currentPrice * quantity;
  const discountPercent =
    discountPrice !== undefined && price > 0
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  return (
    <div className="flex items-center justify-between gap-6 p-4 border rounded-2xl w-full bg-white min-h-[112px]">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-[80px] h-[80px] shrink-0 overflow-hidden rounded-xl p-2">
          {(productImage ?? '') ? (
            <img
              src={productImage}
              alt={productName ?? 'Unknown product'}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg" />
          )}
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h3 className="font-medium text-lg text-[#2D2D2D] truncate">
            {productName ?? 'Unknown product'}
          </h3>
          {discountPrice !== undefined && (
            <span className="text-sm font-medium text-[#E57373] mt-0.5">
              {discountPercent}% off
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center min-w-[100px]">
        <p className="font-bold text-lg text-[#1A1A1A]">
          ${currentPrice.toFixed(2)}
        </p>

        {discountPrice !== undefined && (
          <p className="text-sm text-gray-400 line-through mt-0.5">
            ${price.toFixed(2)}
          </p>
        )}
      </div>

      <div className="flex gap-4 items-center rounded-full border border-gray-200 px-3 py-1.5 bg-white min-w-[80px] justify-between">
        <Button
          variant="click"
          size="icon"
          onClick={onDecrease}
          className="h-6 w-6 rounded-full text-gray-400 hover:text-gray-600 m-2 text-xl"
          disabled={quantity <= 1}
        >
          -
        </Button>

        <span className="text-center font-medium text-base text-[#1A1A1A]">
          {quantity}
        </span>

        <Button
          variant="click"
          size="icon"
          onClick={onIncrease}
          className="h-6 w-6 rounded-full text-gray-400 hover:text-gray-600 m-2 text-xl"
        >
          +
        </Button>
      </div>

      <div className="text-right min-w-[100px] pr-2">
        <p className="font-bold text-lg text-[#1A1A1A]">
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      <Button
        variant="click"
        size="icon"
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors h-9 w-9 rounded-full flex items-center justify-center cursor-pointer shrink-0"
        aria-label={`Remove ${productName} from cart`}
      >
        <Trash2 className="size-18" />
      </Button>
    </div>
  );
};

export default CartItem;
