import { Skeleton } from "@/components/ui/skeleton";
import ContentWrapper from "./ContentWrapper";

export function SkeletonCard() {
  return (
    <ContentWrapper>
      <Skeleton className="rounded-sm  " />
    </ContentWrapper>
  );
}
