import { Suspense } from 'react';
import StatsSidebar from './StatsSidebar';
import { 
    getRevenueByCategoryOverTime,
    getUniqueCategories 
  } from "@/lib/queries/revenue";
import BaseSidebar from "./BaseSidebar";


function StatsSidebarLoading() {
  return (
    <BaseSidebar
      position="right"
      wide
      className="top-0 bg-[var(--White)] overflow-y-auto hide-scrollbar"
    >
      <div className="p-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-6 w-48" />
        <div className="space-y-6">
          <div className="h-64 bg-gray-100 rounded animate-pulse" />
          <div className="h-64 bg-gray-100 rounded animate-pulse" />
          <div className="h-64 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </BaseSidebar>
  );
}


async function StatsSidebarData() {
  // Fetch all data in parallel
  const [categories, weekData, monthData, yearData] = await Promise.all([
    getUniqueCategories(),
    getRevenueByCategoryOverTime('week'),
    getRevenueByCategoryOverTime('month'),
    getRevenueByCategoryOverTime('year'),
  ]);

  // Pass data down to the client component
  return (
    <StatsSidebar
      categories={categories}
      weekData={weekData}
      monthData={monthData}
      yearData={yearData}
    />
  );
}


export default function StatsSidebarWrapper() {
  return (
    <Suspense fallback={<StatsSidebarLoading />}>
      <StatsSidebarData />
    </Suspense>
  );
}