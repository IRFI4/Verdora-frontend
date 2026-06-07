import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCart,
  clearCart,
} from '@api/cart/cart.actions';
import { login, register, logout } from '@api/auth/auth.actions';
import type { CartItemType } from '@/types/cart';

interface CartState {
  items: CartItemType[];
  totalPrice: number;
  shippingCost: number;
  loaded: boolean;
  loading: {
    addItem: boolean;
    removeItem: boolean;
    updateQuantity: boolean;
    getCart: boolean;
    clearCart: boolean;
  };
  errors: {
    addItem: string | null;
    removeItem: string | null;
    updateQuantity: string | null;
    getCart: string | null;
    clearCart: string | null;
  };
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  shippingCost: 0,
  loaded: false,
  loading: {
    addItem: false,
    removeItem: false,
    updateQuantity: false,
    getCart: false,
    clearCart: false,
  },
  errors: {
    addItem: null,
    removeItem: null,
    updateQuantity: null,
    getCart: null,
    clearCart: null,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // addItemToCart
      .addCase(addItemToCart.pending, state => {
        state.loading.addItem = true;
        state.errors.addItem = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading.addItem = false;
        state.items = action.payload.items;
        state.errors.addItem = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading.addItem = false;
        state.errors.addItem =
          action.payload?.message ?? 'Failed to add item to cart';
      })

      // removeItemFromCart
      .addCase(removeItemFromCart.pending, state => {
        state.loading.removeItem = true;
        state.errors.removeItem = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading.removeItem = false;
        state.items = action.payload.items;
        state.errors.removeItem = null;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading.removeItem = false;
        state.errors.removeItem =
          action.payload?.message ?? 'Failed to remove item from cart';
      })

      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, state => {
        state.loading.updateQuantity = true;
        state.errors.updateQuantity = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading.updateQuantity = false;

        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.shippingCost = action.payload.shippingCost;

        state.errors.updateQuantity = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading.updateQuantity = false;
        state.errors.updateQuantity =
          action.payload?.message ?? 'Failed to update cart item quantity';
      })

      // getCart
      .addCase(getCart.pending, state => {
        state.loaded = false;
        state.loading.getCart = true;
        state.errors.getCart = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loaded = true;
        state.loading.getCart = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.shippingCost = action.payload.shippingCost;
        state.errors.getCart = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loaded = true;
        state.loading.getCart = false;
        state.errors.getCart =
          action.payload?.message ?? 'Failed to fetch cart';
      })

      // clearCart
      .addCase(clearCart.pending, state => {
        state.loading.clearCart = true;
        state.errors.clearCart = null;
      })
      .addCase(clearCart.fulfilled, state => {
        state.loading.clearCart = false;
        state.items = [];
        state.totalPrice = 0;
        state.shippingCost = 0;
        state.errors.clearCart = null;
      })

      // auth actions integration
      .addCase(logout.fulfilled, state => {
        state.items = [];
        state.totalPrice = 0;
        state.shippingCost = 0;
        state.loaded = false;
      })
      .addCase(logout.rejected, state => {
        state.items = [];
        state.totalPrice = 0;
        state.shippingCost = 0;
        state.loaded = false;
      })
      .addCase(login.fulfilled, state => {
        state.loaded = false;
      })
      .addCase(register.fulfilled, state => {
        state.loaded = false;
      });
  },
});

export default cartSlice.reducer;
