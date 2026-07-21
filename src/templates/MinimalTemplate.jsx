import React from 'react';

export function MinimalTemplate({ data, metadata }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = data;
  const { themeColor, fontSize = 'medium' } = metadata;

  // Dynamic proportional font scaling mappings
  const nameSizeMap = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
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
      {/* Header (Centered) */}
      <header className="text-center pb-5 border-b border-slate-200 mb-6 flex flex-col items-center">
        {personalInfo.avatar && (
          <img
            src={personalInfo.avatar}
            alt="Profile avatar"
            className="w-16 h-16 rounded-full object-cover border border-slate-200/60 shadow-sm mb-3"
          />
        )}
        <h1 className={`font-light ${nameSizeMap[fontSize]} tracking-wide text-slate-900 uppercase`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className={`font-semibold tracking-wider uppercase mt-1 ${subtitleSizeMap[fontSize]}`} style={{ color: themeColor }}>
          {personalInfo.jobTitle || 'Your Professional Title'}
        </p>

        {/* Flat Contact List */}
        <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 text-slate-500 mt-3 max-w-2xl mx-auto ${subSizeMap[fontSize]}`}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium" style={{ color: themeColor }}>
              {personalInfo.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className={`text-slate-600 text-center italic max-w-3xl mx-auto leading-relaxed ${bodySizeMap[fontSize]}`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Main Single Column Content */}
      <div className="space-y-6">
        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-widest text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-slate-900 ${bodySizeMap[fontSize]}`}>
                      {exp.role} <span className="font-normal text-slate-500">at {exp.company}</span>
                    </span>
                    <span className={`text-slate-400 font-medium uppercase ${subSizeMap[fontSize]}`}>
                      {exp.startDate ? exp.startDate.replace('-', '/') : ''} - {exp.current ? 'Present' : exp.endDate ? exp.endDate.replace('-', '/') : ''}
                    </span>
                  </div>
                  {exp.location && <p className={`text-slate-400 font-medium ${subSizeMap[fontSize]}`}>{exp.location}</p>}
                  {exp.description && (
                    <p className={`text-slate-600 mt-1 pl-3 border-l border-slate-200 whitespace-pre-line leading-relaxed ${bodySizeMap[fontSize]}`}>
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
            <h2 className={`font-bold uppercase tracking-widest text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-slate-900 ${bodySizeMap[fontSize]}`}>{edu.degree}</span>
                    <span className={`text-slate-400 font-medium ${subSizeMap[fontSize]}`}>
                      {edu.startDate ? edu.startDate.slice(0,4) : ''} - {edu.endDate ? edu.endDate.slice(0,4) : ''}
                    </span>
                  </div>
                  <p className={`text-slate-600 font-medium ${bodySizeMap[fontSize]}`}>{edu.fieldOfStudy}</p>
                  <p className={`text-slate-500 ${subSizeMap[fontSize]}`}>{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                  {edu.grade && <span className={`font-semibold text-slate-400 italic ${subSizeMap[fontSize]}`}>Grade: {edu.grade}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-widest text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-slate-900 ${bodySizeMap[fontSize]}`}>
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
                    <p className={`text-slate-600 mt-0.5 leading-relaxed ${bodySizeMap[fontSize]}`}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-3">
            <h2 className={`font-bold uppercase tracking-widest text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              Skills
            </h2>
            <div className={`flex flex-wrap gap-x-6 gap-y-2 ${bodySizeMap[fontSize]}`}>
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-1.5 text-slate-700">
                  <span className="font-semibold text-slate-900">{skill.name}</span>
                  {skill.category && <span className={`text-slate-400 ${subSizeMap[fontSize]}`}>({skill.category})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((section) => (
          <section key={section.id} className="space-y-3">
            <h2 className={`font-bold uppercase tracking-widest text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
              {section.sectionTitle}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-slate-900 ${bodySizeMap[fontSize]}`}>{item.title}</span>
                    {item.date && <span className={`text-slate-400 font-medium uppercase ${subSizeMap[fontSize]}`}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className={`text-slate-500 ${bodySizeMap[fontSize]}`}>{item.subtitle}</p>}
                  {item.description && (
                    <p className={`text-slate-600 mt-1 pl-3 border-l border-slate-200 whitespace-pre-line leading-relaxed ${bodySizeMap[fontSize]}`}>
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
