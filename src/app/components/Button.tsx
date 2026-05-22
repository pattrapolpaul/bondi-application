import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "w-full h-[52px] rounded-2xl font-semibold transition-all duration-200 active:scale-[0.97]";
  const variants = {
    primary: "text-white hover:opacity-95 hover:-translate-y-0.5 shadow-lg shadow-[#FF6B35]/30",
    ghost: "bg-white/60 backdrop-blur-sm text-[var(--foreground)] border border-white/80 hover:bg-white/80 shadow-sm"
  };

  const primaryStyle = variant === 'primary' ? {
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
  } : {};

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={primaryStyle}
      {...props}
    >
      {children}
    </button>
  );
}
