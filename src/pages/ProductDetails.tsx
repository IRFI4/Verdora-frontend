import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import Breadcrumbs from '@components/common/Breadcrumbs';
import ErrorSection from '@components/common/section/ErrorSection';
import { Button } from '@components/ui/button';
import { useGetProductById, useGetProducts } from '@api/product/product.hooks';
import { useCategoryById } from '@api/category/category.hooks';
import { ProductGallery } from '@components/product/ProductGallery';
import { ProductInfo } from '@components/product/ProductInfo';
import { ProductTabs } from '@components/product/ProductTabs';
import { ProductCarousel } from '@components/product/ProductCarousel';
import { ProductDetailsSkeleton } from '@components/product/ProductDetailsSkeleton';
const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const isValidId = Number.isInteger(productId) && productId > 0;

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductById(productId, isValidId);

  const { data: apiCategory } = useCategoryById(product?.categoryId ?? 0);
  const categoryName = apiCategory?.name;

  const { data: relatedProductsData, isLoading: isLoadingRelated } =
    useGetProducts(
      product?.categoryId
        ? {
            categoryId: product.categoryId,
            size: 8,
          }
        : undefined
    );

  const relatedProducts = useMemo(() => {
    if (
      relatedProductsData?.content &&
      relatedProductsData.content.length > 0
    ) {
      return relatedProductsData.content.filter(
        p => p.productId !== product?.productId
      );
    }
    return [];
  }, [relatedProductsData, product?.productId]);

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '/catalog' },
      ...(product?.categoryId
        ? [
            {
              label: categoryName,
              href: `/catalog?category=${product.categoryId}`,
            },
          ]
        : []),
      { label: product?.name || (isValidId ? `Product #${id}` : 'Product') },
    ],
    [product, categoryName, isValidId, id]
  );

  return (
    <LayoutPage>
      <div className="w-full max-w-300 mx-auto px-4 sm:px-8 py-5 sm:py-7 space-y-6 sm:space-y-8">
        <Breadcrumbs items={breadcrumbItems} className="text-sm" />

        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : isError || !isValidId || !product ? (
          <div className="max-w-140 mx-auto my-12 text-center space-y-4">
            <ErrorSection
              title="We couldn’t load this product"
              message={`The product #${id} could not be retrieved. Check your connection or explore other plants in our catalog.`}
              onRetry={() => refetch()}
              retryText="Try again"
            />
            <div>
              <Button
                asChild
                variant="outline"
                className="rounded-[16px] h-11 px-5"
              >
                <Link to="/catalog">Back to catalog</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <ProductGallery
                images={product.imageUrl ? [product.imageUrl] : undefined}
                productName={product.name}
                hasDiscount={Boolean(
                  product.discountPrice && product.discountPrice < product.price
                )}
                discountPercentage={
                  product.discountPrice
                    ? Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100
                      )
                    : 0
                }
              />

              <ProductInfo product={product} categoryName={categoryName} />
            </div>

            <ProductTabs product={product} categoryName={categoryName} />

            <ProductCarousel
              title="You may also like"
              products={relatedProducts}
              isLoading={isLoadingRelated}
              viewAllHref={
                product.categoryId
                  ? `/catalog?category=${product.categoryId}`
                  : '/catalog'
              }
            />
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default ProductDetails;
