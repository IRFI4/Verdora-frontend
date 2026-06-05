import { Button } from '@components/ui/button';

type Props = {
  productName: string;
  productImage: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartItem = ({
  productName,
  productImage,
  price,
  discountPrice,
  quantity,
  onIncrease,
  onDecrease,
}: Props) => {
  const currentPrice = discountPrice !== undefined ? discountPrice : price;
  const totalPrice = currentPrice * quantity;

  return (
    <div className="flex items-center justify-between gap-6 p-4 border rounded-2xl w-full bg-white min-h-[112px]">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-[80px] h-[80px] shrink-0 overflow-hidden rounded-xl p-2">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h3 className="font-medium text-lg text-[#2D2D2D] truncate">
            {productName}
          </h3>
          {discountPrice !== undefined && (
            <span className="text-sm font-medium text-[#E57373] mt-0.5">
              {Math.round(((price - discountPrice) / price) * 100)}% off
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
    </div>
  );
};

export default CartItem;
