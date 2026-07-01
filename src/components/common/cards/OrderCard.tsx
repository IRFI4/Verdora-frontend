import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Package, Pencil } from 'lucide-react';
import type { Order } from '@/types/order';
import type { OrderStatus } from '@/types/order';
import DialogComponent from '@components/common/dialog/DialogComponent';
import AlertComponent from '@components/common/dialog/AlertComponent';
import { useCancelOrder, useUpdateOrder } from '@api/order/order.hooks';
import { useState } from 'react';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );

  const cancelMutation = useCancelOrder();
  const updateMutation = useUpdateOrder();

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const errorCancel = cancelMutation.error?.response?.data?.message;
  const errorUpdate = updateMutation.error?.response?.data?.message;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-lg">Order #{order.orderId}</CardTitle>
            <CardDescription className="mt-1">{formattedDate}</CardDescription>
          </div>
          <Badge
            variant={
              order.status === 'PENDING' || order.status === 'PAID'
                ? 'default'
                : order.status === 'SHIPPED'
                  ? 'secondary'
                  : 'destructive'
            }
            className="h-auto px-2 py-1 text-xs"
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Package className="size-16" />
            <span>
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}{' '}
              for total of ${order.totalPrice.toFixed(2)}
            </span>
          </div>

          <ul className="text-sm space-y-2">
            {order.items.slice(0, 3).map(item => (
              <li
                key={item.orderItemId}
                className="flex justify-between items-center gap-2"
              >
                <span className="flex-1">
                  <span className="text-xs mr-2">{item.quantity}x</span>
                  {item.productName}
                </span>
                <span className="font-medium whitespace-nowrap">
                  ${item.subtotal.toFixed(2)}
                </span>
              </li>
            ))}
            {order.items.length > 3 && (
              <li className="text-xs text-muted-foreground pt-1">
                + {order.items.length - 3} more items...
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-4 border-t">
        <Button
          variant="ghost"
          onClick={() => setIsUpdateOpen(true)}
          aria-label={`Edit ${order.orderId}`}
        >
          <Pencil className="size-16" aria-hidden="true" />
          <p>Edit</p>
        </Button>
        <DialogComponent
          open={isUpdateOpen}
          onOpenChange={open => {
            setIsUpdateOpen(open);
            setSelectedStatus(order.status);
          }}
          headerTitle={`Update Order #${order.orderId} Status`}
          headerDescription="Change the status of this order."
          cancelText="Cancel"
          submitText="Update"
          onSubmit={() => {
            updateMutation.mutate(
              { orderId: order.orderId, status: selectedStatus },
              {
                onSuccess: () => {
                  setIsUpdateOpen(false);
                },
              }
            );
          }}
          submitDisabled={
            selectedStatus === order.status || updateMutation.isPending
          }
          autoCloseOnSubmit={false}
          loading={updateMutation.isPending}
        >
          <form>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as OrderStatus)}
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="SHIPPED">Shipped</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            {errorUpdate && (
              <p className="text-sm text-destructive mt-2">{errorUpdate}</p>
            )}
          </form>
        </DialogComponent>
        <AlertComponent
          buttonText="Cancel Order"
          isAlertDialogOpen={isCancelOpen}
          isDeleting={cancelMutation.isPending}
          actionText="Cancel Order"
          loadingText="Cancelling..."
          onOpenChange={open => {
            setIsCancelOpen(open);
            if (!open) {
              cancelMutation.reset();
            }
          }}
          errorText={errorCancel}
          onAction={() => {
            cancelMutation.mutate(order.orderId, {
              onSuccess: () => {
                setIsCancelOpen(false);
              },
            });
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
