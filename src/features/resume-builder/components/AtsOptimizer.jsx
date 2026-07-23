import React, { useMemo, memo } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { hasMeasurableAchievements } from '../../../utils/validation';

const ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'launched', 'optimized',
  'developed', 'implemented', 'designed', 'managed', 'created',
  'achieved', 'mentored', 'improved', 'reduced', 'increased', 'transformed'
];

export const AtsOptimizer = memo(function AtsOptimizer() {
  const { resumeData, addToast } = useResume();

  const atsReport = useMemo(() => {
    const { personalInfo = {}, experience = [], skills = [], projects = [] } = resumeData;
    let score = 0;
    const suggestions = [];
    
    const foundVerbsSet = new Set();
    const experienceText = experience.map(exp => `${exp.role || ''} ${exp.description || ''}`).join(' ').toLowerCase();
    const projectsText = projects.map(proj => `${proj.name || ''} ${proj.description || ''}`).join(' ').toLowerCase();
    const summaryText = (personalInfo.summary || '').toLowerCase();
    const allCombinedText = `${experienceText} ${projectsText} ${summaryText}`;

    ACTION_VERBS.forEach(verb => {
      if (allCombinedText.includes(verb)) {
        foundVerbsSet.add(verb);
      }
    });

    const foundVerbs = Array.from(foundVerbsSet);
    const missingVerbs = ACTION_VERBS.filter(verb => !foundVerbsSet.has(verb));


    // 1. Personal Info Completeness (Max 20 pts)
    let personalScore = 0;
    if (personalInfo.fullName?.trim()) personalScore += 5;
    else suggestions.push({ category: 'Personal', text: 'Add your full name so recruiters can identify you.', type: 'critical' });

    if (personalInfo.email?.trim()) personalScore += 5;
    else suggestions.push({ category: 'Personal', text: 'Add a valid email address for employer contact.', type: 'critical' });

    if (personalInfo.phone?.trim()) personalScore += 5;
    else suggestions.push({ category: 'Personal', text: 'Include a contact phone number.', type: 'recommended' });

    if (personalInfo.website?.trim() || personalInfo.location?.trim()) personalScore += 5;
    else suggestions.push({ category: 'Personal', text: 'Add a portfolio, GitHub/LinkedIn link, or city location to enhance credibility.', type: 'recommended' });
    
    score += personalScore;

    // 2. Experience & Measurable Achievements (Max 30 pts)
    if (experience.length > 0) {
      score += 15;
      if (experience.length >= 2) {
        score += 5;
      } else {
        suggestions.push({ category: 'Experience', text: 'Add at least 2 work positions to demonstrate career progression.', type: 'recommended' });
      }

      // Check for measurable achievements (metrics/numbers/percentages)
      const hasMetricsInExp = experience.some(exp => hasMeasurableAchievements(exp.description));
      if (hasMetricsInExp) {
        score += 10;
      } else {
        suggestions.push({
          category: 'Achievements',
          text: 'Missing measurable achievements! Add quantifiable metrics (e.g., "Increased performance by 35%", "Saved $10k/year", "Led 5 engineers").',
          type: 'critical'
        });
      }
    } else {
      suggestions.push({ category: 'Experience', text: 'Add at least one work experience entry to build ATS keyword relevance.', type: 'critical' });
    }

    // 3. Projects Showcase (Max 15 pts)
    if (projects.length > 0) {
      score += 10;
      const hasMetricsInProj = projects.some(p => hasMeasurableAchievements(p.description));
      if (hasMetricsInProj || projects.length >= 2) score += 5;
      else suggestions.push({ category: 'Projects', text: 'Elaborate on project outcomes or tech stack tags to highlight practical skills.', type: 'recommended' });
    } else {
      suggestions.push({ category: 'Projects', text: 'Add at least one project showcase with description and technologies used.', type: 'recommended' });
    }

    // 4. Skills & Technical Keywords (Max 15 pts)
    if (skills.length >= 6) {
      score += 15;
    } else if (skills.length > 0) {
      score += Math.min(skills.length * 2.5, 12);
      suggestions.push({ category: 'Skills', text: `You have ${skills.length} skills listed. Aim for 6-10 targeted technical skills for ATS keyword matching.`, type: 'recommended' });
    } else {
      suggestions.push({ category: 'Skills', text: 'Include technical & soft skills to rank higher in recruiter ATS search queries.', type: 'critical' });
    }

    // 5. Professional Summary (Max 10 pts)
    const summaryLength = personalInfo.summary?.trim().length || 0;
    if (summaryLength >= 120 && summaryLength <= 350) {
      score += 10;
    } else if (summaryLength > 0) {
      score += 5;
      if (summaryLength < 120) {
        suggestions.push({ category: 'Summary', text: 'Your professional summary is brief. Expand to 2-3 impact-driven sentences (120-300 characters).', type: 'recommended' });
      } else {
        suggestions.push({ category: 'Summary', text: 'Summary exceeds 350 characters. Concise summaries under 300 characters perform better with recruiters.', type: 'recommended' });
      }
    } else {
      suggestions.push({ category: 'Summary', text: 'Write a strong 2-3 sentence summary emphasizing your role, key strengths, and career impact.', type: 'critical' });
    }

    // 6. Action Verbs Score (Max 10 pts)
    const verbPoints = Math.min(foundVerbs.length * 2.5, 10);
    score += verbPoints;
    if (foundVerbs.length < 3 && experience.length > 0) {
      suggestions.push({
        category: 'Action Verbs',
        text: 'Use stronger action verbs (e.g., "spearheaded", "engineered", "transformed") to start bullet points.',
        type: 'critical'
      });
    }

    return {
      score: Math.round(score),
      suggestions,
      foundVerbs,
      missingVerbs,
      hasMetrics: experience.some(exp => hasMeasurableAchievements(exp.description)) || projects.some(p => hasMeasurableAchievements(p.description))
    };
  }, [resumeData]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast(`Copied action verb "${text}" to clipboard!`, 'info', 2000);
  };

  const getScoreColorClass = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-950/20 border-emerald-900/50';
    if (score >= 50) return 'text-amber-400 bg-amber-950/20 border-amber-900/50';
    return 'text-red-400 bg-red-950/20 border-red-900/50';
  };

  return (
    <div className="space-y-6">
      {/* Score Header Card */}
      <div className={`p-5 rounded-xl border ${getScoreColorClass(atsReport.score)} flex flex-col md:flex-row items-center gap-6 shadow-sm`}>
        {/* Circular Progress Meter */}
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
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">ATS Score</span>
          </div>
        </div>

        {/* Text overview */}
        <div className="flex-1 space-y-1 text-center md:text-left">
          <h5 className="font-bold text-slate-100 flex items-center justify-center md:justify-start gap-2">
            ATS Compatibility Score
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-slate-900 border border-slate-800 text-slate-300">
              {atsReport.score >= 80 ? 'ATS Ready' : atsReport.score >= 50 ? 'Needs Polish' : 'Incomplete'}
            </span>
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            {atsReport.score >= 80
              ? 'Outstanding! Your resume structure, keyword density, and quantifiable impact metrics meet ATS standards.'
              : atsReport.score >= 50
              ? 'Good foundation. Follow the actionable recommendations below to boost your rank for recruiter scanners.'
              : 'Complete key sections, add action verbs, and include quantifiable achievements to pass automated ATS filters.'}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-semibold text-slate-400 pt-1">
            <span>Verbs Found: <strong className="text-slate-200">{atsReport.foundVerbs.length}</strong></span>
            <span>Metrics Included: <strong className={atsReport.hasMetrics ? 'text-emerald-400' : 'text-amber-400'}>{atsReport.hasMetrics ? 'Yes ✓' : 'No ✗'}</strong></span>
          </div>
        </div>
      </div>

      {/* Recruiter Action Verbs Scanner Section */}
      <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between">
          <h6 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Action Verbs Scanner
          </h6>
          <span className="text-[10px] text-slate-500">Click missing verb to copy</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Detected in Resume ({atsReport.foundVerbs.length})</span>
            {atsReport.foundVerbs.length === 0 ? (
              <span className="text-xs text-slate-500 italic block">No strong action verbs detected yet. Try starting bullet points with verbs like "engineered" or "spearheaded".</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {atsReport.foundVerbs.map(verb => (
                  <span key={verb} className="text-xs bg-indigo-950/70 text-indigo-300 border border-indigo-900/60 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                    <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {verb}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Recommended Verbs to Add</span>
            <div className="flex flex-wrap gap-1.5">
              {atsReport.missingVerbs.slice(0, 10).map(verb => (
                <button
                  key={verb}
                  type="button"
                  onClick={() => copyToClipboard(verb)}
                  className="text-xs bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 group"
                  title="Click to copy to clipboard"
                >
                  <span className="text-indigo-400 font-bold">+</span>
                  {verb}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Suggestions Checklist */}
      <div className="space-y-3">
        <h6 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span>Actionable Feedback & Recommendations</span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
            {atsReport.suggestions.length} suggestion{atsReport.suggestions.length === 1 ? '' : 's'}
          </span>
        </h6>

        {atsReport.suggestions.length === 0 ? (
          <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl text-emerald-400 text-xs flex gap-2.5 items-center">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Awesome! Your resume content covers all ATS criteria and best practices. Ready for job applications!</span>
          </div>
        ) : (
          <div className="space-y-2">
            {atsReport.suggestions.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex items-start gap-3 transition-colors ${
                  item.type === 'critical'
                    ? 'bg-red-950/20 border-red-900/40 text-slate-200'
                    : 'bg-slate-800/30 border-slate-800 text-slate-300'
                }`}
              >
                <div className={`mt-0.5 p-1 rounded-lg flex-shrink-0 ${
                  item.type === 'critical' ? 'bg-red-900/30 text-red-400' : 'bg-slate-800 text-indigo-400'
                }`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200 uppercase text-[10px] tracking-wider">{item.category}</span>
                    {item.type === 'critical' && (
                      <span className="text-[9px] bg-red-950 text-red-400 border border-red-900/60 px-1.5 py-0.2 rounded font-bold">High Impact</span>
                    )}
                  </div>
                  <p className="leading-relaxed text-slate-300">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});


