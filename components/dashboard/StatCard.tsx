import ContentWrapper from "../shared/ContentWrapper"
import Image from "next/image"


const StatCard = ({icon, name, value}: {icon: string, name: string, value: number | undefined}) => {


  return (
    <ContentWrapper className="p-2 md:p-5 flex-1 min-w-0 max-w-48" variant="dark">
        <Image src={icon} alt={name} width={24} height={24} className="invert" />
        <h3>{value}</h3>
        <p className="text-white">{name}</p>
    </ContentWrapper>
  )
}

export default StatCard