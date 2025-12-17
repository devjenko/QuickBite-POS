const POSLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`min-h-screen  justify-between overflow-x-hidden flex bg-[var(--LightGrey)] ${className}`}
    >
      {children}
    </div>
  );
};

export default POSLayout;
