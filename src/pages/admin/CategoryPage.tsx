import { useAppDispatch, useAppSelector } from '@api/hooks';
import AdminSectionHeader from '@components/common/section/AdminSectionHeader';
import { Button } from '@components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import ErrorSection from '@components/common/section/ErrorSection';
import { getAllCategories } from '@api/category/category.actions';
import { EmptySection } from '@components/common/section/EmptySection';
import CategoryRow from '@components/common/cards/CategoryRow';
import DialogComponent from '@components/common/dialog/DialogComponent';
import TextField from '@components/common/forms/TextField';
import CategoryListSkeleton from '@components/common/cards/CategoryListSkeleton';

const AdminCategoriesPage = () => {
  const dispatch = useAppDispatch();
  const categoryMaxLength = 50;
  const { items, loading, errors } = useAppSelector(state => state.category);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = (e?: React.FormEvent) => {
    e?.preventDefault();
    // TODO
  };

  const handleUpdate = (e?: React.FormEvent) => {
    e?.preventDefault();
    // TODO
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-[#F5F5DC]">
      <div className="flex flex-1 flex-col w-full max-w-[1710px] mx-auto px-4">
        <AdminSectionHeader
          title="Categories"
          description="Manage how products are organized in your catalog."
        >
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="w-full sm:w-auto"
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
              className="rounded-lg border border-dashed border-border bg-card px-6 py-12"
              icon={
                <div className="flex items-center justify-center rounded-full bg-primary/10">
                  <FolderOpen className="size-16" aria-hidden="true" />
                </div>
              }
              action={
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="size-16" aria-hidden="true" />
                  Create category
                </Button>
              }
            />
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
              {items.map(category => (
                <CategoryRow
                  key={category.categoryId}
                  category={category}
                  onSubmit={handleUpdate}
                  errors={errors.update}
                  categoryMaxLength={categoryMaxLength}
                />
              ))}
            </ul>
          )}
        </div>

        <DialogComponent
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          headerTitle="Create category"
          headerDescription="Add a new category to organize your products."
          cancelText="Cancel"
          submitText="Create"
          onSubmit={handleCreate}
        >
          <form id="category-form" onSubmit={handleCreate} noValidate>
            <TextField
              type="text"
              label="Name"
              id="category"
              placeholder="e.g. Garden Shovels"
              value=""
              // onChange={() => void}
              error=""
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
          </form>
        </DialogComponent>
      </div>
    </main>
  );
};

export default AdminCategoriesPage;
