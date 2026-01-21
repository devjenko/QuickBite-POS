import { Skeleton } from "@/components/skeletons/Skeleton";

const OrdersLoading = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-5 border-b border-[var(--LightGrey)] justify-center animate-pulse">
        <div className="px-6 pb-3">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="px-6 pb-3">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 flex">
        <div className="w-full flex flex-col gap-2.5 p-5 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="py-6 px-4 flex justify-between"
            >
              <div className="flex flex-col gap-8">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-14" />
              </div>
              <div className="flex flex-col gap-8 items-end">
                <Skeleton className="h-3 w-16" />
                <div className="flex gap-3 items-center">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersLoading;
