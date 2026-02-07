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
        <label className="text-[#FFFCFC] font-open-sans text-[11px] font-bold uppercase tracking-wider mb-1.5 ml-1 opacity-90">
          {label}
        </label>
      )}

      <div className="relative group">
        <select
          className={`
            w-full bg-[#1E1E1E] text-[#FFFCFC] font-open-sans font-semibold
            px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200
            appearance-none cursor-pointer pr-10
            
            /* Colores: Naranja para foco, Rojo para error */
            ${error 
              ? "border-red-500 focus:border-red-500" 
              : "border-transparent focus:border-[#FF8904] focus:bg-[#252525]"
            }
            
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1E1E1E]">
              {option.label}
            </option>
          ))}
        </select>

        {/* Icono de flecha */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#FF8904]">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Espacio para el error */}
      <div className="mt-1 h-5 ml-1">
        {error && (
          <p className="text-red-500 text-xs font-open-sans font-medium italic">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}