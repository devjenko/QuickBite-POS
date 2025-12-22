import { SkeletonCard } from "@/components/ui/SkeletonCard";
import CenterContentContainer from "@/components/ui/CenterContentContainer";

export default function Loading() {
  return (
    <CenterContentContainer className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max">
      {Array.from({ length: 14 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </CenterContentContainer>
  );
}
