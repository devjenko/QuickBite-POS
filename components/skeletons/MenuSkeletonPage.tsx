import { SkeletonCard } from "@/components/skeletons/SkeletonCard";
import { Skeleton } from "@/components/skeletons/Skeleton";
import CenterContentContainer from "@/components/shared/CenterContentContainer";

const MenuSkeletonPage = () => {
  return (
    <CenterContentContainer className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max animate-pulse">
      <Skeleton className="col-span-full px-14 py-2.5 h-12" />
      {Array.from({ length: 21 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </CenterContentContainer>
  );
};

export default MenuSkeletonPage;
