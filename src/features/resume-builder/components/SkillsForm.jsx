import React, { memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Input, Select } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { isDuplicateSkill } from '../../../utils/validation';

const SKILL_LEVELS = [
  { label: 'Beginner (1/5)', value: 1 },
  { label: 'Novice (2/5)', value: 2 },
  { label: 'Intermediate (3/5)', value: 3 },
  { label: 'Advanced (4/5)', value: 4 },
  { label: 'Expert (5/5)', value: 5 }
];

export const SkillsForm = memo(function SkillsForm() {
  const {
    resumeData,
    addSkill,
    updateSkill,
    deleteSkill,
    reorderSkill,
    addToast
  } = useResume();
  const { skills = [] } = resumeData;


  const handleNameChange = (id, newName) => {
    if (isDuplicateSkill(skills, newName, id)) {
      addToast(`Skill "${newName.trim()}" is already listed!`, 'error', 2500);
      return;
    }
    updateSkill(id, { name: newName });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Skills ({skills.length})
        </h4>
        <Button variant="secondary" size="sm" onClick={() => addSkill()} className="text-xs">
          + Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
          No skills added yet. Click "+ Add Skill" to start cataloging your expertise.
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-3 bg-slate-800/10 rounded-xl border border-slate-800 relative group"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  id={`skill-name-${skill.id}`}
                  placeholder="Skill (e.g. React)"
                  value={skill.name || ''}
                  onChange={(e) => handleNameChange(skill.id, e.target.value)}
                  aria-label="Skill Name"
                  required
                />
                
                <Input
                  id={`skill-cat-${skill.id}`}
                  placeholder="Category (e.g. Frontend)"
                  value={skill.category || ''}
                  onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                  aria-label="Skill Category"
                />

                <Select
                  id={`skill-level-${skill.id}`}
                  options={SKILL_LEVELS}
                  value={skill.level || 3}
                  onChange={(e) => updateSkill(skill.id, { level: Number(e.target.value) })}
                  aria-label="Proficiency Level"
                />
              </div>

              {/* Toolbar controls */}
              <div className="flex items-center justify-end gap-1 border-t md:border-t-0 border-slate-800/60 pt-2 md:pt-0 no-print">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-slate-800"
                  disabled={index === 0}
                  onClick={() => reorderSkill(index, 'up')}
                  ariaLabel={`Move skill ${index + 1} up`}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-slate-800"
                  disabled={index === skills.length - 1}
                  onClick={() => reorderSkill(index, 'down')}
                  ariaLabel={`Move skill ${index + 1} down`}
                >
                  ↓
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="!p-1.5"
                  onClick={() => deleteSkill(skill.id)}
                  ariaLabel={`Delete skill ${index + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});


