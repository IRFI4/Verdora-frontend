import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@/types/user';
import {
  register,
  login,
  logout,
  fetchMe,
  forgotPassword,
  resetPassword,
} from '@/api/auth/auth.actions';

interface AuthState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  hydrating: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  hydrating: true,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // register
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Registration failed';
      })

      // login
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Login failed';
      })

      // logout
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload?.message ?? 'Logout failed';
      })

      // fetchMe runs on app startup to restore user from cookie
      .addCase(fetchMe.pending, state => {
        state.hydrating = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.hydrating = false;
        state.user = action.payload.data;
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, state => {
        state.hydrating = false;
        state.user = null;
        state.initialized = true;
      })

      // forgotPassword
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ?? 'Forgot password request failed';
      })

      // resetPassword
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ?? 'Reset password request failed';
      });
  },
});

export default authSlice.reducer;
