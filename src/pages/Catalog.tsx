import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import { useSearchParams } from 'react-router-dom';
import { useGetProducts } from '@api/product/product.hooks';
import ProductCard from '@components/common/cards/ProductCard';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const { data: products, isLoading: productsLoading } = useGetProducts({
    search: searchQuery,
  });

  return (
    <LayoutPage>
      <div>
        {searchQuery && (
          <h1 className="text-2xl font-bold mb-4">
            Search results for: "{searchQuery}"
          </h1>
        )}

        {productsLoading ? (
          <p>Loading ...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.content?.map(product => (
              <ProductCard
                key={product.productId}
                title={product.name}
                price={product.price}
                newPrice={product.discountPrice}
                imageSrc={product.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default Catalog;
