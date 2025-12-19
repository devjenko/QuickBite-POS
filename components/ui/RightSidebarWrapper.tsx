const RightSidebarWrapper = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`min-h-screen w-77.5 fixed md:block  hidden  ${className}`}
    >
      {children}
    </div>
  );
};

export default RightSidebarWrapper;
