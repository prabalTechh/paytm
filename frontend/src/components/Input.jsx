/* eslint-disable react/prop-types */
const Input = ({
  
  label,
  onChange,
  placeholder,
  type,
  name,
  value,
  required = false
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label 
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded-lg py-2 px-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                 placeholder:text-gray-400"
      />
    </div>
  );
};

export default Input;