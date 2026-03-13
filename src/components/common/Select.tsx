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
      {label && (
        <label className="text-text-muted font-open-sans text-[11px] font-bold uppercase tracking-[0.15em] mb-2 ml-1">
          {label}
        </label>
      )}

      <div className="relative group">
        <select
          className={`
            w-full font-open-sans font-semibold
            px-4 py-3.5 rounded-xl border outline-none transition-all duration-300
            appearance-none cursor-pointer pr-10
            
            /* Fondos y Textos adaptativos */
            bg-background text-text-main
            
            ${error 
              ? "border-red-500 focus:border-red-500" 
              : "border-zinc-200 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/10"
            }
            
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            /* bg-surface para que el desplegable sea blanco */
            <option key={option.value} value={option.value} className="bg-surface text-text-main">
              {option.label}
            </option>
          ))}
        </select>

        {/* El icono ahora usa el color primary (naranja) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-primary">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      <div className="mt-1 min-h-[1.25rem] ml-1">
        {error && (
          <p className="text-red-500 text-xs font-open-sans font-medium italic">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}