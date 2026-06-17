import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@assets/icons/black-arrow.svg?react';

const CartHeader = ({ itemsCount }: { itemsCount: number }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-8 mb-10">
      <Button
        variant="click"
        className="h-auto w-auto"
        onClick={() => navigate(-1)}
      >
        <ArrowIcon className="size-18" />
      </Button>
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      <span className="text-lg text-gray-500">({itemsCount} items)</span>
    </div>
  );
};

export default CartHeader;
