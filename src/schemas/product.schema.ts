import { z } from 'zod';

export const adminProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(100, 'Max 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Max 1000 characters'),
  price: z
    .number({ message: 'Price must be a number' })
    .gt(0, 'Price must be greater than 0'),
  discountPrice: z
    .number({ message: 'Discount price must be a number' })
    .nonnegative('Discount price cannot be negative')
    .optional(),
  categoryId: z
    .number({ message: 'Category is required' })
    .min(1, 'Category is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
});

export type AdminProductFormData = z.infer<typeof adminProductSchema>;
