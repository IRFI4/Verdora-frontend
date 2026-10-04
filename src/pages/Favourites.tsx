import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import { Breadcrumbs } from '@components/common/Breadcrumbs';
import { Button } from '@components/ui/button';
import { useGetFavorites } from '@api/favorites/favorites.hooks';
import ProductCard from '@components/common/cards/ProductCard';
import { EmptySection } from '@components/common/section/EmptySection';
import ErrorSection from '@components/common/section/ErrorSection';
import { Heart, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const {
    data: favorites,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetFavorites();

  const favoriteItems = favorites ?? [];

  return (
    <LayoutPage>
      <div className="w-full py-6 sm:py-8 space-y-6">
        <Breadcrumbs />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Heart className="size-5 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Favourites
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your saved plants and wishlist items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {favoriteItems.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {favoriteItems.length}{' '}
                {favoriteItems.length === 1 ? 'item' : 'items'}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching || isLoading}
              className="cursor-pointer gap-2 text-xs"
              title="Refresh favourites"
            >
              <RefreshCw
                className={`size-3.5 ${isRefetching ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] rounded-3xl bg-zinc-200/70 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <ErrorSection
              title="Unable to load favourites"
              message={
                error?.response?.data?.message ||
                error?.message ||
                'We were unable to retrieve your favorite items. Please check your connection and try again.'
              }
              onRetry={() => refetch()}
              retryText="Try Again"
            />
          </div>
        ) : favoriteItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 shadow-xs">
            <EmptySection
              title="No favourite plants yet"
              description="You haven't saved any plants to your favourites. Browse our catalog and click the heart icon on plants you love!"
              icon={
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-4">
                  <Heart className="size-10 text-primary" aria-hidden="true" />
                </div>
              }
              action={
                <Button asChild className="rounded-full px-6">
                  <Link to="/catalog">Explore Catalog</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteItems.map(item => (
              <ProductCard
                key={item.productId}
                productId={item.productId}
                title={item.productName}
                price={item.price}
                newPrice={
                  item.discountPrice > 0 ? item.discountPrice : undefined
                }
                imageSrc={item.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default Favourites;
