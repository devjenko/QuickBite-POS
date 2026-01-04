interface UserModeOptionProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const UserModeOption: React.FC<UserModeOptionProps> = ({
  title,
  description,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 border-2 rounded-sm mb-3 last:mb-0 cursor-pointer transition-all
        
        ${isActive ? "border-[var(--LightBlue)] bg-[var(--White)] " : "border-[var(--LightGrey)] bg-[var(--White)]"}
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-base font-semibold text-[var(--Black)]">
          {title}
        </div>
        <div
          className={`
          w-5 h-5 rounded-full border-2 relative shrink-0
          ${isActive ? "border-[var(--LightBlue)]" : "border-gray-300"}
        `}
        >
          {isActive && (
            <div className="absolute w-2.5 h-2.5 bg-[var(--LightBlue)] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
      <div className="text-[13px] text-gray-500 leading-relaxed">
        {description}
      </div>
    </div>
  );
};

export default UserModeOption;
