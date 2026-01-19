import { cn } from "@/lib/utils"
import Tabs from "../checkout/Tabs"
import { itemCategories } from "@/consts/menu"
import StatBlock from "./StatBlock"


const StatsContent = ({className}: {className?: string}) => {
  return (
    <Tabs 
      tabs={[
            {
            label: "This Week",
            content: <div>{itemCategories.map((category) => (
              <StatBlock key={category.name}
                icon={`/icons/${category.name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "")}.svg`}
                category={category.name}
              />
            ))}</div>,
            },
            {
            label: "This Month",
            content: <div>Items</div>,
            },
            {
            label: "This Year",
            content: <div>Orders</div>,
            },
      ]}
      className={cn("mt-10", className)}
    />
  )
}

export default StatsContent