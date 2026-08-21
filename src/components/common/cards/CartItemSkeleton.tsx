import { Skeleton } from '@components/ui/skeleton';

const CartItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-6 p-4 border rounded-2xl w-full bg-white min-h-[112px]">
      <div className="flex items-center gap-4 flex-1">
        <Skeleton className="w-[80px] h-[80px] rounded-xl" />

        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-[20px] w-[160px]" />
          <Skeleton className="h-[16px] w-[96px]" />
        </div>
      </div>

      <Skeleton className="h-[24px] w-[64px]" />
      <Skeleton className="h-[32px] w-[95px] rounded-full" />
      <Skeleton className="h-[24px] w-[64px]" />
    </div>
  );
};

export default CartItemSkeleton;
