import React, { memo } from 'react';

const NAME_SIZE_MAP = {
  small: 'text-xl md:text-2xl',
  medium: 'text-2xl md:text-3xl',
  large: 'text-3xl md:text-4xl'
};

const SUBTITLE_SIZE_MAP = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base'
};

const BODY_SIZE_MAP = {
  small: 'text-[11px]',
  medium: 'text-xs',
  large: 'text-sm'
};

const SECTION_HEADER_SIZE_MAP = {
  small: 'text-[10px]',
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

const sectionHeaderSizeMap = SECTION_HEADER_SIZE_MAP;
const bodyBoldSizeMap = BODY_BOLD_SIZE_MAP;
const bodySizeMap = BODY_SIZE_MAP;
const subSizeMap = SUB_SIZE_MAP;


export const CorporateTemplate = memo(function CorporateTemplate({ data = {}, metadata = {} }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = data;
  const { themeColor = '#334155', fontSize = 'medium' } = metadata;

  return (
    <div className={`w-full text-slate-800 ${BODY_SIZE_MAP[fontSize] || BODY_SIZE_MAP.medium} leading-relaxed`}>

      {/* Header - Centered Corporate Style */}
      <header className="text-center pb-6 border-b-2 border-slate-200 mb-6 flex flex-col items-center">
        {personalInfo.avatar && (
          <img
            src={personalInfo.avatar}
            alt="Profile avatar"
            className="w-16 h-16 rounded-xl object-cover border border-slate-200/60 shadow-sm mb-3"
          />
        )}
        <h1 className={`font-bold ${NAME_SIZE_MAP[fontSize]} tracking-wide text-slate-900 uppercase`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className={`font-semibold tracking-wider uppercase mt-1 ${SUBTITLE_SIZE_MAP[fontSize]}`} style={{ color: themeColor }}>
          {personalInfo.jobTitle || 'Your Professional Title'}
        </p>

        {/* Contact Strip */}
        <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 text-slate-600 mt-3 font-medium ${SUB_SIZE_MAP[fontSize]}`}>
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: themeColor }}>■</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: themeColor }}>■</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: themeColor }}>■</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold" style={{ color: themeColor }}>
              {personalInfo.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6 space-y-2">
          <div className="border-l-4 pl-3 border-slate-300" style={{ borderColor: themeColor }}>
            <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${sectionHeaderSizeMap[fontSize]}`}>
              Executive Summary
            </h2>
          </div>
          <p className={`text-slate-700 leading-relaxed text-justify ${bodySizeMap[fontSize]}`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Main Corporate Sections */}
      <div className="space-y-6">
        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <div className="border-l-4 pl-3 border-slate-300" style={{ borderColor: themeColor }}>
              <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${sectionHeaderSizeMap[fontSize]}`}>
                Professional Background
              </h2>
            </div>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                      {exp.role} <span className="text-slate-500 font-normal">| {exp.company}</span>
                    </span>
                    <span className={`text-slate-500 font-bold uppercase ${subSizeMap[fontSize]}`}>
                      {exp.startDate ? exp.startDate.replace('-', '/') : ''} - {exp.current ? 'Present' : exp.endDate ? exp.endDate.replace('-', '/') : ''}
                    </span>
                  </div>
                  {exp.location && <p className={`text-slate-400 font-semibold italic ${subSizeMap[fontSize]}`}>{exp.location}</p>}
                  {exp.description && (
                    <p className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l border-slate-100 ${bodySizeMap[fontSize]}`}>
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
            <div className="border-l-4 pl-3 border-slate-300" style={{ borderColor: themeColor }}>
              <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${sectionHeaderSizeMap[fontSize]}`}>
                Education & Credentials
              </h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                      {edu.degree} <span className="text-slate-500 font-normal">in {edu.fieldOfStudy}</span>
                    </span>
                    <span className={`text-slate-500 font-bold uppercase ${subSizeMap[fontSize]}`}>
                      {edu.startDate ? edu.startDate.slice(0, 4) : ''} - {edu.endDate ? edu.endDate.slice(0, 4) : ''}
                    </span>
                  </div>
                  <div className={`flex justify-between text-slate-500 ${bodySizeMap[fontSize]}`}>
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
            <div className="border-l-4 pl-3 border-slate-300" style={{ borderColor: themeColor }}>
              <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${sectionHeaderSizeMap[fontSize]}`}>
                Key Projects & Inventions
              </h2>
            </div>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>
                      {proj.link ? (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                          {proj.name}
                        </a>
                      ) : proj.name}
                    </span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className={`text-slate-500 font-bold ${subSizeMap[fontSize]}`}>
                        [{proj.technologies.join(', ')}]
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className={`text-slate-600 mt-1 leading-normal ${bodySizeMap[fontSize]}`}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-3">
            <div className="border-l-4 pl-3 border-slate-300" style={{ borderColor: themeColor }}>
              <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${sectionHeaderSizeMap[fontSize]}`}>
                Expertise Matrix
              </h2>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 ${bodySizeMap[fontSize]}`}>
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 text-slate-800">
                  <span style={{ color: themeColor }}>✔</span>
                  <span className="font-bold">{skill.name}</span>
                  {skill.category && <span className={`text-slate-400 font-normal ${subSizeMap[fontSize]}`}>({skill.category})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((section) => (
          <section key={section.id} className="space-y-3">
            <div className="border-l-4 pl-3 border-slate-300" style={{ borderColor: themeColor }}>
              <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${sectionHeaderSizeMap[fontSize]}`}>
                {section.sectionTitle}
              </h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="print-avoid-break">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`font-bold text-slate-900 ${bodyBoldSizeMap[fontSize]}`}>{item.title}</span>
                    {item.date && <span className={`text-slate-500 font-bold uppercase ${subSizeMap[fontSize]}`}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className={`text-slate-500 font-semibold italic ${bodySizeMap[fontSize]}`}>{item.subtitle}</p>}
                  {item.description && (
                    <p className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l border-slate-100 ${bodySizeMap[fontSize]}`}>
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
});

