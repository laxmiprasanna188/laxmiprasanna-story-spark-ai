import { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

interface SSInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  error?: FieldError;
  autoComplete?: string;
  autoFocus?: boolean;
}

const SSInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon,
  register,
  validation,
  error,
  autoComplete,
  autoFocus,
}: SSInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full max-w-full flex flex-col box-border">
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 text-left"
      >
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative w-full max-w-full flex items-center box-border">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
            <i className={icon}></i>
          </span>
        )}

      <input
  type={inputType}
  id={name}
  className={`w-full box-border pl-6 sm:pl-8 pr-8 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base 
    text-slate-100 placeholder-slate-500
    bg-slate-700/40 border border-slate-600/50 rounded-xl
    transition-all duration-200 ${
      error
        ? "border-2 border-red-500 focus:outline-none"
        : "focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 focus:outline-none"
    }`}
  placeholder={placeholder}
  autoComplete={autoComplete}
  autoFocus={autoFocus}
  {...register(name, validation)}
/>
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors duration-150"
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            <i className={showPassword ? "fi fi-rr-eye" : "fi fi-rr-eye-crossed"}></i>
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-rose-500 mt-1.5 text-left w-full break-words">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SSInput;
