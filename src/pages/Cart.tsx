import LayoutPage from '@components/layout/LayoutPage';
import { Button } from '@components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '@assets/icons/cart.svg?react';
import CartItem from '@components/common/cards/CartItem';
import OrderSummary from '@components/common/cards/OrderSummary';
import { useEffect, useMemo } from 'react';
import { useProceedToCheckout } from '@hooks/useProceedToCheckout';
import { rateLimit } from '@/utils/rateLimit';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import {
  getCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from '@api/cart/cart.actions';
import { updateQuantityLocally, setItemsLocally } from '@api/cart/cart.slice';
import CartItemSkeleton from '@components/common/cards/CartItemSkeleton';
import CartHeader from '@components/layout/CartHeader';

const Cart = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const canSubmit = useMemo(() => rateLimit(2000), []);
  const { loading, items, totalPrice, shippingCost, loaded, errors } =
    useAppSelector(state => state.cart);
  const itemsCount = items.length;

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

    const previousQuantity = item.quantity;
    const newQuantity = item.quantity + 1;

    dispatch(
      updateQuantityLocally({
        cartItemId: id,
        quantity: newQuantity,
      })
    );

    dispatch(
      updateCartItemQuantity({
        cartItemId: id,
        quantity: newQuantity,
      })
    )
      .unwrap()
      .catch(() => {
        dispatch(
          updateQuantityLocally({
            cartItemId: id,
            quantity: previousQuantity,
          })
        );
      });
  };

  const handleDecrease = (id: number) => {
    const item = items.find(item => item.cartItemId === id);

    if (!item || item.quantity <= 1) return;

    const previousQuantity = item.quantity;
    const newQuantity = item.quantity - 1;

    dispatch(
      updateQuantityLocally({
        cartItemId: id,
        quantity: newQuantity,
      })
    );

    dispatch(
      updateCartItemQuantity({
        cartItemId: id,
        quantity: newQuantity,
      })
    )
      .unwrap()
      .catch(() => {
        dispatch(
          updateQuantityLocally({
            cartItemId: id,
            quantity: previousQuantity,
          })
        );
      });
  };

  const handleRemove = (id: number) => {
    const previousItems = [...items];
    const newItems = items.filter(item => item.cartItemId !== id);

    dispatch(setItemsLocally(newItems));

    dispatch(removeItemFromCart({ cartItemId: id }))
      .unwrap()
      .catch(() => {
        dispatch(setItemsLocally(previousItems));
      });
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
        <CartHeader itemsCount={itemsCount} />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </LayoutPage>
    );
  }

  if (itemsCount === 0) {
    return (
      <LayoutPage>
        <CartHeader itemsCount={itemsCount} />
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
      <CartHeader itemsCount={itemsCount} />
      {(errors.removeItem || errors.updateQuantity) && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm [font-family:var(--font-sans)]">
          {errors.removeItem || errors.updateQuantity}
        </div>
      )}
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
                onRemove={() => handleRemove(item.cartItemId)}
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
