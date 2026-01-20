import BaseSidebar from "./BaseSidebar";
import StatsContent from "../dashboard/StatsContent";

const StatsSidebar = () => {
  return (
    <BaseSidebar
      position="right"
      wide
      className="top-0 bg-[var(--White)] overflow-y-auto hide-scrollbar"
    >
      <h1>Overall Statistics</h1>
      <StatsContent />
    </BaseSidebar>
  );
};

export default StatsSidebar;
