import { Provider } from 'react-redux';
import { store } from '@api/store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@/index.css';
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import Home from '@pages/Home';
import ForgotPassword from '@pages/auth/ForgotPassword';
import ResetPassword from '@pages/auth/ResetPassword';
import Cart from '@pages/Cart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminCategoriesPage from '@pages/admin/CategoryPage';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin">
            <Route path="categories" element={<AdminCategoriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
