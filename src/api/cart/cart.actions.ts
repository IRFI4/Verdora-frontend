import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import { cartService } from '@api/cart/cart.service';
import type {
  AddItemToCartPayload,
  RemoveItemFromCartPayload,
  UpdateCartItemQuantityPayload,
  Cart,
} from '@/types/cart';

export const addItemToCart = createAsyncThunk<
  Cart,
  AddItemToCartPayload,
  { rejectValue: ApiErrorResponse }
>('cart/add-item', async (data, { rejectWithValue }) => {
  try {
    return await cartService.addItemToCart(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const removeItemFromCart = createAsyncThunk<
  Cart,
  RemoveItemFromCartPayload,
  { rejectValue: ApiErrorResponse }
>('cart/remove-item', async (data, { rejectWithValue }) => {
  try {
    return await cartService.removeItemFromCart(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const updateCartItemQuantity = createAsyncThunk<
  Cart,
  UpdateCartItemQuantityPayload,
  { rejectValue: ApiErrorResponse }
>('cart/update-quantity', async (data, { rejectWithValue }) => {
  try {
    return await cartService.updateCartItemQuantity(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const getCart = createAsyncThunk<
  Cart,
  void,
  { rejectValue: ApiErrorResponse }
>('cart/get-cart', async (_, { rejectWithValue }) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const clearCart = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiErrorResponse }
>('cart/clear-cart', async (_, { rejectWithValue }) => {
  try {
    await cartService.clearCart();
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});
