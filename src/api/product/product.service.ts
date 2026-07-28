import instance from '@api/axiosInstance';
import type { ApiResponse } from '@/types/api';
import type { PaginatedData } from '@/types/pagination';
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  GetProductsPayload,
} from '@/types/product';

export const productService = {
  getProducts: async (params?: GetProductsPayload) => {
    const response = await instance.get<ApiResponse<PaginatedData<Product>>>(
      '/products',
      { params }
    );
    return response.data.data;
  },

  getProductById: async (id: number) => {
    const response = await instance.get<ApiResponse<Product>>(
      `/products/${id}`
    );
    return response.data.data;
  },

  createProduct: async (data: CreateProductPayload) => {
    const response = await instance.post<ApiResponse<Product>>(
      '/products',
      data
    );
    return response.data.data;
  },

  updateProduct: async (id: number, data: UpdateProductPayload) => {
    const response = await instance.put<ApiResponse<Product>>(
      `/products/${id}`,
      data
    );
    return response.data.data;
  },

  deleteProduct: async (id: number) => {
    const response = await instance.delete<ApiResponse<Record<string, never>>>(
      `/products/${id}`
    );
    return response.data.data;
  },
};
