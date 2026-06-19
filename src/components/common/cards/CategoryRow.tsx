import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/category';
import DialogComponent from '@components/common/dialog/DialogComponent';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {
  category: Category;
  onSubmit: () => void;
  categoryMaxLength: number;
  errors?: string | null;
};

const CategoryRow = ({
  category,
  errors,
  onSubmit,
  categoryMaxLength,
}: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3.5">
      <span className="min-w-0 flex-1 truncate font-medium">
        {category.name}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsEditOpen(true)}
        aria-label={`Edit ${category.name}`}
      >
        <Pencil className="size-16" aria-hidden="true" />
        <span className="hidden sm:inline">Edit</span>
      </Button>

      <DialogComponent
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        headerTitle="Edit category"
        headerDescription="Update the category name."
        cancelText="Cancel"
        submitText="Save changes"
        onSubmit={onSubmit}
        thirdActionText="Delete"
      >
        <form
          id="category-form"
          onSubmit={onSubmit}
          noValidate
          className="space-y-2"
        >
          <Label htmlFor="category-name">Name</Label>
          <Input
            id="category-name"
            autoFocus
            maxLength={categoryMaxLength}
            defaultValue={category.name}
            placeholder="e.g. Fertilizers"
            aria-describedby={errors ? 'category-name-error' : undefined}
          />
          {errors ? (
            <p
              id="category-name-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Maximum {categoryMaxLength} characters.
            </p>
          )}
        </form>
      </DialogComponent>
    </li>
  );
};

export default CategoryRow;
