import LayoutPage from '@components/layout/LayoutPage';
import ArrowIcon from '@assets/icons/black-arrow.svg?react';
import { Button } from '@components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '@assets/icons/cart.svg?react';
import CartItem from '@components/common/cards/CartItem';
import OrderSummary from '@components/common/cards/OrderSummary';
import { useEffect, useMemo } from 'react';
import { useProceedToCheckout } from '@hooks/useProceedToCheckout';
import { rateLimit } from '@/utils/rateLimit';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { getCart, updateCartItemQuantity } from '@api/cart/cart.actions';
import CartItemSkeleton from '@components/common/cards/CartItemSkeleton';

const Cart = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const canSubmit = useMemo(() => rateLimit(2000), []);
  const { loading, items, totalPrice, shippingCost, loaded } = useAppSelector(
    state => state.cart
  );

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

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    setValue('totalItems', totalItems, { shouldValidate: true });
    setValue('totalItemsPrice', totalItemsPrice, { shouldValidate: true });
    setValue('shippingCost', shippingCost, { shouldValidate: true });
    setValue('totalCost', totalPrice, { shouldValidate: true });
  }, [totalItems, totalItemsPrice, totalPrice, shippingCost, setValue]);

  const handleIncrease = (id: number) => {
    const item = items.find(item => item.cartItemId === id);

    if (!item) return;

    dispatch(
      updateCartItemQuantity({
        cartItemId: id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (id: number) => {
    const item = items.find(item => item.cartItemId === id);

    if (!item || item.quantity <= 1) return;

    dispatch(
      updateCartItemQuantity({
        cartItemId: id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleAgreeToTerms = (value: boolean) => {
    setValue('agreeToTerms', value, { shouldValidate: true });
  };

  const handleProceedToCheckout = handleSubmit(() => {
    if (!canSubmit()) return;
    navigate('/checkout');
  });

  if (!loaded || loading.getCart) {
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
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </LayoutPage>
    );
  }

  if (items.length === 0) {
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
      </LayoutPage>
    );
  }

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

      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex flex-col gap-4 flex-1 w-full">
            {items.map(item => (
              <CartItem
                key={item.cartItemId}
                productName={item.productName}
                productImage={item.imageUrl}
                price={item.price}
                discountPrice={item.discountPrice}
                quantity={item.quantity}
                onIncrease={() => handleIncrease(item.cartItemId)}
                onDecrease={() => handleDecrease(item.cartItemId)}
              />
            ))}
          </div>
          <OrderSummary
            totalItems={totalItems}
            totalItemsPrice={totalItemsPrice}
            shippingCost={shippingCost}
            totalCost={totalPrice}
            agreeToTerms={agreeToTerms}
            agreeToTermsError={formErrors.agreeToTerms?.message}
            onAgreeToTermsChange={handleAgreeToTerms}
            handleProceedToCheckout={handleProceedToCheckout}
            loading={loading.getCart}
          />
        </div>
      </div>
    </LayoutPage>
  );
};

export default Cart;
