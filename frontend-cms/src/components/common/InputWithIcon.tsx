interface InputWithIconProps {
  id: string;
  name: string;
  type?: string;
  iconClass: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label: string;
}

const InputWithIcon = ({
  id,
  name,
  type = "text",
  iconClass,
  placeholder,
  value,
  onChange,
  required = false,
  label,
}: InputWithIconProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-300 text-sm font-medium mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className={`${iconClass} text-gray-500`} />
        </div>
        <input
          type={type}
          id={id}
          name={name}
          className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
