const BaseSidebar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <aside
      className={`flex-shrink-0  fixed h-screen hidden md:flex flex-col justify-start p-5 overflow-hidden ${className} `}
    >
      {children}
    </aside>
  );
};

export default BaseSidebar;
