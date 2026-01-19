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
      className={`${className} p-5 md:py-5.5 md:px-10 m-auto h-screen w-full md:px-28 md:pr-44 ${contained && "max-w-screen-2xl"}`}
    >
      {children}
    </div>
  );
};

export default CenterContentContainer;
