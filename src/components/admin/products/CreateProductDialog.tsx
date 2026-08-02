import React, { useEffect } from 'react';
import DialogComponent from '@components/common/dialog/DialogComponent';
import TextField from '@components/common/forms/TextField';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  adminProductSchema,
  type AdminProductFormData,
} from '@/schemas/product.schema';
import type { Category } from '@/types/category';

type CreateProductDialogProps = {
  open: boolean;
  categoriesData?: Category[];
  onSubmit: (data: AdminProductFormData) => void;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  errorMessage?: string;
};

export const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  categoriesData,
  onSubmit,
  onOpenChange,
  isPending,
  errorMessage,
}) => {
  const form = useForm<AdminProductFormData>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      discountPrice: undefined,
      categoryId: undefined,
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (!categoriesData?.length) return;

    form.setValue('categoryId', categoriesData[0].categoryId, {
      shouldValidate: true,
    });
  }, [categoriesData, form]);

  const resetForm = () =>
    form.reset({
      name: '',
      description: '',
      price: '',
      discountPrice: undefined,
      categoryId: categoriesData?.[0]?.categoryId,
      imageUrl: '',
    });

  const handleClose = (isOpen: boolean) => {
    onOpenChange(isOpen);

    if (!isOpen) {
      resetForm();
    }
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <DialogComponent
      open={open}
      onOpenChange={handleClose}
      headerTitle="Create New Product"
      headerDescription="Add a new item to your store product catalog."
      cancelText="Cancel"
      submitText="Create Product"
      onSubmit={form.handleSubmit(data => onSubmit(data))}
      submitDisabled={!form.formState.isValid || isPending}
      autoCloseOnSubmit={false}
      loading={isPending}
    >
      <form className="space-y-4 py-1">
        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium flex items-center gap-2"
          >
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <TextField
          type="text"
          label="Product Name"
          id="create-name"
          placeholder="e.g. Premium Organic Fertilizer"
          value={form.watch('name')}
          onChange={val => form.setValue('name', val, { shouldValidate: true })}
          error={form.formState.errors.name?.message}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Category
          </label>
          <select
            value={form.watch('categoryId')}
            onChange={e =>
              form.setValue('categoryId', Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Select category
            </option>
            {categoriesData?.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TextField
            type="number"
            label="Price ($)"
            id="create-price"
            placeholder="29.99"
            value={form.watch('price') || ''}
            onChange={val =>
              form.setValue('price', val, { shouldValidate: true })
            }
            error={form.formState.errors.price?.message}
          />

          <TextField
            type="number"
            label="Discount Price ($)"
            id="create-discount"
            placeholder="19.99 (Optional)"
            value={form.watch('discountPrice') || ''}
            onChange={val =>
              form.setValue('discountPrice', val, { shouldValidate: true })
            }
            error={form.formState.errors.discountPrice?.message}
          />
        </div>

        <TextField
          type="text"
          label="Image URL"
          id="create-image"
          placeholder="https://example.com/image.jpg"
          value={form.watch('imageUrl')}
          onChange={val =>
            form.setValue('imageUrl', val, { shouldValidate: true })
          }
          error={form.formState.errors.imageUrl?.message}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Detailed description of the product..."
            value={form.watch('description')}
            onChange={e =>
              form.setValue('description', e.target.value, {
                shouldValidate: true,
              })
            }
            className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {form.formState.errors.description && (
            <p className="text-xs text-destructive">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
      </form>
    </DialogComponent>
  );
};

export default CreateProductDialog;
