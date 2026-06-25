import { z } from 'zod';

export const proceedToCheckoutSchema = z.object({
  totalItems: z.number().min(1, 'At least one item must be in the cart'),
  totalItemsPrice: z.number().min(0, 'Total items price cannot be negative'),
  shippingCost: z.number().min(0, 'Shipping cost cannot be negative'),
  totalCost: z.number().min(0, 'Total cost cannot be negative'),
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
});
