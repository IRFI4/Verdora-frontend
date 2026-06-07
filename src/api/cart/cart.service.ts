import instance from '@api/axiosInstance';
import type { ApiResponse } from '@/types/api';
import type {
  AddItemToCartPayload,
  RemoveItemFromCartPayload,
  UpdateCartItemQuantityPayload,
  CartState,
} from '@/types/cart';

export const cartService = {
  addItemToCart: async (data: AddItemToCartPayload) => {
    const response = await instance.post<ApiResponse<CartState>>(
      '/cart/items',
      data
    );
    return response.data.data;
  },

  removeItemFromCart: async (data: RemoveItemFromCartPayload) => {
    const response = await instance.delete(`/cart/items/${data.cartItemId}`);
    return response.data.data;
  },

  updateCartItemQuantity: async (data: UpdateCartItemQuantityPayload) => {
    const res = await instance.put<ApiResponse<CartState>>(
      `/cart/items/${data.cartItemId}`,
      { quantity: data.quantity }
    );

    return res.data.data;
  },

  getCart: async () => {
    const response = await instance.get<ApiResponse<CartState>>('/cart');
    return response.data.data;
  },

  clearCart: async () => {
    const response = await instance.delete<ApiResponse<CartState>>('/cart');
    return response.data.data;
  },
};
