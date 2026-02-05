import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: ButtonProps) {
  
  
  // Tipografía 'font-open-sans'
  const baseStyles = "font-open-sans font-bold px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center hover:cursor-pointer text-[#FFFCFC]";

  const variants = {
    primary: `
      bg-[#FF8904] 
      hover:bg-[#FFB86A] 
      active:bg-[#CA3500] 
      disabled:bg-[#FFD6A7] 
      disabled:cursor-not-allowed
    `,
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}