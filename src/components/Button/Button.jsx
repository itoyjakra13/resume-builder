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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-600/25',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 focus:ring-slate-500 border border-slate-700',
    danger: 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500 shadow-lg shadow-red-600/25',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-600/25',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white focus:ring-slate-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
