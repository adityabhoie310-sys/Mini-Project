import React, { useMemo } from "react";
import "../styles/progress.css";

const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

function Progress() {
  const data = useMemo(() => {
    const results = readJson("assessmentResults", null);
    const selectedJob = localStorage.getItem("selectedJob") || "Your selected role";
    let targetJob = selectedJob;
    try {
      const parsedJob = JSON.parse(selectedJob);
      targetJob = typeof parsedJob === "string" ? parsedJob : parsedJob?.title || "Your selected role";
    } catch { /* legacy plain-text job title */ }
    const completedWeeks = readJson(`roadmapCompletedWeeks:${targetJob}`, []);
    const completedDays = readJson(`completedDailyPlan:${targetJob}`, []);
    const ratings = results?.technicalRatings || readJson("technicalSkillRatings", {});
    const skills = Object.entries(ratings).filter(([, value]) => Number.isFinite(Number(value)));
    const technicalAnswers = readJson("technicalAssessmentAnswers", {});
    const aptitudeAnswers = readJson("aptitudeAssessmentAnswers", {});
    const reasoningAnswers = readJson("reasoningAssessmentAnswers", {});
    return {
      results,
      targetJob,
      readiness: Number(results?.overallScore) || 0,
      technical: Number(results?.technicalScore) || 0,
      aptitude: Number(results?.aptitudeScore) || 0,
      reasoning: Number(results?.reasoningScore) || 0,
      completedWeeks,
      completedDays,
      dailyPlan: Math.round((completedDays.length / 42) * 100),
      roadmap: Math.round((completedWeeks.length / 6) * 100),
      skills,
      attempted: Object.keys(technicalAnswers).length + Object.keys(aptitudeAnswers).length + Object.keys(reasoningAnswers).length,
    };
  }, []);

  const assessmentsTaken = [data.technical, data.reasoning, data.aptitude].filter(Boolean).length;
  const assessmentCards = [
    ["Technical & Coding", data.technical, "blue-fill", "5 React challenges"],
    ["Logical Reasoning", data.reasoning, "green-fill", "Reasoning assessment"],
    ["Aptitude", data.aptitude, "purple-fill", "Aptitude assessment"],
  ];

  return <div className="progress-page"><main className="progress-container">
    <section className="progress-header"><div><p className="progress-label">YOUR LEARNING JOURNEY</p><h1>My Progress</h1><p>Track completed assessments, roadmap progress, and job readiness from your real results.</p></div><div className="target-job"><span>Target Job</span><strong>{data.targetJob}</strong></div></section>
    <section className="readiness-card"><div className="readiness-score"><div className="score-circle"><div><strong>{data.readiness}%</strong><span>Ready</span></div></div></div><div className="readiness-content"><span className="section-tag">JOB READINESS</span><h2>{data.results ? "Your assessment snapshot" : "Start your first assessment"}</h2><p>{data.results ? "Your readiness is calculated from assessments you have completed." : "Complete the assessments to see a real readiness score and skill-gap summary."}</p><div className="readiness-bar"><div className="readiness-fill" style={{ width: `${data.readiness}%` }} /></div><div className="readiness-info"><span>Current: {data.readiness}%</span><span>Target: 90%</span></div></div></section>
    <section className="progress-stats"><div className="progress-stat-card"><div className="stat-icon blue">✓</div><div><strong>{data.attempted}</strong><span>Questions Attempted</span></div></div><div className="progress-stat-card"><div className="stat-icon green">★</div><div><strong>{data.readiness}%</strong><span>Assessment Score</span></div></div><div className="progress-stat-card"><div className="stat-icon purple">↗</div><div><strong>{data.skills.length}</strong><span>Skills Assessed</span></div></div><div className="progress-stat-card"><div className="stat-icon orange">◆</div><div><strong>{data.completedWeeks.length}</strong><span>Roadmap Weeks Done</span></div></div></section>
    <section className="progress-section"><div className="section-heading"><div><span className="section-tag">ASSESSMENT</span><h2>Assessment Performance</h2></div><span className="overall-score">Overall {data.readiness}%</span></div><div className="assessment-progress">{assessmentCards.map(([name, score, color, detail]) => <div className="assessment-item" key={name}><div className="assessment-top"><span>{name}</span><strong>{score}%</strong></div><div className="progress-track"><div className={`progress-fill ${color}`} style={{ width: `${score}%` }} /></div><small>{detail}</small></div>)}</div></section>
    <section className="progress-section">
      <div className="section-heading"><div><span className="section-tag">LEARNING</span><h2>Learning Progress</h2></div></div>
      <div className="learning-grid">
        <div className="learning-card"><div className="learning-card-header"><div className="learning-icon blue-icon">🗺</div><div><h3>Career Roadmap</h3><p>6-week personalised roadmap</p></div><strong>{data.roadmap}%</strong></div><div className="progress-track"><div className="progress-fill blue-fill" style={{ width: `${data.roadmap}%` }} /></div><p className="progress-detail">{data.completedWeeks.length} of 6 weeks completed</p></div>
        <div className="learning-card"><div className="learning-card-header"><div className="learning-icon green-icon">📅</div><div><h3>Daily Learning Plan</h3><p>42 role-based tasks</p></div><strong>{data.dailyPlan}%</strong></div><div className="progress-track"><div className="progress-fill green-fill" style={{ width: `${data.dailyPlan}%` }} /></div><p className="progress-detail">{data.completedDays.length} of 42 daily tasks completed</p></div>
      </div>
    </section>
    <section className="progress-section"><div className="section-heading"><div><span className="section-tag">SKILLS</span><h2>Skill Improvement</h2></div></div><div className="skills-table"><div className="skill-row skill-header"><span>Skill</span><span>Current</span><span>Target</span><span>Progress</span></div>{data.skills.length ? data.skills.map(([skill, rating]) => { const current = Math.round((Number(rating) / 5) * 100); return <div className="skill-row" key={skill}><span className="skill-name">{skill}</span><span>{current}%</span><span>90%</span><div className="mini-progress"><div style={{ width: `${current}%` }} /></div></div>; }) : <div className="skill-row"><span className="skill-name">No skills assessed yet</span><span>—</span><span>—</span><span>Complete an assessment to see results.</span></div>}</div></section>
    <section className="progress-section" id="weekly-insights"><div className="section-heading"><div><span className="section-tag">WEEKLY INSIGHTS</span><h2>Weekly Learning Summary</h2></div></div><div className="learning-grid"><div className="learning-card"><h3>{data.completedWeeks.length} roadmap weeks completed</h3><p className="progress-detail">Continue your roadmap to build a consistent learning record.</p></div><div className="learning-card"><h3>{assessmentsTaken} assessment sections completed</h3><p className="progress-detail">Your current assessment average is {data.readiness}%.</p></div></div></section>
    <section className="progress-cta"><div><span className="section-tag">NEXT STEP</span><h2>Keep improving your skills 🚀</h2><p>Use your roadmap and skill-gap review to choose the next area to practise.</p></div><div className="cta-buttons"><a href="/roadmap" className="primary-btn">Continue Roadmap →</a><a href="/skill-gap" className="secondary-btn">View Skill Gaps</a></div></section>
  </main></div>;
}

export default Progress;
