
import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputField({ 
  label, 
  error, 
  name, 
  className = "", 
  type = "text", 
  ...props 
}: InputFieldProps) {
  
  const isNumber = type === "number";

  return (
    <div className="flex flex-col w-full">
      {/* Label: Estilo #FFFCFC */}
      <label 
        htmlFor={name} 
        className="text-[#FFFCFC] font-open-sans text-[11px] font-bold uppercase tracking-wider mb-1.5 ml-1 opacity-90"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}

        // inputMode type="number"
        inputMode={isNumber ? "numeric" : props.inputMode}
        className={`
          w-full bg-[#1E1E1E] text-[#FFFCFC] font-open-sans px-4 py-3 rounded-xl border-2 
          outline-none transition-all duration-200 placeholder:text-gray-600
          
          /* Estética según tipo: Si es número, centramos y quitamos flechas */
          ${isNumber 
            ? "text-center font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
            : "text-left font-semibold"
          }
          
          /* Colores de estado: Naranja para foco, Rojo para error */
          ${error 
            ? "border-red-500 focus:border-red-500" 
            : "border-transparent focus:border-[#FF8904] focus:bg-[#252525]"
          }
          
          ${className}
        `}
        {...props}
      />

      {/* Contenedor de Error */}
      <div className="mt-1 h-5 ml-1">
        {error && (
          <p className="text-red-500 text-xs font-open-sans font-medium italic animate-in fade-in duration-300">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}