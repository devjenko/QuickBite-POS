interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full
        transition-colors duration-300 focus:outline-none focus:ring-offset-2
        ${checked ? "bg-[var(--DarkBlue)]" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          inline-block h-[27px] w-[27px] transform rounded-full 
          bg-white shadow-md transition-transform duration-300
          ${checked ? "translate-x-[22px]" : "translate-x-[2px]"}
        `}
      />
    </button>
  );
};

export default ToggleSwitch;
