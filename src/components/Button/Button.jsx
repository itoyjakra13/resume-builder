import React from 'react';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  ariaLabel,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 ease-in-out active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white focus-visible:ring-indigo-500 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-100 focus-visible:ring-slate-500 border border-slate-700 hover:border-slate-600',
    danger: 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white focus-visible:ring-red-500 shadow-md shadow-red-600/20 hover:shadow-red-600/30',
    success: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white focus-visible:ring-emerald-500 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30',
    ghost: 'bg-transparent hover:bg-slate-800 active:bg-slate-850 text-slate-300 hover:text-white focus-visible:ring-slate-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5'
  };

  const isBtnDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={isBtnDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={isLoading ? 'true' : undefined}
      {...props}
    >
      {isLoading && (
        <svg className="w-4 h-4 animate-spin text-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

