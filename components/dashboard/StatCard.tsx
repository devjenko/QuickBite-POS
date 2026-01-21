import ContentWrapper from "../shared/ContentWrapper"
import Image from "next/image"


const StatCard = ({icon, name, value}: {icon: string, name: string, value: number | string | undefined}) => {


  return (
    <ContentWrapper className="p-2.5 pl-3 md:p-5 md:pl-6.5 flex-1 min-w-0 flex flex-col gap-2.5 xl:gap-5" variant="dark">
        <Image src={icon} alt={name} width={24} height={24} className="invert md:w-7 md:h-7 lg:w-8 lg:h-8"/>
        <h3>{value}</h3>
        <p className="text-white">{name}</p>
    </ContentWrapper>
  )
}

export default StatCard