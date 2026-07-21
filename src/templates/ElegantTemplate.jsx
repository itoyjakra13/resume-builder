import React from 'react';

export function ElegantTemplate({ data, metadata }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = data;
  const { themeColor, fontSize = 'medium' } = metadata;

  // Dynamic proportional font scaling mappings
  const nameSizeMap = {
    small: 'text-xl md:text-2xl',
    medium: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl'
  };

  const subtitleSizeMap = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const sectionHeaderSizeMap = {
    small: 'text-[10px]',
    medium: 'text-xs',
    large: 'text-sm'
  };

  const bodyBoldSizeMap = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const bodySizeMap = {
    small: 'text-[11px]',
    medium: 'text-xs',
    large: 'text-sm'
  };

  const subSizeMap = {
    small: 'text-[9px]',
    medium: 'text-[10px]',
    large: 'text-[11px]'
  };

  return (
    <div className={`w-full text-slate-800 ${bodySizeMap[fontSize]} leading-relaxed`}>
      {/* Header Banner - Classical serif layout with center-left name */}
      <header className="border-b pb-4 mb-5 text-left flex items-center gap-4">
        {personalInfo.avatar && (
          <img
            src={personalInfo.avatar}
            alt="Profile avatar"
            className="w-16 h-16 rounded-full object-cover border border-slate-200/60 shadow-sm flex-shrink-0"
          />
        )}
        <div>
          <h1 className={`italic font-bold ${nameSizeMap[fontSize]} text-slate-900 leading-tight`}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className={`uppercase tracking-widest text-slate-500 mt-1 ${subtitleSizeMap[fontSize]}`}>
            {personalInfo.jobTitle || 'Your Professional Title'}
          </p>
        </div>

        {/* Flat contact info bar in a row */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-slate-600 mt-3 ${subSizeMap[fontSize]}`}>
          {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1">☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1">📍 {personalInfo.location}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 font-semibold" style={{ color: themeColor }}>
              🔗 {personalInfo.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6 space-y-2">
          <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
            Professional Summary
          </h2>
          <p className={`text-slate-700 leading-relaxed italic pl-4 border-l-2 border-slate-200 ${bodySizeMap[fontSize]}`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Grid Content */}
      <div className="space-y-6">
        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Employment History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="print-avoid-break space-y-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                      {exp.role} <span className="font-normal text-slate-500">| {exp.company}</span>
                    </span>
                    <span className={`text-slate-500 font-semibold uppercase ${subSizeMap[fontSize]}`}>
                      {exp.startDate ? exp.startDate.replace('-', '/') : ''} - {exp.current ? 'Present' : exp.endDate ? exp.endDate.replace('-', '/') : ''}
                    </span>
                  </div>
                  {exp.location && <p className={`text-slate-400 font-medium ${subSizeMap[fontSize]}`}>{exp.location}</p>}
                  {exp.description && (
                    <p className={`text-slate-600 whitespace-pre-line leading-relaxed pl-1 ${bodySizeMap[fontSize]}`}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="print-avoid-break space-y-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                      {edu.degree} <span className="font-normal text-slate-600">in {edu.fieldOfStudy}</span>
                    </span>
                    <span className={`text-slate-500 font-semibold uppercase ${subSizeMap[fontSize]}`}>
                      {edu.startDate ? edu.startDate.slice(0, 4) : ''} - {edu.endDate ? edu.endDate.slice(0, 4) : ''}
                    </span>
                  </div>
                  <div className={`flex justify-between text-slate-600 ${bodySizeMap[fontSize]}`}>
                    <span>{edu.institution} {edu.location ? `• ${edu.location}` : ''}</span>
                    {edu.grade && <span className="font-semibold italic">Grade: {edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Selected Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="print-avoid-break space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                      {proj.link ? (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                          {proj.name}
                        </a>
                      ) : proj.name}
                    </span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className={`text-slate-500 italic ${subSizeMap[fontSize]}`}>
                        {proj.technologies.join(', ')}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className={`text-slate-600 leading-relaxed ${bodySizeMap[fontSize]}`}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Skills & Competencies
            </h2>
            <div className={`flex flex-wrap gap-x-5 gap-y-2 ${bodySizeMap[fontSize]}`}>
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-slate-700">
                  <span className="font-bold text-slate-900">{skill.name}</span>
                  {skill.category && <span className={`text-slate-400 ${subSizeMap[fontSize]}`}>({skill.category})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((section) => (
          <section key={section.id} className="space-y-3">
            <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              {section.sectionTitle}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="print-avoid-break space-y-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{item.title}</span>
                    {item.date && <span className={`text-slate-500 font-semibold uppercase ${subSizeMap[fontSize]}`}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className={`text-slate-500 ${bodySizeMap[fontSize]}`}>{item.subtitle}</p>}
                  {item.description && (
                    <p className={`text-slate-600 whitespace-pre-line leading-relaxed pl-1 ${bodySizeMap[fontSize]}`}>
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
  );
}
