import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@components/ui/button';
import type { Category } from '@/types/category';
import DialogComponent from '@components/common/dialog/DialogComponent';
import TextField from '@components/common/forms/TextField';
import { useAdminCategoryForm } from '@hooks/useAdminCategoriesForm';
import {
  useUpdateCategory,
  useDeleteCategory,
} from '@api/category/category.hooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';

type Props = {
  category: Category;
  categoryMaxLength: number;
};

const CategoryRow = ({ category, categoryMaxLength }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const {
    handleSubmit: handleEditSubmit,
    formState: { errors: editFormErrors, isValid: isEditValid },
    watch: watchEdit,
    setValue: setEditValue,
    reset: resetEdit,
  } = useAdminCategoryForm();

  const handleOpenEdit = () => {
    updateMutation.reset();
    setEditValue('category', category.name, { shouldValidate: true });
    setIsEditOpen(true);
  };

  const errorUpdate = updateMutation.error?.response?.data?.message;
  const errorDelete = deleteMutation.error?.response?.data?.message;

  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3.5">
      <span className="min-w-0 flex-1 truncate font-medium text-text-h">
        {category.name}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenEdit}
        aria-label={`Edit ${category.name}`}
      >
        <Pencil className="size-16" aria-hidden="true" />
        <span className="hidden sm:inline">Edit</span>
      </Button>

      <DialogComponent
        open={isEditOpen}
        onOpenChange={open => {
          setIsEditOpen(open);
          if (!open) {
            resetEdit();
            updateMutation.reset();
          }
        }}
        headerTitle="Edit category"
        headerDescription="Update the category name."
        cancelText="Cancel"
        submitText="Save changes"
        onSubmit={handleEditSubmit(data =>
          updateMutation.mutate(
            { categoryId: category.categoryId, name: data.category },
            { onSuccess: () => setIsEditOpen(false) }
          )
        )}
        submitDisabled={!isEditValid || updateMutation.isPending}
        autoCloseOnSubmit={false}
        loading={updateMutation.isPending}
        thirdActionText="Delete"
        onThirdAction={() => {
          deleteMutation.reset();
          setIsDeleteDialogOpen(true);
        }}
        thirdActionDisabled={
          updateMutation.isPending || deleteMutation.isPending
        }
      >
        <div className="space-y-4">
          <TextField
            type="text"
            label="Name"
            id={`edit-category-${category.categoryId}`}
            placeholder="e.g. Garden Shovels"
            value={watchEdit('category')}
            onChange={value =>
              setEditValue('category', value, { shouldValidate: true })
            }
            error={editFormErrors.category?.message}
          />
          {errorUpdate ? (
            <p
              id={`edit-category-name-error-${category.categoryId}`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errorUpdate}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Maximum {categoryMaxLength} characters.
            </p>
          )}
        </div>
      </DialogComponent>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={open => {
          setIsDeleteDialogOpen(open);
          if (!open) {
            deleteMutation.reset();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category{' '}
              <span className="font-semibold text-foreground">
                "{category.name}"
              </span>{' '}
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {errorDelete && (
            <p className="text-sm text-destructive font-medium" role="alert">
              {errorDelete}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={e => {
                e.preventDefault();
                deleteMutation.mutate(
                  { categoryId: category.categoryId },
                  {
                    onSuccess: () => {
                      setIsDeleteDialogOpen(false);
                      setIsEditOpen(false);
                    },
                  }
                );
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
};

export default CategoryRow;
