import { cn } from "@/lib/utils";

interface ContentWrapperProps {
  variant?: "light" | "dark" | string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ContentWrapper = ({
  children,
  variant = "light",
  className,
  onClick,
}: ContentWrapperProps) => {
  return (
    <div
      onClick={onClick}
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
