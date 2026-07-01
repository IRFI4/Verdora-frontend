import AdminSectionHeader from '@components/common/section/AdminSectionHeader';
import { useAllOrders } from '@api/order/order.hooks';
import OrderCard from '@/components/common/cards/OrderCard';
import OrderCardSkeleton from '@components/common/cards/OrderCardSkeleton';
import ErrorSection from '@components/common/section/ErrorSection';
import { EmptySection } from '@/components/common/section/EmptySection';
import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminOrderPage = () => {
  const { data: items, isLoading, error, refetch } = useAllOrders();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="flex flex-1 flex-col w-full max-w-[1710px] mx-auto px-6 py-8">
        <AdminSectionHeader
          title={
            <div className="flex items-center gap-3">
              <span className="font-heading font-semibold text-text-h">
                Orders
              </span>
            </div>
          }
          description="Monitor and manage all customer purchases."
        >
          <p className="text-sm text-muted-foreground">
            {items && items.length > 0
              ? `${items.length} orders`
              : 'No orders yet'}
          </p>
        </AdminSectionHeader>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            <OrderCardSkeleton />
            <OrderCardSkeleton />
            <OrderCardSkeleton />
            <OrderCardSkeleton />
            <OrderCardSkeleton />
            <OrderCardSkeleton />
          </div>
        ) : error ? (
          <ErrorSection
            title={'Something went wrong'}
            message={error?.response?.data?.message || 'Failed to load'}
            onRetry={() => refetch()}
          />
        ) : !items || items.length === 0 ? (
          <EmptySection
            title="No orders yet"
            description="Create your first order to start managing purchases."
            className="rounded-xl border border-dashed border-border bg-card px-6 py-12"
            icon={
              <div className="flex items-center justify-center rounded-full bg-primary/10 p-4">
                <FolderOpen
                  className="size-16 text-primary"
                  aria-hidden="true"
                />
              </div>
            }
            action={
              <Button
                onClick={() => {
                  navigate('/catalog');
                }}
                className="cursor-pointer"
              >
                <Plus className="size-16" aria-hidden="true" />
                Create order
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {items.map(order => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminOrderPage;
