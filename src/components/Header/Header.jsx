import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../Button/Button';

export function Header({ onValidateAndPrint }) {
  const { metadata, updateMetadata, loadSampleData, resetData } = useResume();

  const templateOptions = [
    { id: 'modern', name: 'Modern Split' },
    { id: 'minimal', name: 'Minimal Column' },
    { id: 'elegant', name: 'Elegant Serif' },
    { id: 'corporate', name: 'Corporate Classic' },
    { id: 'creative', name: 'Creative Sidebar' },
    { id: 'creativeHeader', name: 'Creative Header' }
  ];

  return (
    <header className="w-full bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5 leading-none">
            CV-Craft
            <span className="text-[9px] bg-indigo-950 text-indigo-400 border border-indigo-900 px-1.5 py-0.5 rounded-full font-semibold uppercase">
              v1.0 (Client)
            </span>
          </h1>
          <span className="text-[10px] text-slate-500 font-medium">Responsive Client-Side Resume Builder</span>
        </div>
      </div>

      {/* Template selector buttons */}
      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-0.5" role="radiogroup" aria-label="Template selection">
        {templateOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={metadata.templateId === opt.id}
            onClick={() => updateMetadata('templateId', opt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              metadata.templateId === opt.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>

      {/* Actions Toolbar */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Mock Pre-populator */}
        <Button
          variant="secondary"
          size="sm"
          onClick={loadSampleData}
          title="Pre-populate with sample developer data to inspect templates"
        >
          Load Mock
        </Button>

        {/* Reset */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear all your inputs? This cannot be undone.')) {
              resetData();
            }
          }}
          className="text-xs"
        >
          Clear
        </Button>

        {/* Download PDF Trigger */}
        <Button
          variant="primary"
          size="sm"
          onClick={onValidateAndPrint}
          className="gap-1.5 shadow-indigo-600/10 font-bold"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export PDF
        </Button>
      </div>
    </header>
  );
}
