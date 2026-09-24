import React from 'react';
import { Sun, Droplets, Sparkles, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CareItem = {
  title: string;
  text: string;
  icon?: React.ReactNode;
};

const DEFAULT_CARE_ITEMS: CareItem[] = [
  {
    title: 'Light',
    text: 'Place in bright, indirect natural light. Protect foliage from scorching midday sun.',
    icon: <Sun className="size-5 text-[#3E8D35]" />,
  },
  {
    title: 'Water',
    text: 'Water thoroughly when the top layer of soil is dry. Ensure proper drainage to avoid standing water.',
    icon: <Droplets className="size-5 text-[#3E8D35]" />,
  },
  {
    title: 'Feeding',
    text: 'Feed with balanced liquid houseplant fertilizer once a month during spring and summer.',
    icon: <Sparkles className="size-5 text-[#3E8D35]" />,
  },
  {
    title: 'Shipping',
    text: 'Carefully packed in sturdy protective eco-packaging to ensure safe transit to your doorstep.',
    icon: <Truck className="size-5 text-[#3E8D35]" />,
  },
];

export type ProductCareCardsProps = {
  items?: CareItem[];
  className?: string;
};

export const ProductCareCards: React.FC<ProductCareCardsProps> = ({
  items = DEFAULT_CARE_ITEMS,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 animate-in fade-in duration-200',
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`${item.title}-${idx}`}
          className="bg-[#fcfdfb] border border-border rounded-[16px] p-5 space-y-2.5 shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            {item.icon}
            <h3 className="font-heading font-semibold text-base text-[#0C0C0C]">
              {item.title}
            </h3>
          </div>
          <p className="text-sm text-[#5c665d] leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCareCards;
