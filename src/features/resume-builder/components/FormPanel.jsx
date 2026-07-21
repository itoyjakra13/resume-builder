import React, { useState } from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CustomSectionsForm } from './CustomSectionsForm';
import { AtsOptimizer } from './AtsOptimizer';
import { Button } from '../../../components/Button/Button';

export function FormPanel({ errors, setErrors }) {
  const [activeTab, setActiveTab] = useState('personal');

  const tabOrder = ['personal', 'experience', 'education', 'skills', 'projects', 'custom', 'ats'];

  const tabs = [
    { id: 'personal', name: 'Personal', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'experience', name: 'Experience', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'education', name: 'Education', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    )},
    { id: 'skills', name: 'Skills', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )},
    { id: 'projects', name: 'Projects', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )},
    { id: 'custom', name: 'Custom', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'ats', name: 'ATS Scan', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )}
  ];

  const handleNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      const nextTab = tabOrder[currentIndex + 1];
      setActiveTab(nextTab);
      setTimeout(() => {
        document.getElementById(`tab-btn-${nextTab}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 50);
    }
  };

  const handlePrevTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      const prevTab = tabOrder[currentIndex - 1];
      setActiveTab(prevTab);
      setTimeout(() => {
        document.getElementById(`tab-btn-${prevTab}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 50);
    }
  };

  const getTabName = (id) => {
    const found = tabs.find(t => t.id === id);
    return found ? found.name : '';
  };

  return (
    <div className="flex flex-col gap-4 no-print" aria-label="Resume Form Editor">
      {/* Horizontal Scrollable Tabs Navigation Bar with subtle styling indicator */}
      <div 
        className="w-full overflow-x-auto tabs-scroll border-b border-slate-800 flex gap-2 pb-2.5 whitespace-nowrap scroll-smooth" 
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border-b-2 focus:outline-none ${
              activeTab === tab.id
                ? 'bg-indigo-950/40 text-indigo-400 border-indigo-500 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Active Tab Panel with Wizard Footer Navigation */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 min-h-[400px] flex flex-col justify-between">
        <div className="flex-1">
          <div id="panel-personal" role="tabpanel" aria-labelledby="tab-btn-personal" hidden={activeTab !== 'personal'}>
            {activeTab === 'personal' && <PersonalInfoForm errors={errors} setErrors={setErrors} />}
          </div>
          <div id="panel-experience" role="tabpanel" aria-labelledby="tab-btn-experience" hidden={activeTab !== 'experience'}>
            {activeTab === 'experience' && <ExperienceForm errors={errors} setErrors={setErrors} />}
          </div>
          <div id="panel-education" role="tabpanel" aria-labelledby="tab-btn-education" hidden={activeTab !== 'education'}>
            {activeTab === 'education' && <EducationForm errors={errors} setErrors={setErrors} />}
          </div>
          <div id="panel-skills" role="tabpanel" aria-labelledby="tab-btn-skills" hidden={activeTab !== 'skills'}>
            {activeTab === 'skills' && <SkillsForm />}
          </div>
          <div id="panel-projects" role="tabpanel" aria-labelledby="tab-btn-projects" hidden={activeTab !== 'projects'}>
            {activeTab === 'projects' && <ProjectsForm errors={errors} setErrors={setErrors} />}
          </div>
          <div id="panel-custom" role="tabpanel" aria-labelledby="tab-btn-custom" hidden={activeTab !== 'custom'}>
            {activeTab === 'custom' && <CustomSectionsForm />}
          </div>
          <div id="panel-ats" role="tabpanel" aria-labelledby="tab-btn-ats" hidden={activeTab !== 'ats'}>
            {activeTab === 'ats' && <AtsOptimizer />}
          </div>
        </div>

        {/* Dynamic Wizard Footer Navigation */}
        <div className="flex justify-between items-center border-t border-slate-800/80 pt-4 mt-8 no-print">
          {activeTab !== 'personal' ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevTab}
              className="text-xs flex items-center gap-1 hover:bg-slate-800"
            >
              ← Back to {getTabName(tabOrder[tabOrder.indexOf(activeTab) - 1])}
            </Button>
          ) : <div />}

          {activeTab !== 'ats' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleNextTab}
              className="text-xs flex items-center gap-1 shadow-md shadow-indigo-600/10 font-bold"
            >
              Continue to {getTabName(tabOrder[tabOrder.indexOf(activeTab) + 1])} →
            </Button>
          ) : (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-pulse">
              ✓ Ready for PDF export!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
