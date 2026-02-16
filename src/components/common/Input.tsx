import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endIcon?: React.ReactNode;
}

export function InputText({ label, error, type = "text", className = "", endIcon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && <label className="text-sm font-bold text-gray-700">{label}</label>}
      
      <div className="relative">
        <input
          type={type}
          className={`w-full p-2 border rounded-md outline-none transition-colors 
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"} 
            ${className}`}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function InputNumber({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type="number"
        inputMode="numeric"
        className={`input-field text-center appearance-none ${error ? "error" : ""} ${className}`}
        {...props}
      />
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
}