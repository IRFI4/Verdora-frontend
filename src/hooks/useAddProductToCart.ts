import { useCallback } from 'react';
import { useAddItemToCart } from '@api/cart/cart.hooks';
import type { Product } from '@/types/product';

type AddItemMutate = ReturnType<typeof useAddItemToCart>['mutate'];
type AddItemMutateOptions = Parameters<AddItemMutate>[1];

export const useAddProductToCart = (products?: Product[]) => {
  const { mutate, isPending: isAddingToCart } = useAddItemToCart();

  const addToCart = useCallback(
    (productId: number, quantity = 1, options?: AddItemMutateOptions) => {
      const product = products?.find(p => p.productId === productId);
      mutate({ productId, quantity, product }, options);
    },
    [mutate, products]
  );

  return { addToCart, isAddingToCart };
};

export default useAddProductToCart;
