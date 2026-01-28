import Image from "next/image"
import SimpleAreaChart from "./Chart";
import { transformRevenueForChart } from "@/lib/chartUtils";

type GroupedRevenue = Record<string, Record<string,number>>;

type StatBlockProps = {
  icon:string;
  category:string;
  revenueData:GroupedRevenue;
  period: "week" | "month" | "year";
};




const StatBlock = ({icon, category, revenueData, period}: StatBlockProps) => {

  // transform data for specific category
  const chartData = transformRevenueForChart(revenueData, category, period);

  //  calculate total revenue for category
  const totalRevenue = chartData.reduce((sum, item) => sum + item.Revenue, 0);

   function denormalizeCategory(category:string){
    return category
    // Capitalize first letter of each word
    .split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
     // Handle the common cases manually
     .replace(/^maincourses$/i, 'Main Courses')
     .replace(/^sidedishes$/i, 'Side Dishes')
     .replace(/^colddrinks$/i, 'Cold Drinks')
     .replace(/^hotdrinks$/i, 'Hot Drinks')
     .trim();
  }


  return (
    <div className="w-full mb-8">
    <div className="flex gap-4 mb-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image 
          src={icon} 
          alt={category} 
          width={24} 
          height={24} 
          unoptimized
        />
        <p className="font-medium">{denormalizeCategory(category)}</p>
      </div>
      <p className="text-sm text-gray-600">
        Total: ${totalRevenue.toFixed(2)}
      </p>
    </div>
    
    <div className="w-full">
      <SimpleAreaChart data={chartData} />
    </div>
  </div>
);
}
export default StatBlock;