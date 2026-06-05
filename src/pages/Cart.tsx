import LayoutPage from '@components/layout/LayoutPage';
import ArrowIcon from '@assets/icons/black-arrow.svg?react';
import { Button } from '@components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '@assets/icons/cart.svg?react';
import CartItem from '@components/common/cards/CartItem';
import OrderSummary from '@components/common/cards/OrderSummary';
import { useEffect, useMemo, useState } from 'react';
import { useProceedToCheckout } from '@hooks/useProceedToCheckout';
import { rateLimit } from '@/utils/rateLimit';

type CartItemData = {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  discountPrice?: number;
  quantity: number;
};

const Cart = () => {
  // REMOVE MOCK DATA
  const SHIPPING_COST = 5.99;
  const [items, setItems] = useState<CartItemData[]>([
    {
      id: 1,
      productName: 'Product Name',
      productImage: 'https://placehold.co/500x500',
      price: 19.99,
      discountPrice: 40.0,
      quantity: 1,
    },
  ]);

  const navigate = useNavigate();
  const canSubmit = useMemo(() => rateLimit(2000), []);

  const {
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    watch,
  } = useProceedToCheckout();

  const agreeToTerms = watch('agreeToTerms');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalItemsPrice = items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  );
  const totalCost = totalItemsPrice + SHIPPING_COST;

  useEffect(() => {
    setValue('totalItems', totalItems, { shouldValidate: true });
    setValue('totalItemsPrice', totalItemsPrice, { shouldValidate: true });
    setValue('shippingCost', SHIPPING_COST, { shouldValidate: true });
    setValue('totalCost', totalCost, { shouldValidate: true });
  }, [totalItems, totalItemsPrice, totalCost, setValue]);

  const handleIncrease = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleAgreeToTerms = (value: boolean) => {
    setValue('agreeToTerms', value, { shouldValidate: true });
  };

  const handleProceedToCheckout = handleSubmit(() => {
    if (!canSubmit()) return;
    navigate('/checkout');
  });

  return (
    <LayoutPage>
      <div className="flex items-center gap-8 mb-10">
        <Button
          variant="click"
          className="h-auto w-auto"
          onClick={() => navigate(-1)}
        >
          <ArrowIcon className="size-18" />
        </Button>
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <span className="text-lg text-gray-500">({items.length} items)</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
          <CartIcon className="size-64" />
          <h3 className="font-semibold text-2xl">Cart is empty</h3>
          <p className="text-gray-500 text-center max-w-md text-pretty">
            You haven't added any products yet. Browse our collection and find
            something you love.
          </p>
          <Button variant="active" asChild>
            <Link to="/catalog">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex flex-col gap-4 flex-1 w-full">
            {items.map(item => (
              <CartItem
                key={item.id}
                productName={item.productName}
                productImage={item.productImage}
                price={item.price}
                discountPrice={item.discountPrice}
                quantity={item.quantity}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
              />
            ))}
          </div>

          <OrderSummary
            totalItems={totalItems}
            totalItemsPrice={totalItemsPrice}
            shippingCost={SHIPPING_COST}
            totalCost={totalCost}
            agreeToTerms={agreeToTerms}
            agreeToTermsError={formErrors.agreeToTerms?.message}
            onAgreeToTermsChange={handleAgreeToTerms}
            handleProceedToCheckout={handleProceedToCheckout}
          />
        </div>
      )}
    </LayoutPage>
  );
};

export default Cart;
