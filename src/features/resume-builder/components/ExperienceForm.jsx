import React, { memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Input, Textarea } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { validateDateRange } from '../../../utils/validation';

export const ExperienceForm = memo(function ExperienceForm({ errors = {}, setErrors, onRequestDelete }) {

  const {
    resumeData,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperience
  } = useResume();
  const { experience = [] } = resumeData;

  const handleDelete = (exp) => {
    if (onRequestDelete) {
      onRequestDelete({
        id: exp.id,
        title: 'Delete Work Experience?',
        message: `Are you sure you want to delete "${exp.role || exp.company || 'this experience entry'}"? This action cannot be undone.`,
        onConfirm: () => {
          deleteExperience(exp.id);
          setErrors(prev => {
            const next = { ...prev };
            delete next[`exp-${exp.id}`];
            return next;
          });
        }
      });
    } else {
      deleteExperience(exp.id);
      setErrors(prev => {
        const next = { ...prev };
        delete next[`exp-${exp.id}`];
        return next;
      });
    }
  };

  const handleFieldChange = (id, field, value) => {
    updateExperience(id, { [field]: value });

    // Validate date relationships: startDate <= endDate using centralized helper
    if (field === 'startDate' || field === 'endDate') {
      const exp = experience.find(e => e.id === id);
      const start = field === 'startDate' ? value : exp.startDate;
      const end = field === 'endDate' ? value : exp.endDate;
      const current = exp.current;

      const dateErr = validateDateRange(start, end, current);
      if (dateErr) {
        setErrors(prev => ({
          ...prev,
          [`exp-${id}`]: dateErr
        }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next[`exp-${id}`];
          return next;
        });
      }
    }
  };

  const handleCurrentChange = (id, isCurrent) => {
    updateExperience(id, { current: isCurrent, endDate: isCurrent ? '' : '' });
    // Clear date errors if marked current
    setErrors(prev => {
      const next = { ...prev };
      delete next[`exp-${id}`];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Work Experience Entries ({experience.length})
        </h4>
        <Button variant="secondary" size="sm" onClick={addExperience} className="text-xs">
          + Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
          No experience entries added yet. Click "+ Add Experience" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 bg-slate-800/10 rounded-xl border border-slate-800 space-y-4 relative group"
            >
              {/* Reordering and Deleting Toolbar */}
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                <span className="text-xs font-bold text-indigo-400">
                  Position #{index + 1} {exp.role ? `- ${exp.role}` : ''}
                </span>
                <div className="flex items-center gap-1.5 no-print">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-slate-800"
                    disabled={index === 0}
                    onClick={() => reorderExperience(index, 'up')}
                    aria-label={`Move position ${index + 1} up`}
                    title="Move Up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-slate-800"
                    disabled={index === experience.length - 1}
                    onClick={() => reorderExperience(index, 'down')}
                    aria-label={`Move position ${index + 1} down`}
                    title="Move Down"
                  >
                    ↓
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="!py-1 px-2 text-xs"
                    onClick={() => handleDelete(exp)}
                    aria-label={`Delete position ${index + 1}`}
                    title="Delete Entry"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {errors[`exp-${exp.id}`] && (
                <div role="alert" className="p-2 bg-red-950/40 border border-red-900 rounded-lg text-xs text-red-400">
                  {errors[`exp-${exp.id}`]}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  id={`company-${exp.id}`}
                  placeholder="Acme Corp"
                  value={exp.company || ''}
                  onChange={(e) => handleFieldChange(exp.id, 'company', e.target.value)}
                  required
                />
                <Input
                  label="Job Title / Role"
                  id={`role-${exp.id}`}
                  placeholder="Software Engineer"
                  value={exp.role || ''}
                  onChange={(e) => handleFieldChange(exp.id, 'role', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  id={`location-${exp.id}`}
                  placeholder="New York, NY or Remote"
                  value={exp.location || ''}
                  onChange={(e) => handleFieldChange(exp.id, 'location', e.target.value)}
                />
                <div className="flex items-end h-full pb-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current || false}
                      onChange={(e) => handleCurrentChange(exp.id, e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-sm font-semibold text-slate-300">I currently work here</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  id={`startDate-${exp.id}`}
                  type="month"
                  value={exp.startDate || ''}
                  onChange={(e) => handleFieldChange(exp.id, 'startDate', e.target.value)}
                  required
                />
                {!exp.current && (
                  <Input
                    label="End Date"
                    id={`endDate-${exp.id}`}
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => handleFieldChange(exp.id, 'endDate', e.target.value)}
                    required
                  />
                )}
              </div>

              <Textarea
                label="Role Description & Achievements"
                id={`description-${exp.id}`}
                placeholder="• Bullet points describing responsibilities, projects and outcomes..."
                value={exp.description || ''}
                onChange={(e) => handleFieldChange(exp.id, 'description', e.target.value)}
                helperText="Tip: Use bullet points (•) and action verbs to highlight key metrics."
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

