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
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';

type EditProductDialogProps = {
  product: Product | null;
  categoriesData?: Category[];
  onSubmit: (data: AdminProductFormData) => void;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  errorMessage?: string;
};

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product,
  categoriesData,
  onSubmit,
  onOpenChange,
  isPending,
  errorMessage,
}) => {
  const form = useForm<AdminProductFormData>({
    resolver: zodResolver(adminProductSchema),
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price:
          product.price !== undefined && product.price !== null
            ? String(product.price)
            : '',
        discountPrice:
          product.discountPrice !== undefined && product.discountPrice !== null
            ? String(product.discountPrice)
            : undefined,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl,
      });
    }
  }, [product, form]);

  const handleClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <DialogComponent
      open={!!product}
      onOpenChange={handleClose}
      headerTitle="Edit Product"
      headerDescription={`Update product details for #${product?.productId}`}
      cancelText="Cancel"
      submitText="Save Changes"
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
          id="edit-name"
          placeholder="Product name"
          value={form.watch('name') || ''}
          onChange={val => form.setValue('name', val, { shouldValidate: true })}
          error={form.formState.errors.name?.message}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Category
          </label>
          <select
            value={form.watch('categoryId') || 1}
            onChange={e =>
              form.setValue('categoryId', Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
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
            id="edit-price"
            placeholder="0.00"
            value={form.watch('price') || ''}
            onChange={val =>
              form.setValue('price', val, { shouldValidate: true })
            }
            error={form.formState.errors.price?.message}
          />

          <TextField
            type="number"
            label="Discount Price ($)"
            id="edit-discount"
            placeholder="Optional"
            value={form.watch('discountPrice') || ''}
            onChange={val =>
              form.setValue('discountPrice', val === '' ? undefined : val, {
                shouldValidate: true,
              })
            }
            error={form.formState.errors.discountPrice?.message}
          />
        </div>

        <TextField
          type="text"
          label="Image URL"
          id="edit-image"
          placeholder="Image URL"
          value={form.watch('imageUrl') || ''}
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
            placeholder="Description"
            value={form.watch('description') || ''}
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

export default EditProductDialog;
