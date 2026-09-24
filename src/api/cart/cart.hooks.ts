import { cartService } from '@api/cart/cart.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@api/hooks';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import type {
  AddItemToCartPayload,
  Cart,
  RemoveItemFromCartPayload,
  UpdateCartItemQuantityPayload,
} from '@/types/cart';
import type { Product } from '@/types/product';
import {
  getGuestCart,
  addGuestCartItem,
  updateGuestCartItemQuantity,
  removeGuestCartItem,
  clearGuestCart,
} from '@/utils/guestCart';

type CartAxiosError = AxiosError<ApiErrorResponse>;

export type AddItemToCartArgs = AddItemToCartPayload & {
  product?: Partial<Product>;
};

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector(state => state.auth);

  return useMutation<Cart, CartAxiosError, AddItemToCartArgs>({
    mutationFn: async data => {
      if (user) {
        return cartService.addItemToCart({
          productId: data.productId,
          quantity: data.quantity,
        });
      }
      return addGuestCartItem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector(state => state.auth);

  return useMutation<
    Cart,
    CartAxiosError,
    RemoveItemFromCartPayload,
    { previousCart?: Cart }
  >({
    mutationFn: async data => {
      if (user) {
        return cartService.removeItemFromCart(data);
      }
      return removeGuestCartItem(data.cartItemId);
    },

    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const cartKey = ['cart', user ? user.id : 'guest'];
      const previousCart = queryClient.getQueryData<Cart>(cartKey);

      queryClient.setQueryData<Cart>(cartKey, old => {
        if (!old) return old;

        const filteredItems = old.items.filter(
          item => item.cartItemId !== variables.cartItemId
        );
        const shippingCost = old.shippingCost ?? 0;
        const totalPrice =
          filteredItems.reduce((sum, item) => sum + item.subtotal, 0) +
          shippingCost;

        return {
          ...old,
          items: filteredItems,
          totalPrice,
        };
      });

      return { previousCart };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ['cart', user ? user.id : 'guest'],
          context.previousCart
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector(state => state.auth);

  return useMutation<
    Cart,
    CartAxiosError,
    UpdateCartItemQuantityPayload,
    { previousCart?: Cart }
  >({
    mutationFn: async data => {
      if (user) {
        return cartService.updateCartItemQuantity(data);
      }
      return updateGuestCartItemQuantity(data.cartItemId, data.quantity);
    },
    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const cartKey = ['cart', user ? user.id : 'guest'];
      const previousCart = queryClient.getQueryData<Cart>(cartKey);

      queryClient.setQueryData<Cart>(cartKey, old => {
        if (!old) {
          return old;
        }

        const updatedItems = old.items.map(item => {
          if (item.cartItemId !== variables.cartItemId) {
            return item;
          }
          const price = item.price ?? 0;
          const unitPrice =
            item.discountPrice !== undefined ? item.discountPrice : price;
          return {
            ...item,
            quantity: variables.quantity,
            subtotal: unitPrice * variables.quantity,
          };
        });

        const shippingCost = old.shippingCost ?? 0;
        const totalPrice =
          updatedItems.reduce((sum, item) => sum + item.subtotal, 0) +
          shippingCost;

        return {
          ...old,
          items: updatedItems,
          totalPrice,
        };
      });

      return { previousCart };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ['cart', user ? user.id : 'guest'],
          context.previousCart
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useGetCart = (options?: { enabled?: boolean }) => {
  const { user } = useAppSelector(state => state.auth);

  return useQuery<Cart, CartAxiosError>({
    queryKey: ['cart', user ? user.id : 'guest'],
    queryFn: async () => {
      if (user) {
        return cartService.getCart();
      }
      return getGuestCart();
    },
    retry: false,
    ...options,
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector(state => state.auth);

  return useMutation<Cart, CartAxiosError>({
    mutationFn: async () => {
      if (user) {
        return cartService.clearCart();
      }
      clearGuestCart();
      return { cartId: 0, items: [], totalPrice: 0, shippingCost: 0 };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
