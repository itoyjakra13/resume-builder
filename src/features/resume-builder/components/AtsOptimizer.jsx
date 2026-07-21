import React, { useMemo } from 'react';
import { useResume } from '../../../context/ResumeContext';

export function AtsOptimizer() {
  const { resumeData } = useResume();
  const { personalInfo, experience = [], education = [], skills = [], projects = [] } = resumeData;

  const atsReport = useMemo(() => {
    let score = 0;
    const tips = [];
    const keywords = ['led', 'developed', 'designed', 'implemented', 'managed', 'created', 'architected', 'optimized', 'spearheaded', 'achieved', 'mentored', 'engineered', 'launched', 'improved'];
    const foundVerbsSet = new Set();
    
    // Scan text contents for action verbs
    const experienceText = experience.map(exp => (exp.role + ' ' + exp.description).toLowerCase()).join(' ');
    const summaryText = (personalInfo.summary || '').toLowerCase();
    const combinedText = experienceText + ' ' + summaryText;

    keywords.forEach(word => {
      if (combinedText.includes(word)) {
        foundVerbsSet.add(word);
      }
    });

    const foundVerbs = Array.from(foundVerbsSet);
    const missingVerbs = keywords.filter(word => !foundVerbsSet.has(word));
    const verbCount = foundVerbs.length;

    // 1. Personal Info Completeness (Max 20 points)
    let personalScore = 0;
    if (personalInfo.fullName?.trim()) personalScore += 5;
    else tips.push('Add your full name.');

    if (personalInfo.email?.trim()) personalScore += 5;
    else tips.push('Add an email address for recruiters to contact you.');

    if (personalInfo.phone?.trim()) personalScore += 5;
    else tips.push('Include a contact phone number.');

    if (personalInfo.website?.trim()) personalScore += 5;
    else tips.push('Add a portfolio or LinkedIn link to boost professionalism.');
    score += personalScore;

    // 2. Experience Check (Max 30 points)
    if (experience.length > 0) {
      score += 20;
      if (experience.length >= 2) {
        score += 10;
      } else {
        tips.push('Add at least two work experience entries to show employment history.');
      }
      
      // Check word counts in experience
      experience.forEach((exp, idx) => {
        const desc = exp.description?.toLowerCase() || '';
        if (desc.length < 50) {
          tips.push(`Job description for "${exp.role || 'Position ' + (idx + 1)}" is too short. Elaborate on your accomplishments.`);
        }
      });
    } else {
      tips.push('Add at least one work experience entry.');
    }

    // 3. Projects Check (Max 15 points)
    if (projects.length > 0) {
      score += 10;
      if (projects.length >= 2) {
        score += 5;
      } else {
        tips.push('Add at least two projects to demonstrate hands-on experience.');
      }
    } else {
      tips.push('Add at least one project showcase.');
    }

    // 4. Skills Check (Max 15 points)
    if (skills.length >= 5) {
      score += 15;
    } else {
      score += Math.min(skills.length * 3, 12);
      tips.push('Include at least 5 skills to show technical keywords.');
    }

    // 5. Professional Summary Check (Max 10 points)
    const summaryLength = personalInfo.summary?.trim().length || 0;
    if (summaryLength >= 100 && summaryLength <= 350) {
      score += 10;
    } else if (summaryLength > 0) {
      score += 5;
      if (summaryLength < 100) tips.push('Make your professional summary slightly longer (aim for 100-300 characters).');
      if (summaryLength > 350) tips.push('Keep your summary concise; it exceeds the ideal length (under 300 characters is best).');
    } else {
      tips.push('Write a professional summary explaining your career goals.');
    }

    // 6. Action Verbs Score (Max 10 points)
    const verbPoints = Math.min(verbCount * 2.5, 10);
    score += verbPoints;
    if (verbCount < 3 && experience.length > 0) {
      tips.push('Use more action verbs (e.g. spearheaded, optimized, mentored, architected) in your work descriptions.');
    }

    return { score: Math.round(score), tips, foundVerbs, missingVerbs };
  }, [resumeData]);

  // Color matching based on score
  const getScoreColorClass = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-950/20 border-emerald-900/50';
    if (score >= 50) return 'text-amber-400 bg-amber-950/20 border-amber-900/50';
    return 'text-red-400 bg-red-950/20 border-red-900/50';
  };

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-xl border ${getScoreColorClass(atsReport.score)} flex flex-col md:flex-row items-center gap-6`}>
        {/* Circular Progress */}
        <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              className="stroke-slate-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              className="transition-all duration-500 ease-out"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * atsReport.score) / 100}
              strokeLinecap="round"
              stroke="currentColor"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-xl">
            <span>{atsReport.score}</span>
            <span className="text-[10px] text-slate-400 font-medium">ATS Score</span>
          </div>
        </div>

        {/* Text overview */}
        <div className="flex-1 space-y-1">
          <h5 className="font-bold text-slate-200">Applicant Tracking System (ATS) Analysis</h5>
          <p className="text-sm text-slate-300">
            {atsReport.score >= 80
              ? 'Excellent job! Your resume contains solid structural content and keyword densities.'
              : atsReport.score >= 50
              ? 'Good base, but implementing the optimizer recommendations below will increase readability.'
              : 'Complete the missing fields and write descriptive details to build your score.'}
          </p>
          <div className="flex gap-4 text-xs font-semibold text-slate-400 pt-1">
            <span>Action Verbs Found: <strong className="text-slate-200">{atsReport.foundVerbs.length}</strong></span>
            <span>Sections Completed: <strong className="text-slate-200">{
              [personalInfo.fullName, experience.length, education.length, skills.length, projects.length].filter(Boolean).length
            }/5</strong></span>
          </div>
        </div>
      </div>

      {/* Action Verbs Analyzer Section */}
      <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
        <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          Recruiter Keyword Scanner
        </h6>
        
        <div className="space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">Detected Action Verbs ({atsReport.foundVerbs.length})</span>
            {atsReport.foundVerbs.length === 0 ? (
              <span className="text-xs text-slate-500 italic block">None detected yet. Add strong metrics verbs (e.g. designed, managed) below.</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {atsReport.foundVerbs.map(verb => (
                  <span key={verb} className="text-xs bg-indigo-950/60 text-indigo-300 border border-indigo-900/60 px-2 py-0.5 rounded-md font-medium">
                    ✓ {verb}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">Recommended Keywords to Include</span>
            <div className="flex flex-wrap gap-1.5">
              {atsReport.missingVerbs.slice(0, 8).map(verb => (
                <span key={verb} className="text-xs bg-slate-800/40 text-slate-400 border border-slate-700/30 px-2 py-0.5 rounded-md">
                  + {verb}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Checklist */}
      <div className="space-y-3">
        <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400">Optimization Checklist</h6>
        {atsReport.tips.length === 0 ? (
          <div className="p-4 bg-emerald-950/10 border border-emerald-900/40 rounded-xl text-emerald-400 text-sm flex gap-2 items-center">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Fantastic! Your resume layout is complete. No optimization tips required.</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {atsReport.tips.map((tip, idx) => (
              <li key={idx} className="p-3 bg-slate-800/10 border border-slate-800/60 rounded-xl text-slate-300 text-sm flex items-start gap-2.5">
                <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
