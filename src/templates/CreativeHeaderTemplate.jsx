import React, { memo } from 'react';

const NAME_SIZE_MAP = {
  small: 'text-2xl md:text-3xl',
  medium: 'text-3xl md:text-4xl',
  large: 'text-4xl md:text-5xl'
};

const SUBTITLE_SIZE_MAP = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg'
};

const SECTION_HEADER_SIZE_MAP = {
  small: 'text-[10px]',
  medium: 'text-xs',
  large: 'text-sm'
};

const BODY_SIZE_MAP = {
  small: 'text-[11px]',
  medium: 'text-xs',
  large: 'text-sm'
};

const BODY_BOLD_SIZE_MAP = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base'
};

const SUB_SIZE_MAP = {
  small: 'text-[9px]',
  medium: 'text-[10px]',
  large: 'text-[11px]'
};

const NEGATIVE_MARGIN_HEADER_MAP = {
  ultra: '-mx-[8mm] -mt-[6mm]',
  compact: '-mx-[12mm] -mt-[10mm]',
  normal: '-mx-[16mm] -mt-[14mm]',
  wide: '-mx-[22mm] -mt-[20mm]'
};

const sectionHeaderSizeMap = SECTION_HEADER_SIZE_MAP;
const bodyBoldSizeMap = BODY_BOLD_SIZE_MAP;
const bodySizeMap = BODY_SIZE_MAP;
const subSizeMap = SUB_SIZE_MAP;


export const CreativeHeaderTemplate = memo(function CreativeHeaderTemplate({ data = {}, metadata = {} }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = data;
  const { themeColor = '#4f46e5', fontSize = 'medium', pageMargins = 'normal' } = metadata;
  const headerMarginClass = NEGATIVE_MARGIN_HEADER_MAP[pageMargins] || NEGATIVE_MARGIN_HEADER_MAP.normal;

  return (
    <div className={`w-full text-slate-800 ${BODY_SIZE_MAP[fontSize] || BODY_SIZE_MAP.medium} leading-relaxed`}>

      {/* Creative Header layout: Top banner spans full page with solid background */}
      <div className={`${headerMarginClass} mb-6 p-6 text-white text-left flex flex-row justify-between items-center gap-4`} style={{ backgroundColor: themeColor }}>
        <div className="flex flex-row items-center gap-4">
          {personalInfo.avatar && (
            <img
              src={personalInfo.avatar}
              alt={personalInfo.fullName || 'Profile avatar'}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-sm flex-shrink-0"
            />
          )}
          <div>
            <h1 className={`font-extrabold ${NAME_SIZE_MAP[fontSize]} tracking-tight leading-none`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className={`font-medium opacity-90 ${SUBTITLE_SIZE_MAP[fontSize]}`}>
              {personalInfo.jobTitle || 'Your Professional Title'}
            </p>
          </div>
        </div>

        {/* Contact info grid inside header banner */}
        <div className={`flex flex-col items-end gap-1.5 opacity-90 ${subSizeMap[fontSize]} text-slate-100`}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">
              🔗 {personalInfo.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      </div>

      {/* Main content - Two Columns */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left column (Experience, Projects) */}
        <div className="col-span-8 space-y-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="space-y-2">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Career Summary
              </h2>
              <p className={`text-slate-600 text-justify ${bodySizeMap[fontSize]}`}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Work History
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="print-avoid-break space-y-1">
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <h3 className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{exp.role}</h3>
                        <p className={`font-semibold text-slate-500 ${bodySizeMap[fontSize]}`}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                      </div>
                      <span className={`text-slate-400 font-bold uppercase ${subSizeMap[fontSize]}`}>
                        {exp.startDate ? exp.startDate.replace('-', '/') : ''} - {exp.current ? 'Present' : exp.endDate ? exp.endDate.replace('-', '/') : ''}
                      </span>
                    </div>
                    {exp.description && (
                      <p className={`text-slate-600 whitespace-pre-line leading-relaxed ${bodySizeMap[fontSize]}`}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="print-avoid-break space-y-0.5">
                    <div className="flex justify-between items-baseline gap-4">
                      <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                        {proj.link ? (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            {proj.name}
                          </a>
                        ) : proj.name}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className={`text-indigo-600 font-semibold font-mono ${subSizeMap[fontSize]}`}>
                          {proj.technologies.join(', ')}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className={`text-slate-600 leading-normal ${bodySizeMap[fontSize]}`}>{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column (Skills, Education, Custom) */}
        <div className="col-span-4 space-y-5">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap text-slate-700">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="print-avoid-break">
                    <h3 className={`font-bold text-slate-900 ${bodySizeMap[fontSize]}`}>{edu.degree}</h3>
                    <p className={`text-slate-500 font-semibold mt-0.5 ${subSizeMap[fontSize]}`}>{edu.fieldOfStudy}</p>
                    <p className={`text-slate-400 ${subSizeMap[fontSize]}`}>{edu.institution}</p>
                    <span className={`text-slate-400 block ${subSizeMap[fontSize]}`}>
                      {edu.startDate ? edu.startDate.slice(0, 4) : ''} - {edu.endDate ? edu.endDate.slice(0, 4) : ''}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {customSections.map((section) => (
            <section key={section.id} className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                {section.sectionTitle}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="print-avoid-break space-y-1">
                    <h3 className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{item.title}</h3>
                    {item.subtitle && <p className={`text-slate-500 font-medium ${subSizeMap[fontSize]}`}>{item.subtitle}</p>}
                    {item.date && <span className={`text-slate-400 block ${subSizeMap[fontSize]}`}>{item.date}</span>}
                    {item.description && (
                      <p className={`text-slate-600 leading-relaxed whitespace-pre-line ${bodySizeMap[fontSize]}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
});

