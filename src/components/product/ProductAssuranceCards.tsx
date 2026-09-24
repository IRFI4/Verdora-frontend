import React from 'react';
import { cn } from '@/lib/utils';

export type ProductAssuranceCardsProps = {
  deliveryTitle?: string;
  deliveryText?: string;
  guaranteeTitle?: string;
  guaranteeText?: string;
  className?: string;
};

export const ProductAssuranceCards: React.FC<ProductAssuranceCardsProps> = ({
  deliveryTitle = 'Delivery',
  deliveryText = 'Tomorrow, from 90₴',
  guaranteeTitle = 'Plant guarantee',
  guaranteeText = '14 days after arrival',
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 mt-auto shrink-0',
        className
      )}
    >
      <div className="bg-[#fcfdfb] border border-border rounded-[16px] p-3.5 sm:p-4">
        <div className="text-xs text-text-muted mb-1 font-medium">
          {deliveryTitle}
        </div>
        <div className="text-[15px] font-medium text-[#0C0C0C]">
          {deliveryText}
        </div>
      </div>

      <div className="bg-[#fcfdfb] border border-border rounded-[16px] p-3.5 sm:p-4">
        <div className="text-xs text-text-muted mb-1 font-medium">
          {guaranteeTitle}
        </div>
        <div className="text-[15px] font-medium text-[#0C0C0C]">
          {guaranteeText}
        </div>
      </div>
    </div>
  );
};

export default ProductAssuranceCards;
