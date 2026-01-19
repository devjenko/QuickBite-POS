import Image from "next/image"
import Chart from "./Chart"

const StatBlock = ({icon, category}: {icon: string, category: string}) => {
  return (
    <div>
        <div className="flex">
            <Image src={icon} alt={category} width={24} height={24} className="invert" />
            <p>{category}</p>
        </div>





    </div>
  )
}

export default StatBlock