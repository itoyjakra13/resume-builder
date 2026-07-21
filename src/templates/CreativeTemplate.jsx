import React from 'react';

export function CreativeTemplate({ data, metadata }) {
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
      {/* Creative Split layout: We simulate a split grid. On print, it displays as a nice double column */}
      <div className="grid grid-cols-12 -mx-[20mm] -my-[20mm] min-h-[297mm]">
        {/* Sidebar (Theme colored left sidebar) */}
        <aside className="col-span-4 p-6 text-white space-y-6 flex flex-col justify-between" style={{ backgroundColor: themeColor }}>
          <div className="space-y-6">
            {/* Header info */}
            <div className="text-center md:text-left space-y-2">
              {personalInfo.avatar && (
                <div className="mb-4 flex justify-center md:justify-start">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName || 'Profile avatar'}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/40 shadow-md"
                  />
                </div>
              )}
              <h1 className={`font-extrabold tracking-tight leading-tight ${nameSizeMap[fontSize]}`}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className={`font-medium opacity-90 leading-snug ${subtitleSizeMap[fontSize]}`}>
                {personalInfo.jobTitle || 'Your Professional Title'}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-4 border-t border-white/20">
              <h2 className={`font-extrabold uppercase tracking-wider text-white/90 ${sectionHeaderSizeMap[fontSize]}`}>
                Contact Details
              </h2>
              <div className={`space-y-2 opacity-90 ${subSizeMap[fontSize]} break-all`}>
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <span>✉</span>
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <span>☎</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <span>🔗</span>
                    <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">
                      {personalInfo.website.replace(/https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Core Skills */}
            {skills.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/20">
                <h2 className={`font-extrabold uppercase tracking-wider text-white/90 ${sectionHeaderSizeMap[fontSize]}`}>
                  Core Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-white/10 border border-white/15 px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-[8px] opacity-40 uppercase tracking-widest text-center mt-8">
            CV-Craft Premium Template
          </div>
        </aside>

        {/* Main Body content */}
        <main className="col-span-8 p-6 bg-white space-y-5">
          {/* Profile Summary */}
          {personalInfo.summary && (
            <section className="space-y-2">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
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
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Employment History
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

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Education & Credentials
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="print-avoid-break">
                    <div className="flex justify-between items-baseline gap-4">
                      <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{edu.degree}</span>
                      <span className={`text-slate-400 font-bold ${subSizeMap[fontSize]}`}>
                        {edu.startDate ? edu.startDate.slice(0, 4) : ''} - {edu.endDate ? edu.endDate.slice(0, 4) : ''}
                      </span>
                    </div>
                    <p className={`text-slate-600 font-semibold ${subSizeMap[fontSize]}`}>{edu.fieldOfStudy} ({edu.institution})</p>
                    {edu.grade && <span className={`inline-block mt-0.5 bg-slate-50 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded ${subSizeMap[fontSize]}`}>{edu.grade}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                Inventions & Projects
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

          {/* Custom Sections */}
          {customSections.map((section) => (
            <section key={section.id} className="space-y-3">
              <h2 className={`font-bold uppercase tracking-wider border-b pb-1 border-slate-100 ${sectionHeaderSizeMap[fontSize]}`} style={{ color: themeColor }}>
                {section.sectionTitle}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="print-avoid-break space-y-1">
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <h3 className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{item.title}</h3>
                        {item.subtitle && <p className={`text-slate-500 font-medium ${bodySizeMap[fontSize]}`}>{item.subtitle}</p>}
                      </div>
                      {item.date && <span className={`text-slate-400 font-bold uppercase ${subSizeMap[fontSize]}`}>{item.date}</span>}
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
        </main>
      </div>
    </div>
  );
}
