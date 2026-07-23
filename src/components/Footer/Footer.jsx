import React, { memo } from 'react';

export const Footer = memo(function Footer({ onOpenAbout }) {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 px-4 md:px-6 py-4 text-center text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="font-bold text-slate-200">CV-Craft</span>
          <span className="text-slate-600">•</span>
          <span>Version 1.0.0</span>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span>Built with React • Tailwind CSS • Vite</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <button
            type="button"
            onClick={onOpenAbout}
            className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded px-1"
          >
            About
          </button>
        </div>

        <div className="text-slate-500 text-[11px]">
          &copy; 2026 Arkajyoti Rakshit
        </div>
      </div>
    </footer>
  );
});
