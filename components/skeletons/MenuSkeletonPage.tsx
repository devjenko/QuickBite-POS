import { SkeletonCard } from "@/components/skeletons/SkeletonCard";
import CenterContentContainer from "@/components/shared/CenterContentContainer";

const MenuSkeletonPage = () => {
  return (
    <CenterContentContainer className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max">
      <div className="col-span-full px-14 py-2.5 border rounded-sm h-12 animate-pulse"></div>
      {Array.from({ length: 21 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </CenterContentContainer>
  );
};

export default MenuSkeletonPage;
