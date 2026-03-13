import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endIcon?: React.ReactNode;
  id?: string;
}

export function InputText({ label, error, type = "text", className = "", endIcon, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(7)}`; 

  return (
    <div className="flex flex-col gap-1 w-full relative text-left">
      {/* Label: Vinculado al input mediante htmlFor */}
      {label && <label htmlFor={inputId} className="text-sm font-bold text-text-main transition-colors">{label}</label>}
      
      <div className="relative">
        <input
          id={inputId}
          type={type}
          className={`w-full p-2.5 rounded-xl outline-none transition-all duration-300
            bg-background text-text-main
            ${error 
                ? "border-red-500 focus:border-red-500" 
                : "border-zinc-300 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"} 
            ${className}`}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

export function InputNumber({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id || `input-num-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {/* Label adaptativo vinculado al input numérico */}
      {label && <label htmlFor={inputId} className="text-sm font-bold text-text-main transition-colors">{label}</label>}
      
      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        className={`w-full p-2.5 rounded-xl outline-none transition-all duration-300 text-center
          bg-background text-text-main appearance-none
          ${error 
            ? "border-red-500 focus:border-red-500" 
            : "border-zinc-300 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"} 
          ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}