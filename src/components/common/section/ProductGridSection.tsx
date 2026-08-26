import ProductCard from '@components/common/cards/ProductCard';
import { Skeleton } from '@components/ui/skeleton';
import { EmptySection } from '@components/common/section/EmptySection';
import { Button } from '@components/ui/button';
import CartIcon from '@assets/icons/cart.svg?react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import SectionLayout from '@components/common/section/SectionLayout';
import type React from 'react';

type ProductGridSectionProps = {
  title: string;
  titleIcon?: React.ReactNode;
  viewAllLink?: string;
  viewAllText?: string;
  products?: Product[];
  isLoading?: boolean;
  limit?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  gridClassName?: string;
};

const ProductGridSection = ({
  title,
  titleIcon,
  viewAllLink,
  viewAllText,
  products,
  isLoading,
  limit = 8,
  emptyTitle = 'No products found',
  emptyDescription = 'There are no products available at the moment. Please try again later.',
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
}: ProductGridSectionProps) => {
  const displayProducts = products ? products.slice(0, limit) : [];

  return (
    <SectionLayout
      title={title}
      titleIcon={titleIcon}
      viewAllLink={viewAllLink}
      viewAllText={viewAllText}
      contentClassName={gridClassName}
    >
      {isLoading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="w-full aspect-[1/0.98] rounded-3xl" />
        ))
      ) : displayProducts.length > 0 ? (
        displayProducts.map(item => (
          <ProductCard
            key={item.productId}
            productId={item.productId}
            title={item.name}
            imageSrc={
              item.imageUrl ||
              `https://placehold.co/600x400?text=${encodeURIComponent(item.name)}`
            }
            price={item.price}
            newPrice={item.discountPrice}
          />
        ))
      ) : (
        <EmptySection
          title={emptyTitle}
          description={emptyDescription}
          className="flex-1 p-4 col-span-full"
          icon={<CartIcon className="size-4" />}
          action={
            <Button variant="default" asChild>
              <Link to="/catalog">View products</Link>
            </Button>
          }
        />
      )}
    </SectionLayout>
  );
};

export default ProductGridSection;
