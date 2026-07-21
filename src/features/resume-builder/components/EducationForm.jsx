import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Input } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { validateDateRange } from '../../../utils/validation';

export function EducationForm({ errors, setErrors }) {
  const {
    resumeData,
    addEducation,
    updateEducation,
    deleteEducation,
    reorderEducation
  } = useResume();
  const { education = [] } = resumeData;

  const handleFieldChange = (id, field, value) => {
    updateEducation(id, { [field]: value });

    // Validate date relationships: startDate <= endDate using centralized helper
    if (field === 'startDate' || field === 'endDate') {
      const edu = education.find(e => e.id === id);
      const start = field === 'startDate' ? value : edu.startDate;
      const end = field === 'endDate' ? value : edu.endDate;

      const dateErr = validateDateRange(start, end, false);
      if (dateErr) {
        setErrors(prev => ({
          ...prev,
          [`edu-${id}`]: dateErr
        }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next[`edu-${id}`];
          return next;
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Education Entries ({education.length})
        </h4>
        <Button variant="secondary" size="sm" onClick={addEducation} className="text-xs">
          + Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
          No education entries added yet. Click "+ Add Education" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 bg-slate-800/10 rounded-xl border border-slate-800 space-y-4 relative group"
            >
              {/* Reordering and Deleting Toolbar */}
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                <span className="text-xs font-bold text-indigo-400">
                  Education #{index + 1} {edu.institution ? `- ${edu.institution}` : ''}
                </span>
                <div className="flex items-center gap-1.5 no-print">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-slate-800"
                    disabled={index === 0}
                    onClick={() => reorderEducation(index, 'up')}
                    aria-label={`Move education ${index + 1} up`}
                    title="Move Up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-slate-800"
                    disabled={index === education.length - 1}
                    onClick={() => reorderEducation(index, 'down')}
                    aria-label={`Move education ${index + 1} down`}
                    title="Move Down"
                  >
                    ↓
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="!py-1 px-2 text-xs"
                    onClick={() => {
                      deleteEducation(edu.id);
                      setErrors(prev => {
                        const next = { ...prev };
                        delete next[`edu-${edu.id}`];
                        return next;
                      });
                    }}
                    aria-label={`Delete education ${index + 1}`}
                    title="Delete Entry"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {errors[`edu-${edu.id}`] && (
                <div role="alert" className="p-2 bg-red-950/40 border border-red-900 rounded-lg text-xs text-red-400">
                  {errors[`edu-${edu.id}`]}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="School / University"
                  id={`institution-${edu.id}`}
                  placeholder="Harvard University"
                  value={edu.institution || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'institution', e.target.value)}
                  required
                />
                <Input
                  label="Degree / Certificate"
                  id={`degree-${edu.id}`}
                  placeholder="Bachelor of Science"
                  value={edu.degree || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'degree', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Field of Study"
                  id={`fieldOfStudy-${edu.id}`}
                  placeholder="Computer Science"
                  value={edu.fieldOfStudy || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'fieldOfStudy', e.target.value)}
                />
                <Input
                  label="Location"
                  id={`edu-location-${edu.id}`}
                  placeholder="Boston, MA"
                  value={edu.location || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'location', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Start Date"
                  id={`edu-startDate-${edu.id}`}
                  type="month"
                  value={edu.startDate || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'startDate', e.target.value)}
                  required
                />
                <Input
                  label="End Date (or expected)"
                  id={`edu-endDate-${edu.id}`}
                  type="month"
                  value={edu.endDate || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'endDate', e.target.value)}
                  required
                />
                <Input
                  label="Grade / GPA / Honors"
                  id={`grade-${edu.id}`}
                  placeholder="3.8 / 4.0 or Magna Cum Laude"
                  value={edu.grade || ''}
                  onChange={(e) => handleFieldChange(edu.id, 'grade', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
