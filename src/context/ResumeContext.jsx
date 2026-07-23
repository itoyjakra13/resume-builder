import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_RESUME_DATA, DEFAULT_METADATA, SAMPLE_RESUME_DATA } from '../constants/mockData';
import { exportToJson, importFromJson } from '../utils/dataExporter';

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData, resumeSaveStatus] = useLocalStorage('resume_builder_data', DEFAULT_RESUME_DATA);
  const [metadata, setMetadata, metadataSaveStatus] = useLocalStorage('resume_builder_metadata', DEFAULT_METADATA);
  const [toasts, setToasts] = useState([]);

  // Combined auto-save status indicator
  const saveStatus = resumeSaveStatus === 'saving' || metadataSaveStatus === 'saving' ? 'saving' : 'saved';

  // Toast System
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // General Metadata Actions
  const updateMetadata = useCallback((field, value) => {
    setMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, [setMetadata]);

  // Personal Info Actions
  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  }, [setResumeData]);

  // Generic Array CRUD & Reorder Helpers
  const addArrayItem = useCallback((key, defaultItem, itemName = 'Item') => {
    setResumeData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { ...defaultItem, id: crypto.randomUUID() }],
    }));
    addToast(`Added new ${itemName} entry`, 'success', 2000);
  }, [setResumeData, addToast]);

  const updateArrayItem = useCallback((key, id, data) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  }, [setResumeData]);

  const deleteArrayItem = useCallback((key, id, itemName = 'Item') => {
    setResumeData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((item) => item.id !== id),
    }));
    addToast(`Removed ${itemName} entry`, 'info', 2000);
  }, [setResumeData, addToast]);

  const reorderArrayItem = useCallback((key, index, direction) => {
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
  }, [setResumeData]);

  // Experience Actions
  const addExperience = useCallback(() => addArrayItem('experience', {
    company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: ''
  }, 'Work Experience'), [addArrayItem]);

  const updateExperience = useCallback((id, data) => updateArrayItem('experience', id, data), [updateArrayItem]);
  const deleteExperience = useCallback((id) => deleteArrayItem('experience', id, 'Work Experience'), [deleteArrayItem]);
  const reorderExperience = useCallback((index, direction) => reorderArrayItem('experience', index, direction), [reorderArrayItem]);

  // Education Actions
  const addEducation = useCallback(() => addArrayItem('education', {
    institution: '', degree: '', fieldOfStudy: '', location: '', startDate: '', endDate: '', grade: ''
  }, 'Education'), [addArrayItem]);

  const updateEducation = useCallback((id, data) => updateArrayItem('education', id, data), [updateArrayItem]);
  const deleteEducation = useCallback((id) => deleteArrayItem('education', id, 'Education'), [deleteArrayItem]);
  const reorderEducation = useCallback((index, direction) => reorderArrayItem('education', index, direction), [reorderArrayItem]);

  // Skills Actions
  const addSkill = useCallback((skillObj = null) => {
    const item = skillObj || { name: '', level: 3, category: '' };
    addArrayItem('skills', item, 'Skill');
  }, [addArrayItem]);

  const updateSkill = useCallback((id, data) => updateArrayItem('skills', id, data), [updateArrayItem]);
  const deleteSkill = useCallback((id) => deleteArrayItem('skills', id, 'Skill'), [deleteArrayItem]);
  const reorderSkill = useCallback((index, direction) => reorderArrayItem('skills', index, direction), [reorderArrayItem]);

  // Projects Actions
  const addProject = useCallback(() => addArrayItem('projects', { name: '', description: '', technologies: [], link: '' }, 'Project'), [addArrayItem]);
  const updateProject = useCallback((id, data) => updateArrayItem('projects', id, data), [updateArrayItem]);
  const deleteProject = useCallback((id) => deleteArrayItem('projects', id, 'Project'), [deleteArrayItem]);
  const reorderProject = useCallback((index, direction) => reorderArrayItem('projects', index, direction), [reorderArrayItem]);

  // Custom Sections Actions
  const addCustomSection = useCallback((sectionTitle) => {
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
  }, [setResumeData, addToast]);

  const updateCustomSectionTitle = useCallback((sectionId, sectionTitle) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) =>
        sec.id === sectionId ? { ...sec, sectionTitle } : sec
      )
    }));
  }, [setResumeData]);

  const deleteCustomSection = useCallback((sectionId) => {
    setResumeData((prev) => {
      const section = (prev.customSections || []).find(s => s.id === sectionId);
      const title = section ? section.sectionTitle : 'Custom Section';
      addToast(`Removed section "${title}"`, 'info', 2500);
      return {
        ...prev,
        customSections: (prev.customSections || []).filter((sec) => sec.id !== sectionId)
      };
    });
  }, [setResumeData, addToast]);

  const addCustomSectionItem = useCallback((sectionId) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) => {
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
  }, [setResumeData]);

  const updateCustomSectionItem = useCallback((sectionId, itemId, data) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) =>
            item.id === itemId ? { ...item, ...data } : item
          )
        };
      })
    }));
  }, [setResumeData]);

  const deleteCustomSectionItem = useCallback((sectionId, itemId) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== itemId)
        };
      })
    }));
    addToast('Removed entry from custom section', 'info', 2000);
  }, [setResumeData, addToast]);

  const reorderCustomSectionItem = useCallback((sectionId, index, direction) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) => {
        if (sec.id !== sectionId) return sec;
        const items = [...sec.items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= items.length) return sec;
        
        [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
        return { ...sec, items };
      })
    }));
  }, [setResumeData]);

  // JSON Import & Export handlers
  const handleExportJson = useCallback(() => {
    exportToJson(
      resumeData,
      metadata,
      (msg) => addToast(msg, 'success', 3000),
      (err) => addToast(err, 'error', 4000)
    );
  }, [resumeData, metadata, addToast]);

  const handleImportJsonFile = useCallback((file) => {
    importFromJson(
      file,
      (importedResume, importedMeta) => {
        setResumeData(importedResume);
        if (importedMeta && Object.keys(importedMeta).length > 0) {
          setMetadata((prev) => ({ ...prev, ...importedMeta }));
        }
        addToast('Resume data imported successfully!', 'success', 3000);
      },
      (errorMsg) => {
        addToast(errorMsg, 'error', 4000);
      }
    );
  }, [setResumeData, setMetadata, addToast]);

  // Utilities
  const loadSampleData = useCallback(() => {
    setResumeData(SAMPLE_RESUME_DATA);
    setMetadata(DEFAULT_METADATA);
    addToast('Mock profile loaded successfully!', 'success');
  }, [setResumeData, setMetadata, addToast]);

  const resetData = useCallback(() => {
    setResumeData(DEFAULT_RESUME_DATA);
    setMetadata(DEFAULT_METADATA);
    addToast('Resume data cleared.', 'info');
  }, [setResumeData, setMetadata, addToast]);

  const safeResumeData = useMemo(() => ({
    ...DEFAULT_RESUME_DATA,
    ...(resumeData || {}),
    personalInfo: {
      ...DEFAULT_RESUME_DATA.personalInfo,
      ...(resumeData?.personalInfo || {})
    },
    experience: Array.isArray(resumeData?.experience) ? resumeData.experience : [],
    education: Array.isArray(resumeData?.education) ? resumeData.education : [],
    skills: Array.isArray(resumeData?.skills) ? resumeData.skills : [],
    projects: Array.isArray(resumeData?.projects) ? resumeData.projects : [],
    customSections: Array.isArray(resumeData?.customSections) ? resumeData.customSections : [],
  }), [resumeData]);

  const safeMetadata = useMemo(() => ({
    ...DEFAULT_METADATA,
    ...(metadata || {}),
    templateId: metadata?.templateId || 'modern',
    themeColor: metadata?.themeColor || '#2563eb',
    fontFamily: metadata?.fontFamily || 'sans',
    fontSize: metadata?.fontSize || 'medium',
    pageMargins: metadata?.pageMargins || 'compact',
    contentDensity: metadata?.contentDensity || 'compact',
  }), [metadata]);


  const value = useMemo(() => ({
    resumeData: safeResumeData,
    metadata: safeMetadata,
    saveStatus,
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
    // JSON Import/Export
    handleExportJson,
    handleImportJsonFile,
    // Controls
    loadSampleData,
    resetData,
  }), [
    safeResumeData,
    safeMetadata,
    saveStatus,

    setMetadata,
    setResumeData,
    toasts,
    addToast,
    removeToast,
    updateMetadata,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    reorderEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    reorderSkill,
    addProject,
    updateProject,
    deleteProject,
    reorderProject,
    addCustomSection,
    updateCustomSectionTitle,
    deleteCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    deleteCustomSectionItem,
    reorderCustomSectionItem,
    handleExportJson,
    handleImportJsonFile,
    loadSampleData,
    resetData,
  ]);

  return (
    <ResumeContext.Provider value={value}>
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

