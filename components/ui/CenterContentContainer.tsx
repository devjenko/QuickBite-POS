const CenterContentContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`py-5.5 px-10  h-[200vh] w-full ${className}`}>
      {children ? children : "Coming Soon."}
    </div>
  );
};

export default CenterContentContainer;
