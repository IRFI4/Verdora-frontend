import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Flower2, ShoppingBag, Check } from 'lucide-react';
import { Skeleton } from '@components/ui/skeleton';
import type { Product } from '@/types/product';

export type FavoriteCardProduct = Pick<
  Product,
  'productId' | 'name' | 'price'
> & {
  discountPrice?: number | null;
  imageUrl?: string;
  description?: string;
  categoryName?: string;
};

type Props = {
  product: FavoriteCardProduct;
  isFavorite?: boolean;
  isPending?: boolean;
  inCartCount?: number;
  onToggleFavorite?: (productId: number) => void;
  onAddToCart?: (productId: number) => void;
  onAuthRequired?: () => void;
  isAuthenticated?: boolean;
};

export const FavoriteProductCard = ({
  product,
  isFavorite = true,
  isPending = false,
  inCartCount = 0,
  onToggleFavorite,
  onAddToCart,
  onAuthRequired,
  isAuthenticated = true,
}: Props) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const hasDiscount = Boolean(
    product.discountPrice != null &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price
  );
  const currentPrice = hasDiscount ? product.discountPrice! : product.price;
  const originalPrice = hasDiscount ? product.price : undefined;

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onAuthRequired?.();
      return;
    }
    onToggleFavorite?.(product.productId);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.productId);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const target = e.target as HTMLElement;
          if (!target.closest('button')) {
            e.preventDefault();
            handleCardClick();
          }
        }
      }}
      aria-label={`View details for ${product.name}`}
      className={`bg-[#fcfdfb] border border-[#E4E8E3] rounded-2xl flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md group cursor-pointer text-left relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
        isPending ? 'opacity-55' : 'opacity-100'
      }`}
    >
      <div className="relative h-50 w-full bg-[#EEF1EC] overflow-hidden">
        {product.imageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 size-full rounded-none" />
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center size-full gap-2 text-text-muted p-4">
            <Flower2 className="size-10 stroke-[1.2] text-primary/40" />
            <span className="text-xs font-medium text-text-muted">
              {product.categoryName || 'Verdora Plant'}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={isPending}
          className={`absolute top-3 right-3 size-10.5 rounded-full flex items-center justify-center cursor-pointer bg-white shadow-[0_2px_8px_rgba(12,12,12,0.12)] transition-transform hover:scale-110 active:scale-95 z-10 ${
            isFavorite
              ? 'border border-[#F3B7B3] text-[#FA1105]'
              : 'border border-white text-[#0C0C0C]'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`size-5 stroke-[1.6] ${
              isFavorite ? 'fill-[#FA1105] text-[#FA1105]' : 'text-[#0C0C0C]'
            }`}
          />
        </button>

        <div className="absolute left-3.5 right-3.5 bottom-3.5 flex items-center gap-1.5 z-10">
          <span
            className={`text-[18px] font-bold h-10 px-3 flex items-center rounded-lg tracking-tight ${
              hasDiscount
                ? 'bg-[#FA1105] text-white'
                : 'bg-white text-[#0C0C0C] shadow-xs'
            }`}
          >
            {currentPrice}₴
          </span>

          {hasDiscount && originalPrice !== undefined && (
            <span className="bg-[#4F5B50] text-[#E4E8E3] text-[14px] font-semibold line-through h-[30px] px-2.5 flex items-center rounded-lg tracking-tight">
              {originalPrice}₴
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3.5 flex-1 justify-between">
        <h3 className="font-heading font-medium text-[16px] text-[#0C0C0C] leading-[1.4] tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`h-11 w-full flex items-center justify-center gap-2 rounded-xl text-[15px] font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-xs ${
            addedAnimation
              ? 'bg-emerald-600 text-white scale-[1.02]'
              : inCartCount > 0
                ? 'bg-[#EDF5E9] text-[#2F6B29] border border-[#C6E3B4] hover:bg-[#e4f0de]'
                : 'bg-[#3E8D35] hover:bg-[#34782c] text-white'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {addedAnimation ? (
            <>
              <Check className="size-4.5 stroke-[2.5]" />
              <span>Added!</span>
            </>
          ) : inCartCount > 0 ? (
            <>
              <ShoppingBag className="size-4.5 stroke-[1.8]" />
              <span>In cart ({inCartCount}) · add more</span>
            </>
          ) : (
            <>
              <ShoppingBag className="size-4.5 stroke-[1.8]" />
              <span>Add to cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const FavoriteProductCardSkeleton = () => {
  return (
    <div className="bg-[#fcfdfb] border border-[#E4E8E3] rounded-2xl flex flex-col overflow-hidden">
      <div className="relative h-50 w-full bg-[#EEF1EC]">
        <Skeleton className="size-full rounded-none" />
        <Skeleton className="absolute top-3 right-3 size-10.5 rounded-full" />
        <Skeleton className="absolute left-3.5 bottom-3.5 h-10 w-24 rounded-lg" />
      </div>
      <div className="p-4 flex flex-col gap-3.5 flex-1 justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5 rounded-md" />
          <Skeleton className="h-4 w-3/5 rounded-md" />
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default FavoriteProductCard;
