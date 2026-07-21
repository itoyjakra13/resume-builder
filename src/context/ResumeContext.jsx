import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_RESUME_DATA, DEFAULT_METADATA, SAMPLE_RESUME_DATA } from '../constants/mockData';

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useLocalStorage('resume_builder_data', DEFAULT_RESUME_DATA);
  const [metadata, setMetadata] = useLocalStorage('resume_builder_metadata', DEFAULT_METADATA);
  const [toasts, setToasts] = useState([]);

  // Toast System
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // General Metadata Actions
  const updateMetadata = (field, value) => {
    setMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Personal Info Actions
  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Generic Array CRUD & Reorder Helpers
  const addArrayItem = (key, defaultItem, itemName = 'Item') => {
    setResumeData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { ...defaultItem, id: crypto.randomUUID() }],
    }));
    addToast(`Added new ${itemName} entry`, 'success', 2000);
  };

  const updateArrayItem = (key, id, data) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteArrayItem = (key, id, itemName = 'Item') => {
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((item) => item.id !== id),
    }));
    addToast(`Removed ${itemName} entry`, 'info', 2000);
  };

  const reorderArrayItem = (key, index, direction) => {
    setResumeData((prev) => {
      const items = [...(prev[key] || [])];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (targetIndex < 0 || targetIndex >= items.length) return prev;

      // Swap
      [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
      return {
        ...prev,
        [key]: items,
      };
    });
  };

  // Experience Actions
  const addExperience = () => addArrayItem('experience', {
    company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: ''
  }, 'Work Experience');
  const updateExperience = (id, data) => updateArrayItem('experience', id, data);
  const deleteExperience = (id) => deleteArrayItem('experience', id, 'Work Experience');
  const reorderExperience = (index, direction) => reorderArrayItem('experience', index, direction);

  // Education Actions
  const addEducation = () => addArrayItem('education', {
    institution: '', degree: '', fieldOfStudy: '', location: '', startDate: '', endDate: '', grade: ''
  }, 'Education');
  const updateEducation = (id, data) => updateArrayItem('education', id, data);
  const deleteEducation = (id) => deleteArrayItem('education', id, 'Education');
  const reorderEducation = (index, direction) => reorderArrayItem('education', index, direction);

  // Skills Actions
  const addSkill = () => addArrayItem('skills', { name: '', level: 3, category: '' }, 'Skill');
  const updateSkill = (id, data) => updateArrayItem('skills', id, data);
  const deleteSkill = (id) => deleteArrayItem('skills', id, 'Skill');
  const reorderSkill = (index, direction) => reorderArrayItem('skills', index, direction);

  // Projects Actions
  const addProject = () => addArrayItem('projects', { name: '', description: '', technologies: [], link: '' }, 'Project');
  const updateProject = (id, data) => updateArrayItem('projects', id, data);
  const deleteProject = (id) => deleteArrayItem('projects', id, 'Project');
  const reorderProject = (index, direction) => reorderArrayItem('projects', index, direction);

  // Custom Sections Actions
  const addCustomSection = (sectionTitle) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: [
        ...(prev.customSections || []),
        {
          id: crypto.randomUUID(),
          sectionTitle: sectionTitle || 'Custom Section',
          items: []
        }
      ]
    }));
    addToast(`Created custom section "${sectionTitle}"`, 'success', 2500);
  };

  const updateCustomSectionTitle = (sectionId, sectionTitle) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId ? { ...sec, sectionTitle } : sec
      )
    }));
  };

  const deleteCustomSection = (sectionId) => {
    setResumeData((prev) => {
      const section = prev.customSections.find(s => s.id === sectionId);
      const title = section ? section.sectionTitle : 'Custom Section';
      addToast(`Removed section "${title}"`, 'info', 2500);
      return {
        ...prev,
        customSections: prev.customSections.filter((sec) => sec.id !== sectionId)
      };
    });
  };

  const addCustomSectionItem = (sectionId) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: [
            ...sec.items,
            {
              id: crypto.randomUUID(),
              title: '',
              subtitle: '',
              date: '',
              description: ''
            }
          ]
        };
      })
    }));
  };

  const updateCustomSectionItem = (sectionId, itemId, data) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) =>
            item.id === itemId ? { ...item, ...data } : item
          )
        };
      })
    }));
  };

  const deleteCustomSectionItem = (sectionId, itemId) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== itemId)
        };
      })
    }));
    addToast('Removed entry from custom section', 'info', 2000);
  };

  const reorderCustomSectionItem = (sectionId, index, direction) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        const items = [...sec.items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= items.length) return sec;
        
        [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
        return { ...sec, items };
      })
    }));
  };

  // Utilities
  const loadSampleData = () => {
    setResumeData(SAMPLE_RESUME_DATA);
    setMetadata(DEFAULT_METADATA);
    addToast('Mock profile loaded successfully!', 'success');
  };

  const resetData = () => {
    setResumeData(DEFAULT_RESUME_DATA);
    setMetadata(DEFAULT_METADATA);
    addToast('Resume cleared.', 'info');
  };

  const importData = (importedResume, importedMeta) => {
    if (importedResume) setResumeData(importedResume);
    if (importedMeta) setMetadata(importedMeta);
    addToast('Resume imported successfully!', 'success');
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        metadata,
        setMetadata,
        setResumeData,
        toasts,
        addToast,
        removeToast,
        updateMetadata,
        updatePersonalInfo,
        // Experience
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperience,
        // Education
        addEducation,
        updateEducation,
        deleteEducation,
        reorderEducation,
        // Skills
        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkill,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        reorderProject,
        // Custom Sections
        addCustomSection,
        updateCustomSectionTitle,
        deleteCustomSection,
        addCustomSectionItem,
        updateCustomSectionItem,
        deleteCustomSectionItem,
        reorderCustomSectionItem,
        // Controls
        loadSampleData,
        resetData,
        importData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
