import React, { useState, useEffect, useRef, memo } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../Button/Button';

const NAV_SECTIONS = [
  { id: 'personal', name: 'Personal' },
  { id: 'experience', name: 'Experience' },
  { id: 'education', name: 'Education' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'custom', name: 'Certifications' },
  { id: 'ats', name: 'ATS' },
  { id: 'preview', name: 'Preview' },
];

const TEMPLATE_OPTIONS = [
  { id: 'modern', name: 'Modern Split' },
  { id: 'minimal', name: 'Minimal Column' },
  { id: 'elegant', name: 'Elegant Serif' },
  { id: 'corporate', name: 'Corporate Classic' },
  { id: 'creative', name: 'Creative Sidebar' },
  { id: 'creativeHeader', name: 'Creative Header' }
];

export const Header = memo(function Header({
  activeSection = 'personal',
  onSelectSection,
  onValidateAndPrint,
  isExporting = false,
  exportProgressText = '',
  onRequestReset,
  onOpenAbout,
}) {
  const {
    metadata,
    updateMetadata,
    loadSampleData,
    saveStatus,
    handleExportJson,
    handleImportJsonFile,
  } = useResume();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const fileInputRef = useRef(null);
  const overflowRef = useRef(null);

  // Close overflow menu on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overflowRef.current && !overflowRef.current.contains(e.target)) {
        setIsOverflowOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOverflowOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImportJsonFile(file);
      e.target.value = '';
    }
  };

  const handleSectionClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (onSelectSection) {
      onSelectSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 no-print transition-colors duration-150">
      {/* Hidden File Input for JSON Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload JSON file"
      />

      <div className="w-full px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Mobile Toggle (Pinned Top-Left) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => handleSectionClick('personal')}>
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-slate-100 tracking-tight">CV-Craft</span>
              <span className="text-[10px] text-slate-500 font-mono">v1.0.0</span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Application Section Links (Centered) */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-xl">
          <nav className="flex items-center gap-0.5 bg-slate-900/80 border border-slate-800/80 p-1 rounded-lg w-full justify-center" aria-label="Editor sections">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSectionClick(sec.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {sec.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Save Status, Primary Export PDF & Overflow Menu (Pinned Top-Right) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* LocalStorage Auto-Save Status Badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400 select-none transition-all duration-150"
            title={saveStatus === 'saving' ? 'Persisting changes to LocalStorage...' : 'All changes saved locally in your browser'}
            role="status"
            aria-live="polite"
          >
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
              saveStatus === 'saving' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
            }`} />
            <span className="hidden md:inline">{saveStatus === 'saving' ? 'Saving...' : 'Saved locally'}</span>
          </div>

          {/* Download PDF Primary Action */}
          <Button
            variant="primary"
            size="sm"
            onClick={onValidateAndPrint}
            disabled={isExporting}
            isLoading={isExporting}
            className="font-medium text-xs gap-1.5"
          >
            {isExporting ? (
              <span>{exportProgressText || 'Exporting...'}</span>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export PDF</span>
              </>
            )}
          </Button>

          {/* Secondary Actions Overflow Menu */}
          <div className="relative" ref={overflowRef}>
            <button
              type="button"
              onClick={() => setIsOverflowOpen(!isOverflowOpen)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              aria-label="More options"
              aria-expanded={isOverflowOpen}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {/* Overflow Dropdown Popup */}
            {isOverflowOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-slate-900 border border-slate-800 rounded-xl p-1.5 shadow-xl space-y-1 z-50 text-xs">
                {/* Template Selector Submenu */}
                <div className="px-2 py-1 space-y-1">
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Template</span>
                  <div className="grid grid-cols-2 gap-1">
                    {TEMPLATE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          updateMetadata('templateId', opt.id);
                          setIsOverflowOpen(false);
                        }}
                        className={`px-2 py-1 rounded text-[11px] text-left truncate font-medium transition-colors ${
                          metadata.templateId === opt.id
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800 my-1" />

                {/* Secondary Actions */}
                <button
                  type="button"
                  onClick={() => {
                    loadSampleData();
                    setIsOverflowOpen(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>Load sample data</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleExportJson();
                    setIsOverflowOpen(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>Export JSON backup</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setIsOverflowOpen(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>Import JSON backup</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenAbout();
                    setIsOverflowOpen(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>About CV-Craft</span>
                </button>

                <div className="border-t border-slate-800 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    onRequestReset();
                    setIsOverflowOpen(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md text-left text-red-400 hover:bg-red-950/40 flex items-center justify-between transition-colors font-medium"
                >
                  <span>Clear data</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-800 bg-slate-950 p-3 space-y-1 text-xs">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider px-2 block mb-1">Sections</span>
          <div className="grid grid-cols-2 gap-1">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSectionClick(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
});
