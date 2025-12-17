const RightSidebarWrapper = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-[var(--White)] h-screen w-77.5 hidden md:flex ${className}`}
    >
      {children}
    </div>
  );
};

export default RightSidebarWrapper;
