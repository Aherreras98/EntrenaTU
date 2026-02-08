import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * INPUT GENÉRICO (Texto, Email, Password, etc.)
 * Permite cambiar el tipo dinamicamente mediante la prop 'type'
 */
export function InputText({ label, error, type = "text", className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[#FFFCFC] font-open-sans text-xs font-bold uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          bg-[#1E1E1E] text-[#FFFCFC] font-open-sans font-semibold
          px-4 py-3 rounded-xl border-2 outline-none 
          transition-all duration-200 placeholder:text-gray-600
          disabled:opacity-40
          
          /* 2. Lógica de estilos para error vs normal */
          ${error 
            ? "border-red-500 focus:border-red-500" 
            : "border-transparent focus:border-[#FF8904] focus:bg-[#252525]"
          }
          
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs font-open-sans font-medium italic ml-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * INPUT PARA NÚMEROS 
 * Sin flechas, centrado y con teclado numérico.
 */
export function InputNumber({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[#FFFCFC] font-open-sans text-xs font-bold uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <input
        type="number"
        inputMode="numeric"
        className={`
          bg-[#1E1E1E] text-[#FFFCFC] font-open-sans font-bold text-center
          px-4 py-3 rounded-xl border-2 outline-none 
          transition-all duration-200 placeholder:text-gray-600
          disabled:opacity-40
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          
          /* Lógica de estilos para error */
          ${error 
            ? "border-red-500 focus:border-red-500" 
            : "border-transparent focus:border-[#FF8904] focus:bg-[#252525]"
          }

          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-red-500 text-xs font-open-sans font-medium italic ml-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}