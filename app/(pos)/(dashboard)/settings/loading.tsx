import DashboardLayout from "@/components/layout/DashboardLayout";
import { Skeleton } from "@/components/skeletons/Skeleton";

const SettingsLoading = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-pulse">
        <Skeleton className="h-8 w-24" />

        <Skeleton className="p-5">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-72 mb-6" />

          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="p-5 mb-5 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="w-16 h-16" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-64" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
              <Skeleton className="h-10 w-28" />
            </Skeleton>
          ))}

          <div className="mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4 border-b border-gray-100 last:border-0">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </Skeleton>

        <Skeleton className="p-5">
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-4 w-80 mb-6" />

          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="p-4 mb-3 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4 mt-1" />
            </Skeleton>
          ))}
        </Skeleton>

        <Skeleton className="p-5">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-72 mb-6" />

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4 border-b border-gray-100 last:border-0">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-9 w-32" />
            </div>
          ))}
        </Skeleton>
      </div>
    </DashboardLayout>
  );
};

export default SettingsLoading;
