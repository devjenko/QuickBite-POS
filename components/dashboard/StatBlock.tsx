import Image from "next/image"
import Chart from "./Chart"

const StatBlock = ({icon, category}: {icon: string, category: string}) => {
  return (
    
    <div>
        <div className="flex gap-4">
            <Image src={icon} alt={category} width={24} height={24}  unoptimized/>
            <p>{category}</p>
        </div>





    </div>
  )
}

export default StatBlock