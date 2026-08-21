import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proceedToCheckoutSchema } from '@/schemas/cart.schema';
import { z } from 'zod';

export type ProceedToCheckoutFormData = z.infer<typeof proceedToCheckoutSchema>;

export const useProceedToCheckout = () => {
  return useForm<ProceedToCheckoutFormData>({
    resolver: zodResolver(proceedToCheckoutSchema),
    mode: 'onChange',
    defaultValues: {
      totalItems: 0,
      totalItemsPrice: 0,
      shippingCost: 0,
      totalCost: 0,
      agreeToTerms: false,
    },
  });
};
