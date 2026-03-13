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
  
  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button
      className={`btn ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}