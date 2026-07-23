import React, { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';

export function AboutModal({ isOpen, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in no-print"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-dialog-title"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              CV
            </div>
            <div>
              <h2 id="about-dialog-title" className="text-base font-bold text-slate-100 leading-none">
                CV-Craft
              </h2>
              <span className="text-xs text-slate-400 font-mono">Version 1.0.0</span>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Details */}
        <div className="space-y-4 text-xs text-slate-300">
          <p className="text-slate-400 text-xs leading-relaxed">
            Client-side resume builder designed for privacy, ATS optimization, and instant PDF export.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Tech Stack</span>
              <div className="flex flex-wrap gap-1 text-slate-200 font-medium text-[11px]">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">React</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">Vite</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">Tailwind</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">JavaScript</span>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Developer</span>
              <p className="font-semibold text-slate-200 text-xs">Arkajyoti Rakshit</p>
              <span className="text-[10px] text-slate-400 block">Educational Project</span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
