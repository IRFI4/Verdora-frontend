import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import LayoutPage from '@/components/layout/pageLayout/LayoutPage';
import { useAppSelector } from '@api/hooks';
import { useAddItemToCart } from '@api/cart/cart.hooks';
import { useGetProducts } from '@api/product/product.hooks';
import LoginPromptDialog from '@components/common/dialog/LoginPromptDialog';
import {
  FavoriteProductCard,
  FavoriteProductCardSkeleton,
  type FavoriteCardProduct,
} from '@/components/favorites/FavoriteProductCard';

// ============================================================================
// FUTURE API INTEGRATION
// (Uncomment after merging feature/product-details into develop):
// ============================================================================
// import {
//   useGetFavorites,
//   useAddToFavorites,
//   useRemoveFromFavorites,
//   useFavoriteProductIds,
// } from '@api/favorites/favorites.hooks';
// import type { FavoriteItem } from '@/types/favorites';
// ============================================================================

const INITIAL_FAVORITE_PRODUCTS: FavoriteCardProduct[] = [
  {
    productId: 3,
    name: 'Monstera Deliciosa',
    price: 2990,
    discountPrice: 2400,
    imageUrl:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    description: 'Iconic split-leaf tropical houseplant, easy to care for.',
    categoryName: 'Indoor Plants',
  },
  {
    productId: 1,
    name: 'Rubber Plant (Ficus elastica)',
    price: 2000,
    discountPrice: 1609,
    imageUrl:
      'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80',
    description: 'Glossy dark green leaves that purify the air in any room.',
    categoryName: 'Indoor Plants',
  },
  {
    productId: 5,
    name: "Snake Plant 'Laurentii'",
    price: 1700,
    discountPrice: 1350,
    imageUrl:
      'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=600&auto=format&fit=crop&q=80',
    description: 'Virtually indestructible upright plant with yellow edges.',
    categoryName: 'Indoor Plants',
  },
  {
    productId: 19,
    name: 'Clay Pot with rose, 18 cm',
    price: 940,
    discountPrice: 720,
    imageUrl:
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&auto=format&fit=crop&q=80',
    description: 'Handmade terracotta pot with miniature potted rose.',
    categoryName: 'Planters & Pots',
  },
  {
    productId: 11,
    name: 'Garden Hose 20 m, reinforced',
    price: 1590,
    discountPrice: 1290,
    imageUrl:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    description: 'Flexible 4-layer UV-resistant hose with brass couplings.',
    categoryName: 'Garden Care',
  },
  {
    productId: 18,
    name: 'Ceramic Planter, 24 cm',
    price: 1400,
    discountPrice: 1150,
    imageUrl:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    description: 'Glazed artisan ceramic container with drainage hole.',
    categoryName: 'Planters & Pots',
  },
];

const FALLBACK_SUGGESTIONS: FavoriteCardProduct[] = [
  {
    productId: 2,
    name: 'Spider Plant seedling',
    price: 560,
    discountPrice: 420,
    imageUrl:
      'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&auto=format&fit=crop&q=80',
    categoryName: 'Indoor Plants',
  },
  {
    productId: 4,
    name: 'Areca Palm, 90 cm',
    price: 3800,
    discountPrice: 3200,
    imageUrl:
      'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?w=600&auto=format&fit=crop&q=80',
    categoryName: 'Indoor Plants',
  },
  {
    productId: 6,
    name: 'Sweet Briar Rose bush',
    price: 690,
    discountPrice: null,
    imageUrl:
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80',
    categoryName: 'Garden Care',
  },
  {
    productId: 7,
    name: 'Bypass Pruning Shears',
    price: 780,
    discountPrice: null,
    imageUrl:
      'https://images.unsplash.com/photo-1589051039495-eb7771258661?w=600&auto=format&fit=crop&q=80',
    categoryName: 'Garden Care',
  },
];

const Favorites = () => {
  const { user } = useAppSelector(state => state.auth);
  const isAuthenticated = Boolean(user);

  const addItemToCart = useAddItemToCart();

  const { data: productsData } = useGetProducts({ size: 8 });

  const [favoriteItems, setFavoriteItems] = useState<FavoriteCardProduct[]>(
    () => INITIAL_FAVORITE_PRODUCTS
  );
  const [pendingIds, setPendingIds] = useState<Record<number, boolean>>({});
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>(
    {}
  );
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const showToast = (
    text: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(prev => (prev?.text === text ? null : prev));
    }, 3200);
  };

  const favoriteIdsSet = useMemo(
    () => new Set(favoriteItems.map(p => p.productId)),
    [favoriteItems]
  );

  const suggestionProducts: FavoriteCardProduct[] = useMemo(() => {
    if (productsData?.content && productsData.content.length > 0) {
      const candidates = productsData.content.filter(
        p => !favoriteIdsSet.has(p.productId)
      );
      if (candidates.length >= 4) {
        return candidates.slice(0, 4).map(p => ({
          productId: p.productId,
          name: p.name,
          price: p.price,
          discountPrice: p.discountPrice,
          imageUrl: p.imageUrl,
          description: p.description,
        }));
      }
    }
    return FALLBACK_SUGGESTIONS.filter(p => !favoriteIdsSet.has(p.productId));
  }, [productsData, favoriteIdsSet]);

  const handleToggleFavorite = (productId: number) => {
    if (!isAuthenticated) {
      setIsLoginPromptOpen(true);
      return;
    }

    const isFav = favoriteIdsSet.has(productId);
    const targetProduct =
      favoriteItems.find(p => p.productId === productId) ||
      suggestionProducts.find(p => p.productId === productId) ||
      FALLBACK_SUGGESTIONS.find(p => p.productId === productId);

    if (!targetProduct) return;

    setPendingIds(prev => ({ ...prev, [productId]: true }));

    setTimeout(() => {
      if (isFav) {
        setFavoriteItems(prev => prev.filter(p => p.productId !== productId));
        showToast(`Removed “${targetProduct.name}” from favorites`, 'info');
      } else {
        setFavoriteItems(prev => [targetProduct, ...prev]);
        showToast(`Added “${targetProduct.name}” to favorites`, 'success');
      }
      setPendingIds(prev => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }, 300);
  };

  const handleAddToCart = (productId: number) => {
    const targetProduct =
      favoriteItems.find(p => p.productId === productId) ||
      suggestionProducts.find(p => p.productId === productId);

    setCartQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));

    addItemToCart.mutate(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          showToast(
            targetProduct
              ? `“${targetProduct.name}” added to cart — still saved in favorites`
              : 'Item added to cart',
            'success'
          );
        },
        onError: () => {
          showToast('Failed to add item to cart. Please try again.', 'error');
        },
      }
    );
  };

  const isFavoritesLoading = false;
  const savedCount = favoriteItems.length;
  const isEmptyView = !isFavoritesLoading && savedCount === 0;
  const isListView = !isFavoritesLoading && savedCount > 0;

  return (
    <LayoutPage>
      <div className="max-w-300 w-full mx-auto px-4 sm:px-8 pt-6 pb-28">
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <Link
            to="/"
            className="h-9.5 px-4 pl-3 flex items-center gap-2 rounded-full border border-[#D9DEDB] bg-white text-sm font-medium text-[#0C0C0C] hover:bg-zinc-50 transition-colors shadow-2xs"
          >
            <ChevronLeft className="size-4 text-[#586455]" />
            <span>Home</span>
          </Link>

          <span
            className="h-9.5 px-4 flex items-center rounded-full bg-[#EDF5E9] border border-[#C6E3B4] text-sm font-semibold text-[#2F6B29]"
            aria-current="page"
          >
            Favorites
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-7">
          <h1 className="text-3xl sm:text-[36px] font-heading font-bold text-[#0C0C0C] tracking-tight leading-[1.15]">
            Favorites
          </h1>

          {isListView && (
            <span className="text-[15px] font-medium text-[#5C665D]">
              {savedCount} {savedCount === 1 ? 'saved item' : 'saved items'}
            </span>
          )}
        </div>

        {isEmptyView && (
          <div className="mb-14 bg-white border border-[#E4E8E3] rounded-3xl p-8 sm:p-14 text-center shadow-xs flex flex-col items-center">
            <div className="size-20 rounded-full bg-[#FDF2F0] flex items-center justify-center mb-5 border border-[#F9CDC9]">
              <Heart className="size-10 text-[#FA1105] stroke-[1.6]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0C0C0C] mb-2">
              No favorites yet
            </h2>
            <p className="text-[15px] text-text-muted max-w-md mx-auto mb-6 leading-relaxed">
              You haven't saved any plants or accessories yet. Click the heart
              icon while exploring the catalog to save your favorite greenery
              here.
            </p>
            <Link
              to="/catalog"
              className="h-11 px-7 rounded-xl bg-[#3E8D35] hover:bg-[#34782c] text-white font-semibold text-[15px] inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="size-4.5" />
            </Link>
          </div>
        )}

        {isFavoritesLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5 mb-14">
            {Array.from({ length: 6 }).map((_, index) => (
              <FavoriteProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {isListView && (
          <div className="flex flex-col gap-6 mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
              {favoriteItems.map(item => (
                <FavoriteProductCard
                  key={item.productId}
                  product={item}
                  isFavorite={true}
                  isPending={Boolean(pendingIds[item.productId])}
                  inCartCount={cartQuantities[item.productId] || 0}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={handleAddToCart}
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={() => setIsLoginPromptOpen(true)}
                />
              ))}
            </div>

            <div className="flex items-center justify-center min-h-12 text-[14px] text-[#5C665D] font-medium pt-2">
              <span>That’s everything you’ve saved</span>
            </div>
          </div>
        )}

        {suggestionProducts.length > 0 && (
          <section className="mt-8 pt-8 border-t border-[#E4E8E3]/70">
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-[#3E8D35]" />
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0C0C0C] tracking-tight">
                  You may also like
                </h2>
              </div>

              <Link
                to="/catalog"
                className="text-[15px] font-semibold text-[#2F6B29] hover:underline flex items-center gap-1 group"
              >
                <span>See catalog</span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
              {suggestionProducts.map(product => (
                <FavoriteProductCard
                  key={product.productId}
                  product={product}
                  isFavorite={favoriteIdsSet.has(product.productId)}
                  isPending={Boolean(pendingIds[product.productId])}
                  inCartCount={cartQuantities[product.productId] || 0}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={handleAddToCart}
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={() => setIsLoginPromptOpen(true)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`flex items-center gap-3 px-4.5 py-3 rounded-full shadow-lg border text-sm font-medium ${
              toastMessage.type === 'error'
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : toastMessage.type === 'info'
                  ? 'bg-zinc-900 text-white border-zinc-800'
                  : 'bg-emerald-950 text-white border-emerald-800'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="size-4.5 text-rose-500 shrink-0" />
            ) : (
              <CheckCircle2 className="size-4.5 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Dismiss toast"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <LoginPromptDialog
        open={isLoginPromptOpen}
        onOpenChange={setIsLoginPromptOpen}
        action="favorite"
      />
    </LayoutPage>
  );
};

export default Favorites;
