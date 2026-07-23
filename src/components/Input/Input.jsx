import React from 'react';

export function Input({
  label,
  id,
  type = 'text',
  error,
  required = false,
  className = '',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  autoTrim = true,
  ...props
}) {
  const handleBlur = (e) => {
    if (autoTrim && typeof value === 'string' && onChange) {
      const trimmed = value.trim();
      if (trimmed !== value) {
        const syntheticEvent = { ...e, target: { ...e.target, value: trimmed } };
        onChange(syntheticEvent);
      }
    }
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-300 flex items-center gap-1 select-none">
          {label}
          {required && <span className="text-red-400 font-bold" title="Required field" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-3 py-2 bg-slate-800/90 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent transition-all duration-150 text-sm ${
          error ? 'border-red-500/80 focus-visible:ring-red-500' : 'border-slate-700 hover:border-slate-600'
        }`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-400 font-medium mt-0.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

export function Textarea({
  label,
  id,
  error,
  required = false,
  className = '',
  placeholder = '',
  rows = 4,
  value = '',
  onChange,
  onBlur,
  helperText,
  autoTrim = false,
  ...props
}) {
  const handleBlur = (e) => {
    if (autoTrim && typeof value === 'string' && onChange) {
      const trimmed = value.trim();
      if (trimmed !== value) {
        const syntheticEvent = { ...e, target: { ...e.target, value: trimmed } };
        onChange(syntheticEvent);
      }
    }
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-300 flex items-center gap-1 select-none">
          {label}
          {required && <span className="text-red-400 font-bold" title="Required field" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        id={id}
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={`w-full px-3 py-2 bg-slate-800/90 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent transition-all duration-150 text-sm resize-y ${
          error ? 'border-red-500/80 focus-visible:ring-red-500' : 'border-slate-700 hover:border-slate-600'
        }`}
        {...props}
      />
      {helperText && !error && (
        <span id={`${id}-helper`} className="text-[11px] text-slate-400">
          {helperText}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-400 font-medium mt-0.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

export function Select({
  label,
  id,
  options = [],
  error,
  required = false,
  className = '',
  value = '',
  onChange,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-300 flex items-center gap-1 select-none">
          {label}
          {required && <span className="text-red-400 font-bold" title="Required field" aria-hidden="true">*</span>}
        </label>
      )}
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-3 py-2 bg-slate-800/90 border rounded-lg text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent transition-all duration-150 text-sm cursor-pointer ${
          error ? 'border-red-500/80 focus-visible:ring-red-500' : 'border-slate-700 hover:border-slate-600'
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-400 font-medium mt-0.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

