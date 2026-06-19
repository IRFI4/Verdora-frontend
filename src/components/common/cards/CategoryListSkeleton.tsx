import { Skeleton } from '@components/ui/skeleton';

const CategoryListSkeleton = () => (
  <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
    {Array.from({ length: 5 }).map((_, i) => (
      <li
        key={i}
        className="flex items-center justify-between gap-3 px-4 py-3.5"
      >
        <Skeleton className="h-[16px] w-40 rounded" />
        <Skeleton className="h-[28px] w-16 rounded-md" />
      </li>
    ))}
  </ul>
);

export default CategoryListSkeleton;
