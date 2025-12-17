const CenterContentContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`py-5.5 px-10  min-h-screen w-full md:mr-77.5 ${className}`}
    >
      {children ? children : "Coming Soon."}
    </div>
  );
};

export default CenterContentContainer;
