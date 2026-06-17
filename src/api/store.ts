import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@api/auth/auth.slice';
import cartReducer from '@api/cart/cart.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
