const RightSidebarWrapper = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-[var(--White)] min-h-screen w-77.5 fixed top-0 right-0 md:block  hidden  ${className}`}
    >
      {children}
    </div>
  );
};

export default RightSidebarWrapper;
