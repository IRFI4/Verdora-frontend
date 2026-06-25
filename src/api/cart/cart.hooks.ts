import { cartService } from '@api/cart/cart.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import type {
  AddItemToCartPayload,
  Cart,
  RemoveItemFromCartPayload,
  UpdateCartItemQuantityPayload,
} from '@/types/cart';

type CartAxiosError = AxiosError<ApiErrorResponse>;

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<Cart, CartAxiosError, AddItemToCartPayload>({
    mutationFn: data => cartService.addItemToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Cart,
    CartAxiosError,
    RemoveItemFromCartPayload,
    { previousCart?: Cart }
  >({
    mutationFn: data => cartService.removeItemFromCart(data),

    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<Cart>(['cart']);

      queryClient.setQueryData<Cart>(['cart'], old => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter(
            item => item.cartItemId !== variables.cartItemId
          ),
        };
      });

      return { previousCart };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Cart,
    CartAxiosError,
    UpdateCartItemQuantityPayload,
    { previousCart?: Cart }
  >({
    mutationFn: data => cartService.updateCartItemQuantity(data),
    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<Cart>(['cart']);

      queryClient.setQueryData<Cart>(['cart'], old => {
        if (!old) {
          return old;
        }

        const updatedItems = old.items.map(item =>
          item.cartItemId === variables.cartItemId
            ? { ...item, quantity: variables.quantity }
            : item
        );

        return {
          ...old,
          items: updatedItems,
        };
      });

      return { previousCart };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useGetCart = (options?: { enabled?: boolean }) => {
  return useQuery<Cart, CartAxiosError>({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    ...options,
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation<Cart, CartAxiosError>({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
