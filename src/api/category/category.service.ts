import instance from '@api/axiosInstance';
import type { ApiResponse } from '@/types/api';
import type { PaginatedData } from '@/types/pagination';
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  DeleteCategoryPayload,
  GetCategoryByIdPayload,
} from '@/types/category';

type RawCategory = {
  categoryId: number | string;
  name: string;
};

const normalizeCategory = (cat: RawCategory): Category => ({
  ...cat,
  categoryId: Number(cat.categoryId),
});

export const categoryService = {
  createCategory: async (data: CreateCategoryPayload): Promise<Category> => {
    const response = await instance.post<ApiResponse<RawCategory>>(
      '/categories',
      data
    );
    return normalizeCategory(response.data.data);
  },

  updateCategoty: async (data: UpdateCategoryPayload): Promise<Category> => {
    const response = await instance.put<ApiResponse<RawCategory>>(
      `/categories/${data.categoryId}`,
      data
    );
    return normalizeCategory(response.data.data);
  },

  deleteCategoty: async (data: DeleteCategoryPayload) => {
    const response = await instance.delete<ApiResponse<void>>(
      `/categories/${data.categoryId}`
    );
    return response.data.data;
  },

  getCategotyById: async (data: GetCategoryByIdPayload): Promise<Category> => {
    const response = await instance.get<ApiResponse<RawCategory>>(
      `/categories/${data.categoryId}`
    );
    return normalizeCategory(response.data.data);
  },

  getAllCategories: async (params?: {
    page?: number;
    size?: number;
  }): Promise<Category[]> => {
    const response = await instance.get<
      ApiResponse<PaginatedData<RawCategory> | RawCategory[]>
    >(`/categories`, {
      params: { size: 100, ...params },
    });

    const data = response.data.data;
    let list: RawCategory[] = [];

    if (Array.isArray(data)) {
      list = data;
    } else if (
      data &&
      Array.isArray((data as PaginatedData<RawCategory>).content)
    ) {
      list = (data as PaginatedData<RawCategory>).content;
    }

    return list.map(normalizeCategory);
  },
};
