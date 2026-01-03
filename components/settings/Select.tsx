export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  disabled = false,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="
        px-3 py-2 border border-gray-300 rounded-lg text-sm
        bg-white text-gray-900 cursor-pointer min-w-[150px]
        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
