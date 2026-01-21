import { cn } from "@/lib/utils"

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "filled" | "outlined"
}

function Skeleton({ className, variant = "outlined", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-sm",
        variant === "filled" && "bg-accent animate-pulse",
        variant === "outlined" && "border",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
