import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputText({ label, error, type = "text", className = "", ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      
      <input
        type={type}
        className={`input-field ${error ? "error" : ""} ${className}`}
        {...props}
      />
      
      {error && <p className="input-error-msg">{error}</p>}
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