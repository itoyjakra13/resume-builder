import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { TemplateRenderer } from '../../../templates/TemplateRenderer';
import { Select } from '../../../components/Input/Input';

export function PreviewPanel() {
  const { resumeData, metadata, updateMetadata, setMetadata, addToast } = useResume();
  const [zoom, setZoom] = useState(1); // Scale multiplier
  const [showControls, setShowControls] = useState(true);

  const fontOptions = [
    { label: 'Clean Sans (Inter)', value: 'sans' },
    { label: 'Executive Serif (Lora)', value: 'serif' },
    { label: 'Developer Mono', value: 'mono' }
  ];

  const fontSizeOptions = [
    { label: 'Small Text', value: 'small' },
    { label: 'Medium Text', value: 'medium' },
    { label: 'Large Text', value: 'large' }
  ];

  const marginOptions = [
    { label: 'Compact Margins', value: 'compact' },
    { label: 'Normal Margins', value: 'normal' },
    { label: 'Wide Margins', value: 'wide' }
  ];

  const densityOptions = [
    { label: 'Compact Spacing', value: 'compact' },
    { label: 'Normal Spacing', value: 'normal' },
    { label: 'Spacious Spacing', value: 'relaxed' }
  ];

  // 12 beautiful, professionally curated design presets with varying layouts, fonts, colors, and margins
  const presets = [
    {
      id: 'tech-prof',
      name: 'Tech Professional',
      description: 'Modern split layout, cobalt accent, Inter sans-serif',
      config: {
        templateId: 'modern',
        themeColor: '#2563eb',
        fontFamily: 'sans',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'royal-exec',
      name: 'Royal Executive',
      description: 'Corporate layout, burgundy accent, Lora classical serif',
      config: {
        templateId: 'corporate',
        themeColor: '#991b1b',
        fontFamily: 'serif',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'emerald-side',
      name: 'Creative Sidebar',
      description: 'Emerald green solid sidebar column layout',
      config: {
        templateId: 'creative',
        themeColor: '#059669',
        fontFamily: 'sans',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'midnight-head',
      name: 'Creative Header',
      description: 'Indigo top banner header, double columns body',
      config: {
        templateId: 'creativeHeader',
        themeColor: '#4f46e5',
        fontFamily: 'sans',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'scholarly',
      name: 'Minimal Scholar',
      description: 'Minimal single column, scholarly serif, compact text',
      config: {
        templateId: 'minimal',
        themeColor: '#0f172a',
        fontFamily: 'serif',
        fontSize: 'small',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'clean-mono',
      name: 'Clean Mono',
      description: 'Centered minimal columns, technical monospace font',
      config: {
        templateId: 'minimal',
        themeColor: '#475569',
        fontFamily: 'mono',
        fontSize: 'small',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'academic',
      name: 'Warm Academic',
      description: 'Elegant template, amber bronze details, spacious layout',
      config: {
        templateId: 'elegant',
        themeColor: '#d97706',
        fontFamily: 'serif',
        fontSize: 'medium',
        pageMargins: 'normal',
        contentDensity: 'compact'
      }
    },
    {
      id: 'slate-corp',
      name: 'Slate Corporate',
      description: 'Traditional corporate layout, carbon slate styling',
      config: {
        templateId: 'corporate',
        themeColor: '#334155',
        fontFamily: 'sans',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'rose-crea',
      name: 'Rose Creative',
      description: 'Rose-gold sidebar template, classic serif detail',
      config: {
        templateId: 'creative',
        themeColor: '#be185d',
        fontFamily: 'serif',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'teal-exec',
      name: 'Teal Executive',
      description: 'Corporate layout, sharp teal border outlines',
      config: {
        templateId: 'corporate',
        themeColor: '#0f766e',
        fontFamily: 'sans',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'forest-acad',
      name: 'Forest Academic',
      description: 'Elegant serif, deep forest-green accents',
      config: {
        templateId: 'elegant',
        themeColor: '#15803d',
        fontFamily: 'serif',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    },
    {
      id: 'vibrant-tech',
      name: 'Vibrant Tech',
      description: 'Vibrant orange top header banner, monospace details',
      config: {
        templateId: 'creativeHeader',
        themeColor: '#ea580c',
        fontFamily: 'mono',
        fontSize: 'medium',
        pageMargins: 'compact',
        contentDensity: 'compact'
      }
    }
  ];

  const handleApplyPreset = (preset) => {
    setMetadata(prev => ({
      ...prev,
      ...preset.config
    }));
    if (addToast) {
      addToast(`Applied "${preset.name}" design preset!`, 'success', 2000);
    }
  };

  // Exact physical A4 padding values mapped in millimeters for high-fidelity rendering/printing
  const marginPaddingMap = {
    compact: '12mm',
    normal: '20mm',
    wide: '28mm'
  };

  const getFontFamilyClass = (font) => {
    switch (font) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans':
      default: return 'font-sans';
    }
  };

  // Helper to render dynamic miniature blueprint layout boxes as small visual previews
  const renderMiniBlueprint = (templateId, color) => {
    switch (templateId) {
      case 'creative':
        return (
          <div className="w-full h-11 bg-white rounded border border-slate-700/35 overflow-hidden flex gap-0.5 pointer-events-none">
            <div className="w-1/3 h-full" style={{ backgroundColor: color }} />
            <div className="flex-1 p-0.5 space-y-0.5">
              <div className="w-3/4 h-0.5 bg-slate-300 rounded" />
              <div className="w-1/2 h-0.5 bg-slate-200 rounded" />
              <div className="w-5/6 h-0.5 bg-slate-100 rounded" />
            </div>
          </div>
        );
      case 'creativeHeader':
        return (
          <div className="w-full h-11 bg-white rounded border border-slate-700/35 overflow-hidden flex flex-col gap-0.5 pointer-events-none">
            <div className="w-full h-1/3" style={{ backgroundColor: color }} />
            <div className="flex-1 p-0.5 grid grid-cols-3 gap-0.5">
              <div className="col-span-2 space-y-0.5">
                <div className="w-3/4 h-0.5 bg-slate-300 rounded" />
                <div className="w-5/6 h-0.5 bg-slate-100 rounded" />
              </div>
              <div className="space-y-0.5">
                <div className="w-full h-0.5 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        );
      case 'modern':
        return (
          <div className="w-full h-11 bg-white rounded border border-slate-700/35 overflow-hidden p-0.5 flex gap-1 pointer-events-none">
            <div className="w-1/3 space-y-0.5 border-r border-slate-100 pr-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <div className="w-full h-0.5 bg-slate-200 rounded" />
              <div className="w-3/4 h-0.5 bg-slate-100 rounded" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="w-1/2 h-0.5 bg-slate-300 rounded" />
              <div className="w-full h-0.5 bg-slate-100 rounded" />
              <div className="w-5/6 h-0.5 bg-slate-200 rounded" />
            </div>
          </div>
        );
      case 'corporate':
        return (
          <div className="w-full h-11 bg-white rounded border border-slate-700/35 overflow-hidden p-0.5 flex flex-col gap-0.5 text-center justify-between pointer-events-none">
            <div className="w-1/2 h-0.5 bg-slate-300 rounded mx-auto" />
            <div className="flex-1 space-y-0.5 text-left mt-0.5">
              <div className="flex items-center gap-0.5">
                <div className="w-0.5 h-1.5" style={{ backgroundColor: color }} />
                <div className="w-1/3 h-0.5 bg-slate-300 rounded" />
              </div>
              <div className="w-5/6 h-0.5 bg-slate-100 rounded pl-1" />
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="w-full h-11 bg-white rounded border border-slate-700/35 overflow-hidden p-0.5 flex flex-col gap-0.5 text-left pointer-events-none">
            <div className="w-2/3 h-1 bg-slate-400 rounded" />
            <div className="w-1/3 h-0.5 bg-slate-200 rounded mt-0.5" />
            <div className="flex-1 space-y-0.5 mt-0.5">
              <div className="w-full h-0.5 bg-slate-100 rounded" style={{ backgroundColor: color }} />
              <div className="w-5/6 h-0.5 bg-slate-100 rounded" />
            </div>
          </div>
        );
      case 'minimal':
      default:
        return (
          <div className="w-full h-11 bg-white rounded border border-slate-700/35 overflow-hidden p-0.5 flex flex-col gap-0.5 text-center justify-between pointer-events-none">
            <div className="space-y-0.5">
              <div className="w-1/2 h-0.5 bg-slate-300 rounded mx-auto" />
              <div className="w-2/3 h-0.5 bg-slate-100 rounded mx-auto" />
            </div>
            <div className="w-full h-0.5 bg-slate-100 rounded" />
            <div className="space-y-0.5 text-left">
              <div className="w-1/3 h-0.5 bg-slate-300 rounded" />
            </div>
          </div>
        );
    }
  };

  return (
    <section className="flex flex-col lg:sticky lg:top-6 lg:h-[calc(100vh-120px)] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl" aria-label="Resume Real-Time Preview">
      {/* Controls Bar (no-print) */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col gap-3.5 no-print">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Preview
          </h2>
          
          <div className="flex items-center gap-3.5 flex-wrap">
            {/* Zoom controls */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Zoom: {Math.round(zoom * 100)}%</span>
              <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 gap-0.5">
                <button
                  type="button"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-800 transition-colors"
                  aria-label="Zoom out"
                >
                  &minus;
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="px-1.5 h-6 rounded text-[9px] hover:bg-slate-800 transition-colors"
                  aria-label="Reset zoom"
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-800 transition-colors"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            </div>

            {/* Collapsible toggle */}
            <button
              type="button"
              onClick={() => setShowControls(!showControls)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-all flex items-center gap-1.5"
            >
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showControls ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showControls ? 'Hide Customizer' : 'Customize Design'}
            </button>
          </div>
        </div>

        {showControls && (
          <div className="space-y-4 animate-fade-in">
            {/* Preset Designs Quick-Select scroll list with Visual Miniature Blueprints */}
            <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Instant Design Presets ({presets.length})
              </label>
              <div className="flex gap-2.5 overflow-x-auto pb-1.5 tabs-scroll scroll-smooth">
                {presets.map((preset) => {
                  const isActive = metadata.templateId === preset.config.templateId && 
                                   metadata.themeColor === preset.config.themeColor &&
                                   metadata.fontFamily === preset.config.fontFamily &&
                                   metadata.fontSize === preset.config.fontSize &&
                                   metadata.pageMargins === preset.config.pageMargins;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className={`flex-shrink-0 text-left p-2 rounded-xl border text-xs transition-all w-36 focus:outline-none flex flex-col justify-between ${
                        isActive
                          ? 'bg-indigo-950/30 border-indigo-500 shadow-md shadow-indigo-600/5'
                          : 'bg-slate-900/50 border-slate-800/60 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                      title={preset.description}
                    >
                      {/* Small Blueprint Visual Mockup */}
                      {renderMiniBlueprint(preset.config.templateId, preset.config.themeColor)}
                      
                      <div className="mt-1.5">
                        <div className="font-bold flex items-center gap-1">
                          <span className={`truncate text-[10px] ${isActive ? 'text-indigo-400' : 'text-slate-200'}`}>
                            {preset.name}
                          </span>
                        </div>
                        <p className="text-[8px] text-slate-500 truncate leading-tight">
                          {preset.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Individual Layout Tweakers */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
              <div className="flex flex-col gap-1">
                <label htmlFor="theme-color" className="text-[10px] uppercase font-bold text-slate-400">
                  Accent Color
                </label>
                <div className="flex items-center gap-2 h-9 w-full bg-slate-800 px-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <input
                    id="theme-color"
                    type="color"
                    value={metadata.themeColor || '#3b82f6'}
                    onChange={(e) => updateMetadata('themeColor', e.target.value)}
                    className="w-6 h-6 border-0 rounded cursor-pointer bg-transparent"
                    aria-label="Accent theme color"
                  />
                  <span className="text-xs text-slate-300 font-mono select-all">
                    {metadata.themeColor || '#3b82f6'}
                  </span>
                </div>
              </div>

              <Select
                id="preview-font"
                label="Typography"
                options={fontOptions}
                value={metadata.fontFamily || 'sans'}
                onChange={(e) => updateMetadata('fontFamily', e.target.value)}
                className="!gap-1 text-[10px] uppercase font-bold text-slate-400"
              />

              <Select
                id="preview-fontSize"
                label="Text Scale"
                options={fontSizeOptions}
                value={metadata.fontSize || 'medium'}
                onChange={(e) => updateMetadata('fontSize', e.target.value)}
                className="!gap-1 text-[10px] uppercase font-bold text-slate-400"
              />

              <Select
                id="preview-margins"
                label="Layout Margins"
                options={marginOptions}
                value={metadata.pageMargins || 'normal'}
                onChange={(e) => updateMetadata('pageMargins', e.target.value)}
                className="!gap-1 text-[10px] uppercase font-bold text-slate-400"
              />

              <Select
                id="preview-density"
                label="Spacing Density"
                options={densityOptions}
                value={metadata.contentDensity || 'normal'}
                onChange={(e) => updateMetadata('contentDensity', e.target.value)}
                className="!gap-1 text-[10px] uppercase font-bold text-slate-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Paper View Container */}
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-950 flex justify-center items-start scroll-smooth">
        <div
          className="print-container transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            width: '100%',
            maxWidth: '210mm', // standard A4 width
          }}
        >
          {/* Simulated A4 Page */}
          <div
            className={`w-full bg-white text-slate-800 shadow-2xl border border-slate-300 min-h-[297mm] text-left transition-all ${getFontFamilyClass(metadata.fontFamily)} density-${metadata.contentDensity || 'normal'}`}
            style={{ padding: marginPaddingMap[metadata.pageMargins] || '20mm' }}
          >
            <TemplateRenderer data={resumeData} metadata={metadata} />
          </div>
        </div>
      </div>
    </section>
  );
}
