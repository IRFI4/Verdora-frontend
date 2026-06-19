import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import { categoryService } from '@api/category/category.service';
import type {
  Category,
  CreateCategoryPayload,
  DeleteCategoryPayload,
  GetCategoryByIdPayload,
  UpdateCategoryPayload,
} from '@/types/category';

export const createCategory = createAsyncThunk<
  Category,
  CreateCategoryPayload,
  { rejectValue: ApiErrorResponse }
>('category/create', async (data, { rejectWithValue }) => {
  try {
    return await categoryService.createCategory(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const updateCategory = createAsyncThunk<
  Category,
  UpdateCategoryPayload,
  { rejectValue: ApiErrorResponse }
>('category/update', async (data, { rejectWithValue }) => {
  try {
    return await categoryService.updateCategoty(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const deleteCategory = createAsyncThunk<
  void,
  DeleteCategoryPayload,
  { rejectValue: ApiErrorResponse }
>('category/delete', async (data, { rejectWithValue }) => {
  try {
    return await categoryService.deleteCategoty(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const getCategoryById = createAsyncThunk<
  Category,
  GetCategoryByIdPayload,
  { rejectValue: ApiErrorResponse }
>('category/getById', async (data, { rejectWithValue }) => {
  try {
    return await categoryService.getCategotyById(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
    throw error;
  }
});

export const getAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ApiErrorResponse }
>('category/getAll', async (_, { rejectWithValue }) => {
  try {
    return await categoryService.getAllCategories();
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
