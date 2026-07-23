import React, { memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Input, Textarea } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { validateUrl } from '../../../utils/validation';

export const ProjectsForm = memo(function ProjectsForm({ errors = {}, setErrors }) {

  const {
    resumeData,
    addProject,
    updateProject,
    deleteProject,
    reorderProject
  } = useResume();
  const { projects = [] } = resumeData;

  const handleFieldChange = (id, field, value) => {
    if (field === 'technologies') {
      // Split comma separated list into trim array
      const arr = value.split(',').map(tag => tag.trim());
      updateProject(id, { technologies: arr });
    } else {
      updateProject(id, { [field]: value });
    }

    // URL validation using centralized helper
    if (field === 'link') {
      const urlErr = validateUrl(value);
      if (urlErr) {
        setErrors(prev => ({
          ...prev,
          [`proj-${id}`]: urlErr
        }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next[`proj-${id}`];
          return next;
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Projects ({projects.length})
        </h4>
        <Button variant="secondary" size="sm" onClick={addProject} className="text-xs">
          + Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
          No projects added yet. Click "+ Add Project" to document your creations.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 bg-slate-800/10 rounded-xl border border-slate-800 space-y-4 relative group"
            >
              {/* Reordering and Deleting Toolbar */}
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                <span className="text-xs font-bold text-indigo-400">
                  Project #{index + 1} {proj.name ? `- ${proj.name}` : ''}
                </span>
                <div className="flex items-center gap-1.5 no-print">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-slate-800"
                    disabled={index === 0}
                    onClick={() => reorderProject(index, 'up')}
                    aria-label={`Move project ${index + 1} up`}
                    title="Move Up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-slate-800"
                    disabled={index === projects.length - 1}
                    onClick={() => reorderProject(index, 'down')}
                    aria-label={`Move project ${index + 1} down`}
                    title="Move Down"
                  >
                    ↓
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="!py-1 px-2 text-xs"
                    onClick={() => {
                      deleteProject(proj.id);
                      setErrors(prev => {
                        const next = { ...prev };
                        delete next[`proj-${proj.id}`];
                        return next;
                      });
                    }}
                    aria-label={`Delete project ${index + 1}`}
                    title="Delete Entry"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {errors[`proj-${proj.id}`] && (
                <div role="alert" className="p-2 bg-red-950/40 border border-red-900 rounded-lg text-xs text-red-400">
                  {errors[`proj-${proj.id}`]}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  id={`proj-name-${proj.id}`}
                  placeholder="Portfolio Builder"
                  value={proj.name || ''}
                  onChange={(e) => handleFieldChange(proj.id, 'name', e.target.value)}
                  required
                />
                <Input
                  label="Project URL"
                  id={`proj-link-${proj.id}`}
                  placeholder="https://github.com/myusername/project"
                  value={proj.link || ''}
                  onChange={(e) => handleFieldChange(proj.id, 'link', e.target.value)}
                />
              </div>

              <Input
                label="Technologies Used (Comma-separated)"
                id={`proj-tech-${proj.id}`}
                placeholder="React, Tailwind CSS, LocalStorage"
                value={proj.technologies ? proj.technologies.join(', ') : ''}
                onChange={(e) => handleFieldChange(proj.id, 'technologies', e.target.value)}
              />

              <Textarea
                label="Description"
                id={`proj-desc-${proj.id}`}
                placeholder="Describe the problem you solved, the technical architecture, or the results..."
                value={proj.description || ''}
                onChange={(e) => handleFieldChange(proj.id, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

