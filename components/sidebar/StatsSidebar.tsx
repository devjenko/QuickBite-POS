import BaseSidebar from "./BaseSidebar";
import StatsContent from "../dashboard/StatsContent";

type GroupedRevenue = Record<string, Record<string, number>>;

type StatsSidebarProps = {
  categories: string[];
  weekData: GroupedRevenue;
  monthData: GroupedRevenue;
  yearData: GroupedRevenue;
};

const StatsSidebar = ({
  categories,
  weekData,
  monthData,
  yearData,
}: StatsSidebarProps) => {
  return (
    <BaseSidebar
      position="right"
      wide
      className="top-0 bg-[var(--White)] overflow-y-auto hide-scrollbar"
    >
      <h1>Overall Statistics</h1>
      <StatsContent 
        categories={categories}
        weekData={weekData}
        monthData={monthData}
        yearData={yearData}
      />
    </BaseSidebar>
  );
};

export default StatsSidebar;