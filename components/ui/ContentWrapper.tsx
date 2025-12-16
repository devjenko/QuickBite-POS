import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  variant?: "light" | "dark";
  children: React.ReactNode;
  className?: string;
}

const ContentWrapper = ({
  children,
  variant = "light",
  className,
}: ContentWrapperProps) => {
  return (
    <div
      className={cn(
        "rounded-sm",
        variant === "dark" && "bg-[var(--DarkBlue)] text-[var(--White)]",
        variant === "light" && "bg-[var(--White)] text-[var(--Black)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
