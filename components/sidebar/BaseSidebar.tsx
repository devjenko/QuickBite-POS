const BaseSidebar = ({
  children,
  className,
  style,
  position = "left",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  position?: "left" | "right";
  wide?: boolean;
}) => {
  const widthClass =
    position === "left"
      ? "w-[var(--sidebar-left-width)]"
      : wide
        ? "w-[var(--sidebar-right-wide-width)]"
        : "w-[var(--sidebar-right-width)]";

  const positionClass = position === "left" ? "left-0" : "right-0";

  return (
    <aside
      style={style}
      className={`shrink-0 fixed h-screen hidden xl:flex flex-col justify-start p-5 overflow-hidden ${widthClass} ${positionClass} ${className}`}
    >
      {children}
    </aside>
  );
};

export default BaseSidebar;
