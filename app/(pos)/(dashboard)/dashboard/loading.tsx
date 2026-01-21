import DashboardLayout from "@/components/layout/DashboardLayout";
import { Skeleton } from "@/components/skeletons/Skeleton";

const DashboardLoading = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full gap-5">
        <header className="flex w-full items-center justify-between shrink-0 animate-pulse">
          <Skeleton className="hidden xl:block h-7 w-52" />
          <Skeleton className="xl:hidden h-15 w-15" />
          <Skeleton className="h-5 w-44 md:h-6 md:w-56" />
          <Skeleton className="xl:hidden h-10 w-10" />
        </header>

        <div className="flex gap-2.5 md:gap-5 items-center justify-around animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="p-2.5 pl-3 md:p-5 md:pl-6.5 flex-1 min-w-0 flex flex-col gap-2.5 xl:gap-5"
            >
              <Skeleton className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-12" />
            </Skeleton>
          ))}
        </div>

        <Skeleton className="flex-1 p-5 animate-pulse">
          <Skeleton className="h-7 w-32 mb-4" />
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 pr-4"><Skeleton className="h-4 w-10" /></th>
                <th className="text-left py-3 pr-4"><Skeleton className="h-4 w-14" /></th>
                <th className="text-left py-3 pr-4"><Skeleton className="h-4 w-8" /></th>
                <th className="text-right py-3"><Skeleton className="h-4 w-16 ml-auto" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4 pr-4"><Skeleton className="h-4 w-24 md:w-32" /></td>
                  <td className="py-4 pr-4"><Skeleton className="h-4 w-6 md:w-8" /></td>
                  <td className="py-4 pr-4"><Skeleton className="h-4 w-12 md:w-14" /></td>
                  <td className="py-4 text-right"><Skeleton className="h-4 w-16 md:w-20 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Skeleton>

        <Skeleton className="xl:hidden shrink-0 p-5 animate-pulse">
          <Skeleton className="h-7 w-36 mb-4" />
          <div className="mt-10 space-y-4">
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-24" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <Skeleton className="h-10 w-10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
          </div>
        </Skeleton>
      </div>
    </DashboardLayout>
  );
};

export default DashboardLoading;
