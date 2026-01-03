const CenterContentContainer = ({
  children,
  className,
  contained,
}: {
  children?: React.ReactNode;
  className?: string;
  contained?: boolean;
}) => {
  return (
    <div
      className={`${className} py-5.5 px-10 m-auto  min-h-screen w-full md:px-28 md:pr-44 ${contained && "max-w-screen-2xl"}`}
    >
      {children}
    </div>
  );
};

export default CenterContentContainer;
