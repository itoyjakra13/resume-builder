import React from 'react';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ariaLabel,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-in-out active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white focus-visible:ring-indigo-500 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 focus-visible:ring-slate-500 border border-slate-700 hover:border-slate-600',
    danger: 'bg-red-600 hover:bg-red-500 text-white focus-visible:ring-red-500 shadow-md shadow-red-600/20 hover:shadow-red-600/30',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white focus-visible:ring-emerald-500 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white focus-visible:ring-slate-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

