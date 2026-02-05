// src/components/common/Inputs.tsx
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * INPUT PARA TEXTO
 */
export function InputText({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[#FFFCFC] font-open-sans text-xs font-bold uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <input
        type="text"
        className={`
          bg-[#1E1E1E] text-[#FFFCFC] font-open-sans font-semibold
          px-4 py-3 rounded-xl border-2 border-transparent outline-none 
          transition-all duration-200 placeholder:text-gray-600
          focus:border-[#FF8904] focus:bg-[#252525]
          disabled:opacity-40
          ${className}
        `}
        {...props}
      />
    </div>
  );
}

/**
 * INPUT PARA NÚMEROS 
 * Sin flechas, centrado y con teclado numérico.
 */
export function InputNumber({ label, className = "", ...props }: InputProps) {
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
          px-4 py-3 rounded-xl border-2 border-transparent outline-none 
          transition-all duration-200 placeholder:text-gray-600
          focus:border-[#FF8904] focus:bg-[#252525]
          disabled:opacity-40
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          ${className}
        `}
        {...props}
      />
    </div>
  );
}