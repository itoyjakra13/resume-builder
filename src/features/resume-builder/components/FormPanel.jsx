import React, { useState, useEffect, memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CustomSectionsForm } from './CustomSectionsForm';
import { AtsOptimizer } from './AtsOptimizer';
import { Button } from '../../../components/Button/Button';

const TAB_ORDER = ['personal', 'experience', 'education', 'skills', 'projects', 'custom', 'ats'];

const SECTION_INFO = {
  personal: {
    title: 'Personal Information',
    description: 'Add your personal and contact information.'
  },
  experience: {
    title: 'Experience',
    description: 'Describe your professional work experience.'
  },
  education: {
    title: 'Education',
    description: 'Add your educational qualifications.'
  },
  skills: {
    title: 'Skills',
    description: 'List your technical and professional skills.'
  },
  projects: {
    title: 'Projects',
    description: 'Showcase your best projects.'
  },
  custom: {
    title: 'Certifications',
    description: 'Add relevant certifications.'
  },
  ats: {
    title: 'ATS Optimizer',
    description: 'Analyze your resume and improve ATS compatibility.'
  },
  preview: {
    title: 'Preview',
    description: 'Preview your resume before exporting.'
  }
};

export const FormPanel = memo(function FormPanel({
  errors = {},
  setErrors,
  onRequestDelete,
  activeSection = 'personal',
  onSelectSection,
}) {
  const [activeTab, setActiveTab] = useState(activeSection);
  const { resumeData, loadSampleData, handleImportJsonFile } = useResume();
  const fileInputRef = React.useRef(null);

  // Sync external section selection with internal tab state
  useEffect(() => {
    if (activeSection && activeSection !== 'preview' && activeSection !== activeTab) {
      setActiveTab(activeSection);
    }
  }, [activeSection, activeTab]);

  const isDataEmpty = !resumeData.personalInfo?.fullName?.trim() &&
    (resumeData.experience?.length === 0) &&
    (resumeData.education?.length === 0) &&
    (resumeData.skills?.length === 0) &&
    (resumeData.projects?.length === 0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImportJsonFile(file);
      e.target.value = '';
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onSelectSection) {
      onSelectSection(tabId);
    }
  };

  const handleNextTab = () => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex < TAB_ORDER.length - 1) {
      const nextTab = TAB_ORDER[currentIndex + 1];
      handleTabClick(nextTab);
    }
  };

  const handlePrevTab = () => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex > 0) {
      const prevTab = TAB_ORDER[currentIndex - 1];
      handleTabClick(prevTab);
    }
  };

  const getTabName = (id) => {
    return SECTION_INFO[id]?.title || id;
  };

  const totalErrorsCount = Object.keys(errors).length;
  const currentSection = SECTION_INFO[activeTab] || SECTION_INFO.personal;

  return (
    <div className="flex flex-col gap-4 no-print" aria-label="Resume Form Editor">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload JSON file"
      />

      {/* Contextual Section Heading (Replaces generic Resume Editor title) */}
      <div className="border-b border-slate-800 pb-3 flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-slate-100">
            {currentSection.title}
          </h2>
          <p className="text-xs text-slate-400">
            {currentSection.description}
          </p>
        </div>
        {totalErrorsCount > 0 && (
          <span className="bg-red-950/50 text-red-400 border border-red-900/50 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            {totalErrorsCount} issue{totalErrorsCount > 1 ? 's' : ''} to fix
          </span>
        )}
      </div>

      {isDataEmpty && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 animate-fade-in">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-100">Resume Builder</h3>
            <p className="text-xs text-slate-400">No content loaded yet. Choose an option to begin:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" onClick={() => handleTabClick('personal')} className="text-xs font-medium">
              Create resume
            </Button>
            <Button variant="secondary" size="sm" onClick={loadSampleData} className="text-xs font-medium">
              Load sample
            </Button>
            <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} className="text-xs font-medium">
              Import JSON
            </Button>
          </div>
        </div>
      )}

      {/* Active Section Workspace Panel with 150ms Fade Transition */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 min-h-[420px] flex flex-col justify-between animate-fade-in">
        <div className="flex-1">
          {activeTab === 'personal' && <PersonalInfoForm errors={errors} setErrors={setErrors} />}
          {activeTab === 'experience' && <ExperienceForm errors={errors} setErrors={setErrors} onRequestDelete={onRequestDelete} />}
          {activeTab === 'education' && <EducationForm errors={errors} setErrors={setErrors} onRequestDelete={onRequestDelete} />}
          {activeTab === 'skills' && <SkillsForm />}
          {activeTab === 'projects' && <ProjectsForm errors={errors} setErrors={setErrors} onRequestDelete={onRequestDelete} />}
          {activeTab === 'custom' && <CustomSectionsForm onRequestDelete={onRequestDelete} />}
          {activeTab === 'ats' && <AtsOptimizer />}
        </div>

        {/* Wizard Step Navigation */}
        <div className="flex justify-between items-center border-t border-slate-800/80 pt-4 mt-8 no-print">
          {activeTab !== 'personal' ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevTab}
              className="text-xs flex items-center gap-1 hover:bg-slate-800 font-medium"
            >
              ← Back to {getTabName(TAB_ORDER[TAB_ORDER.indexOf(activeTab) - 1])}
            </Button>
          ) : <div />}

          {activeTab !== 'ats' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleNextTab}
              className="text-xs flex items-center gap-1 font-semibold"
            >
              Continue to {getTabName(TAB_ORDER[TAB_ORDER.indexOf(activeTab) + 1])} →
            </Button>
          ) : (
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
              ✓ Ready for PDF export
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
