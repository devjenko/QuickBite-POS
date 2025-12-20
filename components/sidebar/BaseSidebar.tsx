const BaseSidebar = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <aside
      style={style}
      className={`flex-shrink-0  fixed h-screen hidden md:flex flex-col justify-start p-5 overflow-hidden ${className} `}
    >
      {children}
    </aside>
  );
};

export default BaseSidebar;
