import { Skeleton } from "@/components/skeletons/skeleton";
import { Card, CardContent, CardFooter } from "../ui/card";

export function SkeletonCard() {
  return (
    <Card className=" flex flex-col gap-4 rounded-sm border p-0 shadow-sm max-w-sm w-full overflow-hidden">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-100">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content skeleton */}
      <CardContent className=" px-6 space-y-2">
        {/* Price skeleton */}
        <Skeleton className="pb-3 w-16" />

        {/* Title skeleton */}
        <Skeleton className="h-5 w-3/4" />
      </CardContent>

      {/* Footer/Description skeleton */}
      <CardFooter className="px-6 pb-6 pt-0">
        <Skeleton className="h-4 w-full" />
      </CardFooter>
    </Card>
  );
}
