import { useAppDispatch, useAppSelector } from '@api/hooks';
import AdminSectionHeader from '@components/common/section/AdminSectionHeader';
import { Button } from '@components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ErrorSection from '@components/common/section/ErrorSection';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@api/category/category.actions';
import { clearErrors } from '@api/category/category.slice';
import { EmptySection } from '@components/common/section/EmptySection';
import CategoryRow from '@components/common/cards/CategoryRow';
import DialogComponent from '@components/common/dialog/DialogComponent';
import TextField from '@components/common/forms/TextField';
import CategoryListSkeleton from '@components/common/cards/CategoryListSkeleton';
import {
  useAdminCategoryForm,
  type AdminCategotyFormData,
} from '@hooks/useAdminCategoriesForm';
import { rateLimit } from '@/utils/rateLimit';
import type { Category } from '@/types/category';

const AdminCategoriesPage = () => {
  const dispatch = useAppDispatch();
  const categoryMaxLength = 50;
  const { items, loading, errors } = useAppSelector(state => state.category);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const {
    handleSubmit: handleCreateSubmit,
    formState: { errors: createFormErrors, isValid: isCreateValid },
    watch: watchCreate,
    setValue: setCreateValue,
    reset: resetCreate,
  } = useAdminCategoryForm();

  const canSubmit = useMemo(() => rateLimit(2000), []);

  const handleCreate = async (data: AdminCategotyFormData) => {
    if (!canSubmit()) return;
    await dispatch(createCategory({ name: data.category })).unwrap();
    setIsCreateOpen(false);
    resetCreate();
  };

  const handleUpdate = async (categoryId: number, name: string) => {
    if (!canSubmit()) return;
    await dispatch(
      updateCategory({
        categoryId,
        name,
      })
    ).unwrap();
    setEditingCategory(null);
  };

  const handleDelete = async (categoryId: number) => {
    await dispatch(deleteCategory({ categoryId })).unwrap();
    setEditingCategory(null);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-background text-text transition-colors duration-300">
      <div className="flex flex-1 flex-col w-full max-w-[1710px] mx-auto px-6 py-8">
        <AdminSectionHeader
          title={
            <div className="flex items-center gap-3">
              <span className="font-heading font-semibold text-text-h">
                Categories
              </span>
              {items && items.length > 0 && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-all duration-300">
                  {items.length} total
                </span>
              )}
            </div>
          }
          description="Manage how products are organized in your catalog."
        >
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="w-full sm:w-auto cursor-pointer"
          >
            <Plus className="size-16" aria-hidden="true" />
            Create category
          </Button>
        </AdminSectionHeader>

        <div className="mt-8">
          {loading.getAll ? (
            <CategoryListSkeleton />
          ) : errors.getAll ? (
            <ErrorSection
              title={'Something went wrong'}
              message={errors.getAll}
              onRetry={() => dispatch(getAllCategories())}
            />
          ) : !items || items.length === 0 ? (
            <EmptySection
              title="No categories yet"
              description="Create your first category to start organizing products."
              className="rounded-xl border border-dashed border-border bg-card px-6 py-12"
              icon={
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-4">
                  <FolderOpen
                    className="size-16 text-primary"
                    aria-hidden="true"
                  />
                </div>
              }
              action={
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  className="cursor-pointer"
                >
                  <Plus className="size-16" aria-hidden="true" />
                  Create category
                </Button>
              }
            />
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(category => {
                const isEditingThis =
                  editingCategory?.categoryId === category.categoryId;
                return (
                  <CategoryRow
                    key={category.categoryId}
                    category={category}
                    onUpdate={async (id, name) => {
                      setEditingCategory(category);
                      await handleUpdate(id, name);
                    }}
                    onDelete={async id => {
                      setEditingCategory(category);
                      await handleDelete(id);
                    }}
                    loadingUpdate={isEditingThis ? loading.update : false}
                    loadingDelete={isEditingThis ? loading.delete : false}
                    errorUpdate={isEditingThis ? errors.update : null}
                    errorDelete={isEditingThis ? errors.delete : null}
                    onClearErrors={() => {
                      dispatch(clearErrors());
                    }}
                    categoryMaxLength={categoryMaxLength}
                  />
                );
              })}
            </ul>
          )}
        </div>

        <DialogComponent
          open={isCreateOpen}
          onOpenChange={open => {
            setIsCreateOpen(open);
            if (!open) {
              resetCreate();
              dispatch(clearErrors());
            }
          }}
          headerTitle="Create category"
          headerDescription="Add a new category to organize your products."
          cancelText="Cancel"
          submitText="Create"
          onSubmit={handleCreateSubmit(handleCreate)}
          submitDisabled={!isCreateValid || loading.create}
          autoCloseOnSubmit={false}
        >
          <div className="space-y-4">
            <TextField
              type="text"
              label="Name"
              id="category"
              placeholder="e.g. Garden Shovels"
              value={watchCreate('category')}
              onChange={value =>
                setCreateValue('category', value, { shouldValidate: true })
              }
              error={createFormErrors.category?.message}
            />
            {errors?.create ? (
              <p
                id="category-name-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.create}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Maximum {categoryMaxLength} characters.
              </p>
            )}
          </div>
        </DialogComponent>
      </div>
    </main>
  );
};

export default AdminCategoriesPage;
