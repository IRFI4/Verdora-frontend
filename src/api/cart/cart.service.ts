import instance from '@api/axiosInstance';
import type { ApiResponse } from '@/types/api';
import type {
  AddItemToCartPayload,
  RemoveItemFromCartPayload,
  UpdateCartItemQuantityPayload,
  Cart,
} from '@/types/cart';

export const cartService = {
  addItemToCart: async (data: AddItemToCartPayload) => {
    const response = await instance.post<ApiResponse<Cart>>(
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
    const res = await instance.put<ApiResponse<Cart>>(
      `/cart/items/${data.cartItemId}`,
      { quantity: data.quantity }
    );

    return res.data.data;
  },

  getCart: async () => {
    const response = await instance.get<ApiResponse<Cart>>('/cart');
    return response.data.data;
  },

  clearCart: async () => {
    const response = await instance.delete<ApiResponse<Cart>>('/cart');
    return response.data.data;
  },
};
