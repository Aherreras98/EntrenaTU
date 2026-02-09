import type { SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export default function Select({ 
  label, 
  options, 
  error, 
  className = "", 
  ...props 
}: SelectProps) {
  
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label className="text-text-main font-open-sans text-[11px] font-bold uppercase tracking-wider mb-1.5 ml-1 opacity-90">
          {label}
        </label>
      )}

      <div className="relative group">
        <select
          className={`
            w-full bg-surface text-text-main font-open-sans font-semibold
            px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200
            appearance-none cursor-pointer pr-10
            
            /* Estados: Error vs Normal */
            ${error 
              ? "border-danger focus:border-danger" 
              : "border-transparent focus:border-primary focus:bg-surface-hover"
            }

            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface text-text-main">
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Icono de flecha */}
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Mensaje de Error */}
      {error && (
        <p className="text-danger text-xs font-open-sans font-medium italic ml-1 mt-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}