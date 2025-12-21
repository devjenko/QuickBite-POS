import { SkeletonCard } from "@/components/ui/SkeletonCard";
import CenterContentContainer from "@/components/ui/CenterContentContainer";

export default function Loading() {
  return (
    <CenterContentContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-11">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </CenterContentContainer>
  );
}
