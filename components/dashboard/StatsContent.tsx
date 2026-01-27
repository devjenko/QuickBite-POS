"use client";

import { cn } from "@/lib/utils"
import Tabs from "../checkout/Tabs"
import StatBlock from "./StatBlock"

type GroupedRevenue = Record<string, Record<string, number>>;

type StatsContentProps = {
  categories?: string[]; 
  weekData?: GroupedRevenue; 
  monthData?: GroupedRevenue; 
  yearData?: GroupedRevenue; 
  className?: string;
};

const StatsContent = ({
  categories = [], 
  weekData = {}, 
  monthData = {}, 
  yearData = {}, 
  className,
}: StatsContentProps) => {
  // Helper function to generate icon path from category name
  const getIconPath = (categoryName: string) => {
    const normalized = categoryName
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "");
    return `/icons/${normalized}.svg`;
  };

 
  if (!categories || categories.length === 0) {
    return (
      <div className={cn("mt-10 text-center p-12 bg-gray-50 rounded-lg", className)}>
        <p className="text-gray-600 text-lg">No sales data available yet.</p>
        <p className="text-gray-500 text-sm mt-2">
          Start taking orders to see revenue analytics here.
        </p>
      </div>
    );
  }

  return (
    <Tabs 
      tabs={[
        {
          label: "This Week",
          content: (
            <div>
              {categories.map((category) => (
                <StatBlock
                  key={category}
                  icon={getIconPath(category)}
                  category={category}
                  revenueData={weekData}
                  period="week"
                />
              ))}
            </div>
          ),
        },
        {
          label: "This Month",
          content: (
            <div>
              {categories.map((category) => (
                <StatBlock
                  key={category}
                  icon={getIconPath(category)}
                  category={category}
                  revenueData={monthData}
                  period="month"
                />
              ))}
            </div>
          ),
        },
        {
          label: "This Year",
          content: (
            <div>
              {categories.map((category) => (
                <StatBlock
                  key={category}
                  icon={getIconPath(category)}
                  category={category}
                  revenueData={yearData}
                  period="year"
                />
              ))}
            </div>
          ),
        },
      ]}
      className={cn("mt-10", className)}
    />
  )
}

export default StatsContent