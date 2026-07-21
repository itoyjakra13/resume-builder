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
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-300 flex items-center gap-0.5">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'
        }`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-400 mt-0.5">
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
  helperText,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-300 flex items-center gap-0.5">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        id={id}
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm resize-y ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'
        }`}
        {...props}
      />
      {helperText && !error && (
        <span id={`${id}-helper`} className="text-[11px] text-slate-400">
          {helperText}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-400 mt-0.5">
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
        <label htmlFor={id} className="text-xs font-semibold text-slate-300 flex items-center gap-0.5">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm cursor-pointer ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'
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
        <span id={`${id}-error`} role="alert" className="text-xs text-red-400 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
