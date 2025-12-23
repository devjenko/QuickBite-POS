import { SkeletonCard } from "./skeleton-card";
import CenterContentContainer from "@/components/shared/center-content-container";

const MenuSkeletonPage = () => {
  return (
    <CenterContentContainer className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max">
      {Array.from({ length: 14 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </CenterContentContainer>
  );
};

export default MenuSkeletonPage;
