import Image from "next/image"

import SimpleAreaChart from "./Chart";

const StatBlock = ({icon, category}: {icon: string, category: string}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex gap-4 mb-4">
        <Image src={icon} alt={category} width={24} height={24} unoptimized/>
        <p>{category}</p>
      </div>
      
      <div className="w-full">
        <SimpleAreaChart />
      </div>
    </div>
  );
};

export default StatBlock;