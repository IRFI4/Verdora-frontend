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
    .string()
    .min(1, 'Price is required')
    .refine(value => !Number.isNaN(Number(value)), {
      message: 'Price must be a number',
    }),
  discountPrice: z
    .string()
    .optional()
    .refine(value => !value || !Number.isNaN(Number(value)), {
      message: 'Discount price must be a number',
    }),
  categoryId: z
    .number({ message: 'Category is required' })
    .min(1, 'Category is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
});

export type AdminProductFormData = z.infer<typeof adminProductSchema>;
