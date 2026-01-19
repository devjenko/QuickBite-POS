import { cn } from "@/lib/utils"
import Tabs from "../checkout/Tabs"


const StatsContent = ({className}: {className?: string}) => {
  return (
    <Tabs 
      tabs={[
            {
            label: "This Week",
            content: <div>Overall Statistics</div>,
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
      className={cn("", className)}
    />
  )
}

export default StatsContent