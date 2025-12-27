const CenterContentContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} py-5.5 px-10 m-auto  min-h-screen w-full md:px-28 md:pr-44`}
    >
      {children}
    </div>
  );
};

export default CenterContentContainer;
