import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Button } from '@components/ui/button';
import { Loader2, Package, PackageSearch, Plus } from 'lucide-react';
import ErrorSection from '@components/common/section/ErrorSection';
import { EmptySection } from '@components/common/section/EmptySection';
import { PaginationComponent } from '@components/common/pagination/Pagination';
import {
  ProductListSkeleton,
  ProductRow,
} from '@components/common/cards/ProductRow';
import type { Product } from '@/types/product';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';

type ProductTableProps = {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error?: AxiosError<ApiErrorResponse> | null;
  page: number;
  totalPages: number;
  totalElements: number;
  hasActiveFilters: boolean;
  search: string;
  categoryId: 'ALL' | number;
  categoryIdToNameMap: Map<number, string>;
  onPageChange: (page: number) => void;
  onRefetch: () => void;
  onClearAllFilters: () => void;
  onViewDetails: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onCreateOpen: () => void;
};

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  isFetching,
  isError,
  error,
  page,
  totalPages,
  totalElements,
  hasActiveFilters,
  search,
  categoryId,
  categoryIdToNameMap,
  onPageChange,
  onRefetch,
  onClearAllFilters,
  onViewDetails,
  onEdit,
  onDelete,
  onCreateOpen,
}) => {
  const getCategoryName = (catId: number) => {
    return categoryIdToNameMap.get(catId) || `Category ${catId}`;
  };

  const emptyStateDescription = (() => {
    if (search && categoryId !== 'ALL') {
      return `No products match "${search}" in category "${categoryIdToNameMap.get(categoryId)}".`;
    }

    if (search) {
      return `No products match "${search}".`;
    }

    if (categoryId !== 'ALL') {
      return `No products found in category "${categoryIdToNameMap.get(categoryId)}".`;
    }

    return 'No products available.';
  })();

  return (
    <div className="mt-6 relative">
      {isFetching && !isLoading && (
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2 rounded-full bg-background/95 backdrop-blur-xs border border-border px-3 py-1 text-xs font-medium shadow-sm text-primary">
          <Loader2 className="size-3.5 animate-spin" />
          <span>Updating list...</span>
        </div>
      )}

      {isLoading ? (
        <Card className="border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Discount Price</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ProductListSkeleton count={12} />
            </TableBody>
          </Table>
        </Card>
      ) : isError ? (
        <Card className="border-border py-8 shadow-sm">
          <ErrorSection
            title="Failed to load products"
            message={error?.response?.data?.message}
            onRetry={onRefetch}
            retryText="Try again"
          />
        </Card>
      ) : products.length === 0 ? (
        <Card className="border-border py-12 shadow-sm">
          {hasActiveFilters ? (
            <EmptySection
              title="No results found"
              description={emptyStateDescription}
              className="px-6"
              icon={
                <div className="flex items-center justify-center rounded-full bg-muted p-4">
                  <PackageSearch
                    className="size-8 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              }
              action={
                <Button
                  variant="outline"
                  onClick={onClearAllFilters}
                  className="cursor-pointer"
                >
                  Clear all filters
                </Button>
              }
            />
          ) : (
            <EmptySection
              title="No products in catalog"
              description="There are currently no products registered in your store catalog."
              className="px-6"
              icon={
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-4">
                  <Package className="size-8 text-primary" aria-hidden="true" />
                </div>
              }
              action={
                <Button onClick={onCreateOpen} className="cursor-pointer gap-2">
                  <Plus className="size-4" />
                  Create product
                </Button>
              }
            />
          )}
        </Card>
      ) : (
        <Card
          className={`border-border shadow-sm transition-opacity ${
            isFetching ? 'opacity-70' : 'opacity-100'
          }`}
        >
          <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Product Records</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Displaying page {page + 1} of {totalPages} ({products.length} of{' '}
                {totalElements} items)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Discount Price</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <ProductRow
                    key={product.productId}
                    product={product}
                    categoryName={getCategoryName(product.categoryId)}
                    onViewDetails={onViewDetails}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>

          {totalPages > 1 && (
            <div className="p-4 border-t border-border">
              <PaginationComponent
                currentPage={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ProductTable;
