import React from 'react';

export function ModernTemplate({ data, metadata }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = data;
  const { themeColor, fontSize = 'medium' } = metadata;

  // Dynamic proportional font scaling mappings
  const nameSizeMap = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl'
  };

  const subtitleSizeMap = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
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
      {/* Header Banner */}
      <header className="border-b-4 pb-4 mb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4" style={{ borderColor: themeColor }}>
        <div className="flex items-center gap-4 text-left">
          {personalInfo.avatar && (
            <img
              src={personalInfo.avatar}
              alt="Profile avatar"
              className="w-16 h-16 rounded-xl object-cover border border-slate-200/60 shadow-sm flex-shrink-0"
            />
          )}
          <div>
            <h1 className={`font-extrabold ${nameSizeMap[fontSize]} tracking-tight text-slate-900 leading-none`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className={`font-medium mt-1.5 ${subtitleSizeMap[fontSize]}`} style={{ color: themeColor }}>
              {personalInfo.jobTitle || 'Your Professional Title'}
            </p>
          </div>
        </div>

        {/* Contact info grid */}
        <div className={`space-y-1 self-start md:self-auto text-left md:text-right ${subSizeMap[fontSize]} text-slate-600`}>
          {personalInfo.email && <div className="flex items-center md:justify-end gap-1.5">
            <span>{personalInfo.email}</span>
            <span className="hidden md:inline">•</span>
          </div>}
          {personalInfo.phone && <div className="flex items-center md:justify-end gap-1.5">
            <span>{personalInfo.phone}</span>
            <span className="hidden md:inline">•</span>
          </div>}
          {personalInfo.location && <div className="flex items-center md:justify-end gap-1.5">
            <span>{personalInfo.location}</span>
            <span className="hidden md:inline">•</span>
          </div>}
          {personalInfo.website && <div className="flex items-center md:justify-end gap-1.5">
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: themeColor }}>
              {personalInfo.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          </div>}
        </div>
      </header>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Skills, Info, Education) */}
        <div className="md:col-span-4 space-y-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="space-y-2">
              <h2 className={`font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`}>
                Profile Summary
              </h2>
              <p className={`text-slate-700 leading-normal ${bodySizeMap[fontSize]}`}>{personalInfo.summary}</p>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="print-avoid-break">
                    <h3 className={`font-bold text-slate-900 ${bodySizeMap[fontSize]}`}>{edu.degree}</h3>
                    <p className={`font-semibold text-slate-700 ${subSizeMap[fontSize]}`}>{edu.fieldOfStudy}</p>
                    <p className={`text-slate-500 ${subSizeMap[fontSize]}`}>{edu.institution}</p>
                    <p className={`text-slate-400 mt-0.5 ${subSizeMap[fontSize]}`}>
                      {edu.startDate ? edu.startDate.replace('-', '/') : ''} - {edu.endDate ? edu.endDate.replace('-', '/') : 'Present'}
                    </p>
                    {edu.grade && <span className={`inline-block mt-0.5 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded ${subSizeMap[fontSize]}`}>{edu.grade}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`}>
                Core Expertise
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <div key={skill.id} className={`bg-slate-50 border border-slate-200 text-slate-800 px-2 py-1 rounded-md font-medium ${subSizeMap[fontSize]}`}>
                    {skill.name}
                    {skill.category && <span className="block text-[8px] text-slate-400 font-normal">{skill.category}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Experience, Projects, Custom sections) */}
        <div className="md:col-span-8 space-y-5">
          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="print-avoid-break space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{exp.role}</h3>
                        <p className={`font-semibold text-slate-700 ${bodySizeMap[fontSize]}`}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                      </div>
                      <span className={`text-slate-400 font-medium whitespace-nowrap pt-0.5 ${subSizeMap[fontSize]}`}>
                        {exp.startDate ? exp.startDate.replace('-', '/') : ''} - {exp.current ? 'Present' : exp.endDate ? exp.endDate.replace('-', '/') : ''}
                      </span>
                    </div>
                    {exp.description && (
                      <p className={`text-slate-600 whitespace-pre-line leading-relaxed pl-1 border-l-2 border-slate-100 ${bodySizeMap[fontSize]}`}>
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
              <h2 className={`font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="print-avoid-break space-y-1">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                        {proj.link ? (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            {proj.name}
                            <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : proj.name}
                      </h3>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className={`bg-indigo-50/50 text-indigo-800 border border-indigo-100/50 px-1.5 py-0.5 rounded font-mono ${subSizeMap[fontSize]}`}>
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

          {/* Custom Sections */}
          {customSections.map((section) => (
            <section key={section.id} className="space-y-3">
              <h2 className={`font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1 border-slate-200 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                {section.sectionTitle}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="print-avoid-break space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{item.title}</h3>
                        {item.subtitle && <p className={`text-slate-700 font-medium ${bodySizeMap[fontSize]}`}>{item.subtitle}</p>}
                      </div>
                      {item.date && <span className={`text-slate-400 font-medium whitespace-nowrap pt-0.5 ${subSizeMap[fontSize]}`}>{item.date}</span>}
                    </div>
                    {item.description && (
                      <p className={`text-slate-600 leading-relaxed whitespace-pre-line pl-1 border-l border-slate-100 ${bodySizeMap[fontSize]}`}>
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
}
