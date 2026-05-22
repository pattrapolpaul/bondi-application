import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  multiline?: boolean;
}

export function Input({ label, multiline = false, className = '', ...props }: InputProps) {
  const baseStyles = "w-full px-4 py-3 rounded-lg bg-white border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--bondi-orange)] transition-all";

  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm">{label}</label>}
      {multiline ? (
        <textarea
          className={`${baseStyles} min-h-[100px] ${className}`}
          {...props as InputHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <input
          className={`${baseStyles} ${className}`}
          {...props as InputHTMLAttributes<HTMLInputElement>}
        />
      )}
    </div>
  );
}
