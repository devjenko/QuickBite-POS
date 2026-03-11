const CenterContentContainer = ({
  children,
  className,
  contained,
  sidebarLeft = false,
  sidebarRight = false,
  sidebarRightWide = false,
}: {
  children?: React.ReactNode;
  className?: string;
  contained?: boolean;
  sidebarLeft?: boolean;
  sidebarRight?: boolean;
  sidebarRightWide?: boolean;
}) => {
  const leftMargin = sidebarLeft ? "xl:ml-[var(--sidebar-left-width)]" : "";
  const rightMargin = sidebarRightWide
    ? "xl:mr-[var(--sidebar-right-wide-width)]"
    : sidebarRight
      ? "xl:mr-[var(--sidebar-right-width)]"
      : "";

  return (
    <div
      className={`p-4 md:p-8 md:pb-25 pb-25 xl:pb-8 h-screen overflow-y-auto w-full ${leftMargin} ${rightMargin} ${contained ? "max-w-screen-2xl mx-auto" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default CenterContentContainer;
