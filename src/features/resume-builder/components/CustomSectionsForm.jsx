import React, { useState, memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Input, Textarea } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';

export const CustomSectionsForm = memo(function CustomSectionsForm() {

  const {
    resumeData,
    addCustomSection,
    updateCustomSectionTitle,
    deleteCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    deleteCustomSectionItem,
    reorderCustomSectionItem
  } = useResume();
  const { customSections = [] } = resumeData;
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const handleCreateSection = (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    addCustomSection(newSectionTitle.trim());
    setNewSectionTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Create Section Form */}
      <form onSubmit={handleCreateSection} className="flex gap-2 bg-slate-800/10 p-3 rounded-xl border border-slate-800 no-print">
        <Input
          id="new-section-title"
          placeholder="New Section Title (e.g. Awards, Publications)"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          aria-label="New Custom Section Title"
        />
        <Button type="submit" variant="secondary" className="whitespace-nowrap">
          + Add Section
        </Button>
      </form>

      {customSections.length === 0 ? (
        <div className="text-center py-6 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl">
          No custom sections created yet. Add one above to display certifications, publications, or volunteer experience!
        </div>
      ) : (
        <div className="space-y-8">
          {customSections.map((section) => (
            <div key={section.id} className="p-4 bg-slate-800/5 border border-slate-800/80 rounded-xl space-y-4 relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-full sm:max-w-xs">
                  <Input
                    id={`sec-title-${section.id}`}
                    label="Section Title"
                    value={section.sectionTitle}
                    onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2 self-end sm:self-auto no-print">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addCustomSectionItem(section.id)}
                    className="text-xs"
                  >
                    + Add Item
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteCustomSection(section.id)}
                    className="text-xs"
                  >
                    Remove Section
                  </Button>
                </div>
              </div>

              {/* Items List */}
              {section.items.length === 0 ? (
                <div className="text-center py-4 text-slate-600 text-xs italic">
                  No items in this section. Click "+ Add Item" to add entries.
                </div>
              ) : (
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-800/20 rounded-lg border border-slate-800/60 space-y-3 relative group"
                    >
                      {/* Reordering/Deleting Toolbar */}
                      <div className="flex justify-between items-center border-b border-slate-800/30 pb-2">
                        <span className="text-[11px] font-bold text-slate-400">
                          Entry #{index + 1}
                        </span>
                        <div className="flex items-center gap-1 no-print">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0.5 hover:bg-slate-800 text-xs"
                            disabled={index === 0}
                            onClick={() => reorderCustomSectionItem(section.id, index, 'up')}
                            ariaLabel={`Move entry ${index + 1} up`}
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0.5 hover:bg-slate-800 text-xs"
                            disabled={index === section.items.length - 1}
                            onClick={() => reorderCustomSectionItem(section.id, index, 'down')}
                            ariaLabel={`Move entry ${index + 1} down`}
                          >
                            ↓
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="!py-0.5 px-1.5 text-[10px]"
                            onClick={() => deleteCustomSectionItem(section.id, item.id)}
                            ariaLabel={`Delete entry ${index + 1}`}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          label="Title / Award / Cert"
                          id={`item-title-${item.id}`}
                          placeholder="e.g. AWS Certification"
                          value={item.title || ''}
                          onChange={(e) => updateCustomSectionItem(section.id, item.id, { title: e.target.value })}
                          required
                        />
                        <Input
                          label="Subtitle / Institution"
                          id={`item-subtitle-${item.id}`}
                          placeholder="e.g. Amazon Web Services"
                          value={item.subtitle || ''}
                          onChange={(e) => updateCustomSectionItem(section.id, item.id, { subtitle: e.target.value })}
                        />
                        <Input
                          label="Date / Period"
                          id={`item-date-${item.id}`}
                          placeholder="e.g. June 2024 or 2023 - 2024"
                          value={item.date || ''}
                          onChange={(e) => updateCustomSectionItem(section.id, item.id, { date: e.target.value })}
                        />
                      </div>

                      <Textarea
                        label="Description"
                        id={`item-desc-${item.id}`}
                        rows={2}
                        placeholder="Description of the item..."
                        value={item.description || ''}
                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { description: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

