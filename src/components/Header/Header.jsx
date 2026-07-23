import React, { useRef, memo } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../Button/Button';

const TEMPLATE_OPTIONS = [
  { id: 'modern', name: 'Modern Split' },
  { id: 'minimal', name: 'Minimal Column' },
  { id: 'elegant', name: 'Elegant Serif' },
  { id: 'corporate', name: 'Corporate Classic' },
  { id: 'creative', name: 'Creative Sidebar' },
  { id: 'creativeHeader', name: 'Creative Header' }
];

export const Header = memo(function Header({ onValidateAndPrint, isExporting = false }) {
  const {
    metadata,
    updateMetadata,
    loadSampleData,
    resetData,
    saveStatus,
    handleExportJson,
    handleImportJsonFile,
  } = useResume();

  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImportJsonFile(file);
      // Reset input value so re-importing same file triggers event
      e.target.value = '';
    }
  };

  return (
    <header className="w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3.5 no-print sticky top-0 z-50">
      {/* Hidden File Input for JSON Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload JSON file"
      />

      {/* Brand Logo, Title & Save Status Indicator */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-100 flex items-center gap-2 leading-none">
              CV-Craft
              <span className="text-[9px] bg-indigo-950/80 text-indigo-400 border border-indigo-900/60 px-1.5 py-0.5 rounded-full font-semibold uppercase">
                v1.0
              </span>
            </h1>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">Client-Side Resume Builder</span>
          </div>
        </div>

        {/* LocalStorage Auto-Save Status Badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-400 select-none"
          title={saveStatus === 'saving' ? 'Persisting changes to LocalStorage...' : 'All changes saved locally in your browser'}
        >
          <span className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            saveStatus === 'saving' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
          }`} />
          <span>{saveStatus === 'saving' ? 'Saving...' : 'Saved locally'}</span>
        </div>
      </div>

      {/* Template selector tabs */}
      <div className="flex bg-slate-900/90 border border-slate-800/80 p-1 rounded-xl gap-0.5 max-w-full overflow-x-auto tabs-scroll" role="radiogroup" aria-label="Resume template selection">
        {TEMPLATE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={metadata.templateId === opt.id}
            onClick={() => updateMetadata('templateId', opt.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer ${
              metadata.templateId === opt.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>

      {/* Actions Toolbar */}
      <div className="flex items-center gap-2 flex-wrap justify-center w-full md:w-auto">
        {/* Load Mock */}
        <Button
          variant="secondary"
          size="sm"
          onClick={loadSampleData}
          title="Pre-populate with sample developer data"
          className="text-xs"
        >
          Load Mock
        </Button>

        {/* JSON Export */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportJson}
          title="Export resume data as JSON backup file"
          className="text-xs gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export JSON
        </Button>

        {/* JSON Import */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          title="Import resume from JSON backup file"
          className="text-xs gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Import JSON
        </Button>

        {/* Reset / Clear */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear all your inputs? This action will reset your resume.')) {
              resetData();
            }
          }}
          className="text-xs"
          title="Clear all fields"
        >
          Clear
        </Button>

        {/* Download PDF Trigger */}
        <Button
          variant="primary"
          size="sm"
          onClick={onValidateAndPrint}
          disabled={isExporting}
          className="gap-1.5 shadow-indigo-600/10 font-bold text-xs"
        >
          {isExporting ? (
            <>
              <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </>
          )}
        </Button>
      </div>
    </header>
  );
});


