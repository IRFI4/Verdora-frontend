import { Link } from 'react-router-dom';
import ProductCardImage from '@assets/images/product.png';
import FavouriteIcon from '@assets/icons/heart.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import { Button } from '@components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  key?: number;
  title?: string;
  price?: number;
  newPrice?: number;
  imageSrc?: string;
}

const ProductCard = ({
  title,
  price,
  newPrice,
  imageSrc,
}: ProductCardProps) => {
  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-[16px] bg-white/80 backdrop-blur-xs border border-white/80 p-4 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative z-10 flex items-center justify-between gap-2.5">
        <p className="text-[16px] leading-none text-[#0C0C0C]">
          {title || 'Rubber Plant'}
        </p>
        <div className="flex gap-[8px]">
          <Button asChild variant={'outline'} size={'icon-sm'}>
            <Link to="/favourites" aria-label="Favourite items">
              <FavouriteIcon className="size-4 text-[#0C0C0C]" />
            </Link>
          </Button>
          <Button asChild size={'icon-sm'}>
            <Link to="/cart" aria-label="Shopping cart">
              <CartIcon className="size-4 text-white" />
            </Link>
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
              ? 'ml-1 rounded-[5px] bg-[#0C0C0C] opacity-56 px-1.5 py-[4px] text-[11px] leading-none text-white line-through'
              : 'bg-[#0C0C0C] text-white'
          )}
        >
          {price}₴
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
