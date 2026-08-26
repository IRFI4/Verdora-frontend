import ProductCardImage from '@assets/images/product.png';
import FavouriteIcon from '@assets/icons/heart.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import { Button } from '@components/ui/button';
import { cn } from '@/lib/utils';
import { useAddItemToCart } from '@api/cart/cart.hooks';
import {
  useAddToFavorites,
  useCheckIfProductIsFavorite,
  useRemoveFromFavorites,
} from '@api/favorites/favorites.hooks';
import { Spinner } from '@components/ui/spinner';
import { useAppSelector } from '@api/hooks';
import { useNavigate } from 'react-router-dom';
import type React from 'react';

interface ProductCardProps {
  productId: number;
  title: string;
  price: number;
  newPrice?: number;
  imageSrc?: string;
}

const ProductCard = ({
  productId,
  title,
  price,
  newPrice,
  imageSrc,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);

  const { mutate: addToCart, isPending: isAdding } = useAddItemToCart();
  const { mutate: addToFavorites, isPending: isAddingToFavorites } =
    useAddToFavorites();
  const { mutate: removeFromFavorites, isPending: isRemovingFromFavorites } =
    useRemoveFromFavorites();

  // Only check if product is favorite if user is authenticated
  const { data: isFavorite, isLoading: isFavoriteLoading } =
    useCheckIfProductIsFavorite(productId, Boolean(user));

  const handleToggleFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    if (isFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    if (productId) {
      addToCart({ productId, quantity: 1 });
    }
  };

  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-[16px] bg-white/80 backdrop-blur-xs border border-white/80 p-4 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative z-10 flex items-center justify-between gap-2.5">
        <p className="text-[16px] leading-none text-link-text">
          {title || 'Rubber Plant'}
        </p>
        <div className="flex gap-[8px]">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className={cn(
              'transition-colors cursor-pointer',
              isFavorite && 'bg-[#1E331B]/10 border-[#1E331B]'
            )}
            onClick={handleToggleFavorites}
            disabled={isAddingToFavorites || isRemovingFromFavorites}
            aria-label="Toggle favourite"
          >
            {isFavoriteLoading ? (
              <Spinner className="size-3.5 text-link-text" />
            ) : (
              <FavouriteIcon
                className={cn(
                  'size-4 transition-colors',
                  isFavorite
                    ? 'fill-[#1E331B] text-[#1E331B]'
                    : 'text-link-text'
                )}
              />
            )}
          </Button>

          <Button
            type="button"
            size="icon-sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="cursor-pointer"
            aria-label="Add to cart"
          >
            {isAdding ? (
              <Spinner className="size-3.5 text-white" />
            ) : (
              <CartIcon className="size-4 text-white" />
            )}
          </Button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[64px] flex items-end justify-center px-6">
        <img
          src={imageSrc || ProductCardImage}
          alt={title || 'Rubber Plant'}
          className="h-[88%] w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center whitespace-nowrap">
        {newPrice && (
          <span className="rounded-[8px] bg-[#FF0909] px-2 py-1 text-[16px] font-semibold leading-none text-white">
            {newPrice}₴
          </span>
        )}
        <span
          className={cn(
            'rounded-[8px] px-2 py-1 text-[16px] font-semibold leading-none',
            newPrice
              ? 'ml-1 rounded-[5px] bg-link-text opacity-56 px-1.5 py-[4px] text-[11px] leading-none text-white line-through'
              : 'bg-link-text text-white'
          )}
        >
          {price}₴
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
