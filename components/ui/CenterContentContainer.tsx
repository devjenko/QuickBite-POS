const CenterContentContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-5.5 min-h-full  w-full ${className}`}>
      {children ? children : "Coming Soon."}
    </div>
  );
};

export default CenterContentContainer;
