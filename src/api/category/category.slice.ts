import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '@/types/category';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
} from '@api/category/category.actions';

interface CategoryState {
  items: Category[];
  current: Category | null;
  loading: {
    create: boolean;
    update: boolean;
    delete: boolean;
    getById: boolean;
    getAll: boolean;
  };
  errors: {
    create: string | null;
    update: string | null;
    delete: string | null;
    getById: string | null;
    getAll: string | null;
  };
}

const initialState: CategoryState = {
  items: [],
  current: null,
  loading: {
    create: false,
    update: false,
    delete: false,
    getById: false,
    getAll: false,
  },
  errors: {
    create: null,
    update: null,
    delete: null,
    getById: null,
    getAll: null,
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // create
      .addCase(createCategory.pending, state => {
        state.loading.create = true;
        state.errors.create = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading.create = false;
        state.current = action.payload;
        state.errors.create = null;
        state.items.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading.create = false;
        state.errors.create = action.payload?.message ?? 'Create failed';
      })

      // update
      .addCase(updateCategory.pending, (state, action) => {
        state.loading.update = true;
        state.errors.update = null;

        const updated = action.meta.arg;

        state.items = state.items.map(item =>
          item.categoryId === updated.categoryId
            ? { ...item, ...updated }
            : item
        );

        if (state.current?.categoryId === updated.categoryId) {
          state.current = { ...state.current, ...updated };
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading.update = false;
        state.errors.update = null;

        const updated = action.payload;

        state.items = state.items.map(item =>
          item.categoryId === updated.categoryId ? updated : item
        );

        if (state.current?.categoryId === updated.categoryId) {
          state.current = updated;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading.update = false;
        state.errors.update = action.payload?.message ?? 'Update failed';
      })

      // delete
      .addCase(deleteCategory.pending, (state, action) => {
        state.loading.delete = true;
        state.errors.delete = null;

        const id = action.meta.arg.categoryId;

        state.items = state.items.filter(item => item.categoryId !== id);

        if (state.current?.categoryId === id) {
          state.current = null;
        }
      })
      .addCase(deleteCategory.fulfilled, state => {
        state.loading.delete = false;
        state.errors.delete = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading.delete = false;
        state.errors.delete = action.payload?.message ?? 'Delete failed';
      })

      // getById
      .addCase(getCategoryById.pending, state => {
        state.loading.getById = true;
        state.errors.getById = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading.getById = false;
        state.current = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading.getById = false;
        state.errors.getById =
          action.payload?.message ?? 'Failed to fetch category';
      })

      // getAll
      .addCase(getAllCategories.pending, state => {
        state.loading.getAll = true;
        state.errors.getAll = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading.getAll = false;
        state.items = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading.getAll = false;
        state.errors.getAll =
          action.payload?.message ?? 'Failed to fetch categories';
      });
  },
});

export default categorySlice.reducer;
