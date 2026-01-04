interface SettingItemProps {
  label: string;
  sublabel: string;
  children: React.ReactNode;
  isLast?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  label,
  sublabel,
  children,
  isLast = false,
}) => {
  return (
    <div
      className={`
      flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4
      ${!isLast ? "border-b border-gray-100" : ""}
    `}
    >
      <div className="flex-1">
        <div className="text-small font-medium text-[var(--Black)] mb-1">
          {label}
        </div>
        <div className="text-xxsmall text-gray-500">{sublabel}</div>
      </div>
      <div className="sm:ml-4 flex justify-end">{children}</div>
    </div>
  );
};

export default SettingItem;
