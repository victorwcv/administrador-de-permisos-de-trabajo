import { useState } from "react";
import { icons } from "../assets/icons/IconProvider";

interface CustomInputProps {
  type?: "email" | "password" | "text" | "date" | "number" | "time";
  as?: "input" | "textarea" | "select" | "datalist";
  options?: string[];
  label?: string;
  placeholder?: string;
  name: string;
  register?: any;
  errors?: any;
  inputStyle?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function CustomInput({
  type = "text",
  as = "input",
  options = [],
  label = "",
  placeholder = "",
  name,
  register,
  errors = {},
  inputStyle = "",
  onBlur = () => {},
  value,
  onChange = () => {},
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleInputType = () => {
    setShowPassword(!showPassword);
  };

  if (as === "datalist") {
    return (
      <div className="relative mb-4">
        <label htmlFor={name} className="block ml-1">
          {label}
        </label>
        <input
          value={value}
          id={name}
          list={`options-${name}`}
          {...register}
          placeholder={placeholder}
          className={`block w-full px-3 py-2 border ${inputStyle} ${
            errors[name] ? "border-red-500" : "dark:border-space-400"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:dark:border-transparent resize-none`}

        />
        <datalist id={`options-${name}`}>
          {options.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>
    );
  }

  if (as === "textarea") {
    return (
      <div className="relative mb-4">
        <label htmlFor={name} className="block ml-1">
          {label}
        </label>
        <textarea
          id={name}
          {...register}
          placeholder={placeholder}
          className={`block w-full px-3 py-2 border ${inputStyle} ${
            errors[name] ? "border-red-500" : "dark:border-space-400"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:dark:border-transparent resize-none`}
        />
      </div>
    );
  }

  if (as === "select") {
    return (
      <div className="relative mb-4">
        <label htmlFor={name} className="block ml-1">
          {label}
        </label>
        <select
          onChange={onChange}
          value={value}
          id={name}
          {...register}
          className={`block w-full min-w-52 px-3 py-2 border ${inputStyle} ${
            errors[name] ? "border-red-500" : "dark:border-space-400"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:dark:border-transparent`}
        >
          <option value={""}>-- Seleccione --</option>
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        {errors[name] && (
          <p className="absolute -bottom-5 right-2 text-xs text-red-500">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative mb-4">
      <label htmlFor={name} className="block ml-1">
        {label}
      </label>
      <div className="relative">
        {type === "password" && (
          <button
            type="button"
            aria-label="toggle password visibility"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={toggleInputType}
          >
            {showPassword ? <icons.eye /> : <icons.eyeSlash />}
          </button>
        )}
        <input
          id={name}
          type={showPassword ? "text" : type}
          {...register}
          placeholder={placeholder}
          className={`block w-full min-w-52 h-11 px-3 py-2 border ${inputStyle} ${
            errors[name] ? "border-red-500" : "dark:border-space-400"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:dark:border-transparent`}
          onBlur={onBlur}
          value={value}
        />
      </div>

      {errors[name] && (
        <p className="absolute -bottom-5 right-2 text-xs text-red-500">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}

export default CustomInput;
