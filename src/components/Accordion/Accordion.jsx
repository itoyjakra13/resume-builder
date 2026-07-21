import React from 'react';

export function Accordion({
  title,
  icon,
  isOpen,
  onToggle,
  id,
  children,
  className = '',
}) {
  const contentId = `${id}-content`;
  const headerId = `${id}-header`;

  return (
    <div className={`border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden transition-all duration-200 ${className} ${isOpen ? 'ring-1 ring-indigo-500/50 border-slate-700/50' : ''}`}>
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors focus:outline-none focus:bg-slate-800/60"
        >
          <span className="flex items-center gap-3 font-semibold text-slate-200 text-sm md:text-base">
            {icon && <span className="text-indigo-400 w-5 h-5 flex items-center justify-center" aria-hidden="true">{icon}</span>}
            {title}
          </span>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-indigo-400' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        className={`px-5 pb-5 pt-1 border-t border-slate-800/60 bg-slate-900/30 transition-all ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
