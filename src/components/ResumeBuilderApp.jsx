import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { AboutModal } from './Modal/AboutModal';
import { ConfirmModal } from './Modal/ConfirmModal';
import { FormPanel } from '../features/resume-builder/components/FormPanel';
import { PreviewPanel } from '../features/resume-builder/components/PreviewPanel';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { validateEmail, validateUrl, validateDateRange, validateRequired } from '../utils/validation';

const FONT_STYLE_MAP = {
  serif: 'font-serif',
  mono: 'font-mono',
  sans: 'font-sans'
};

const MARGIN_PADDING_MAP = {
  ultra: '6mm 8mm',
  compact: '10mm 12mm',
  normal: '14mm 16mm',
  wide: '20mm 22mm'
};

export function ResumeBuilderApp() {
  const { resumeData, metadata, toasts, addToast, removeToast, resetData } = useResume();
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview' (responsive controls)
  const [activeSection, setActiveSection] = useState('personal'); // Active section for nav toolbar & scroll spy
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgressText, setExportProgressText] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);

  // Section selection handler
  const handleSelectSection = (sectionId) => {
    if (sectionId === 'preview') {
      setActiveTab('preview');
      setActiveSection('preview');
      document.getElementById('preview-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setActiveTab('edit');
      setActiveSection(sectionId);
      setTimeout(() => {
        const target = document.getElementById('editor-panel');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const handleRequestDelete = (config) => {
    setConfirmConfig(config);
  };

  const handleRequestReset = () => {
    setConfirmConfig({
      title: 'Reset Resume Data?',
      message: 'Are you sure you want to clear all your inputs? This action will restore empty fields and cannot be undone.',
      confirmLabel: 'Clear All Data',
      variant: 'danger',
      onConfirm: () => {
        resetData();
        setErrors({});
      }
    });
  };

  const handleValidateAndPrint = () => {
    if (isExporting) return;

    const nextErrors = {};
    const { personalInfo, experience = [], education = [] } = resumeData;

    // 1. Personal Info validations
    const nameErr = validateRequired(personalInfo?.fullName, 'Full Name');
    if (nameErr) nextErrors.fullName = nameErr;

    const titleErr = validateRequired(personalInfo?.jobTitle, 'Job Title');
    if (titleErr) nextErrors.jobTitle = titleErr;

    const emailErr = validateEmail(personalInfo?.email);
    if (emailErr) nextErrors.email = emailErr;

    const webErr = validateUrl(personalInfo?.website);
    if (webErr) nextErrors.website = webErr;

    // 2. Relational Date validations (Experience)
    experience.forEach((exp) => {
      const dateErr = validateDateRange(exp.startDate, exp.endDate, exp.current);
      if (dateErr) nextErrors[`exp-${exp.id}`] = dateErr;
    });

    // 3. Relational Date validations (Education)
    education.forEach((edu) => {
      const dateErr = validateDateRange(edu.startDate, edu.endDate, false);
      if (dateErr) nextErrors[`edu-${edu.id}`] = dateErr;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      addToast('Validation errors found. Please review highlighted fields.', 'error', 4000);
      setActiveTab('edit');
      return;
    }

    // Clear errors and run printer with multi-stage progress feedback
    setErrors({});
    setIsExporting(true);
    setExportProgressText('Preparing PDF...');
    addToast('Preparing PDF...', 'info', 2000);

    const originalTitle = document.title;
    const rawName = personalInfo?.fullName?.trim() || '';
    const pdfFilename = rawName ? `${rawName.replace(/\s+/g, '_')}_Resume` : 'Resume';

    setTimeout(() => {
      setExportProgressText('Rendering PDF...');
    }, 250);

    setTimeout(() => {
      try {
        document.title = pdfFilename;
        window.print();
        addToast('Resume exported successfully.', 'success', 3000);
      } catch (err) {
        console.error('Print failed:', err);
        addToast('Unable to complete action. Please try again.', 'error', 4000);
      } finally {
        document.title = originalTitle;
        setIsExporting(false);
        setExportProgressText('');
      }
    }, 600);
  };

  const totalErrorsCount = Object.keys(errors).length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Modals */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      {confirmConfig && (
        <ConfirmModal
          isOpen={Boolean(confirmConfig)}
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmLabel={confirmConfig.confirmLabel || 'Delete'}
          variant={confirmConfig.variant || 'danger'}
          onConfirm={() => {
            if (confirmConfig.onConfirm) confirmConfig.onConfirm();
            setConfirmConfig(null);
          }}
          onCancel={() => setConfirmConfig(null)}
        />
      )}

      {/* Screen UI Wrapper - Hidden on print */}
      <div className="no-print flex flex-col min-h-screen">
        {/* Sticky Professional Application Header Navigation Bar */}
        <Header
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          onValidateAndPrint={handleValidateAndPrint}
          isExporting={isExporting}
          exportProgressText={exportProgressText}
          onRequestReset={handleRequestReset}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

        {/* Main Content Layout Grid */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full p-4 md:p-6 gap-6">
          {/* Left Form Editor Column */}
          <div
            role="tabpanel"
            id="editor-panel"
            aria-labelledby="tab-edit"
            hidden={activeTab !== 'edit' && window.innerWidth < 1024}
            className={`lg:col-span-5 space-y-4 pb-24 lg:pb-6 scroll-mt-24 ${
              activeTab === 'edit' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <FormPanel
                errors={errors}
                setErrors={setErrors}
                onRequestDelete={handleRequestDelete}
                activeSection={activeSection}
                onSelectSection={handleSelectSection}
              />
            </div>
          </div>

          {/* Right Live Preview Column */}
          <div
            role="tabpanel"
            id="preview-panel"
            aria-labelledby="tab-preview"
            hidden={activeTab !== 'preview' && window.innerWidth < 1024}
            className={`lg:col-span-7 scroll-mt-24 ${
              activeTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <PreviewPanel />
          </div>
        </main>

        {/* Mobile Sticky Navigation Tabs */}
        <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-slate-950/95 border-t border-slate-800 p-3 flex gap-3 z-40 backdrop-blur-md" aria-label="Mobile Navigation">
          <button
            id="tab-edit"
            type="button"
            role="tab"
            aria-selected={activeTab === 'edit'}
            aria-controls="editor-panel"
            onClick={() => handleSelectSection('personal')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'edit'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit details
            {totalErrorsCount > 0 && (
              <span className="w-4 h-4 bg-red-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-bounce">
                {totalErrorsCount}
              </span>
            )}
          </button>
          <button
            id="tab-preview"
            type="button"
            role="tab"
            aria-selected={activeTab === 'preview'}
            aria-controls="preview-panel"
            onClick={() => handleSelectSection('preview')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live Preview
          </button>
        </nav>

        {/* Application Footer */}
        <Footer onOpenAbout={() => setIsAboutOpen(true)} />
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full no-print" role="region" aria-label="Notifications">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`px-4 py-3 rounded-xl border shadow-xl flex items-center justify-between gap-3 text-sm animate-fade-in transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-400 border-emerald-900/60'
                : toast.type === 'error'
                ? 'bg-red-950/90 text-red-400 border-red-900/60'
                : 'bg-slate-900/90 text-slate-300 border-slate-800'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors ml-2 font-bold focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-500 rounded p-0.5"
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Print-Only Template Renderer - Hidden on screen, visible on print */}
      <div className="print-only w-full min-h-[297mm] flex flex-col">
        <div
          className={`w-full flex-1 flex flex-col bg-white text-slate-800 text-left min-h-[297mm] box-border transition-all ${FONT_STYLE_MAP[metadata.fontFamily] || 'font-sans'} density-${metadata.contentDensity || 'normal'}`}
          style={{ padding: MARGIN_PADDING_MAP[metadata.pageMargins] || '20mm' }}
        >
          <TemplateRenderer data={resumeData} metadata={metadata} />
        </div>
      </div>
    </div>
  );
}
