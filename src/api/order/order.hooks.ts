import { orderService } from '@api/order/order.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import type { Order, UpdateOrderPayload } from '@/types/order';

type OrderAxiosError = AxiosError<ApiErrorResponse>;

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, OrderAxiosError>({
    mutationFn: () => orderService.createOrder(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, OrderAxiosError, UpdateOrderPayload>({
    mutationFn: data => orderService.updateOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, OrderAxiosError, number>({
    mutationFn: orderId => orderService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useGetOrderById = (orderId: number) => {
  return useQuery<Order, OrderAxiosError>({
    queryKey: ['orders', orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useAllOrders = () => {
  return useQuery<Order[], OrderAxiosError>({
    queryKey: ['orders'],
    queryFn: () => orderService.getAllOrders(),
  });
};
