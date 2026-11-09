import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dailyPlan.css";

const ROLE_WEEKS = {
  "Frontend Developer": [
    ["HTML, CSS and accessibility", ["Semantic HTML", "Forms and labels", "Flexbox", "CSS Grid", "Responsive layouts", "ARIA and keyboard navigation", "Accessible page challenge"]],
    ["JavaScript core and browser APIs", ["Variables and scope", "Functions and closures", "Arrays and objects", "Promises", "Async/await", "Fetch API", "JavaScript practice project"]],
    ["React foundations", ["Components and JSX", "Props", "useState", "Events and forms", "useEffect", "Custom hooks", "React task manager"]],
    ["React architecture", ["React Router", "Context API", "useMemo", "useCallback", "Lazy loading", "Error states", "Multi-page dashboard"]],
    ["Performance and security", ["Core Web Vitals", "Bundle analysis", "Rendering performance", "CORS", "XSS and CSRF", "Accessibility audit", "Optimisation review"]],
    ["Portfolio capstone", ["Plan the UI", "Build components", "Connect an API", "Add responsive states", "Test accessibility", "Deploy", "Publish the case study"]],
  ],
  "Backend Developer": [
    ["HTTP, REST and Node.js", ["HTTP methods", "Status codes", "REST resources", "Node modules", "Async I/O", "Environment variables", "JSON API starter"]],
    ["Express APIs", ["Routing", "Middleware", "Request validation", "Error handling", "Pagination", "API tests", "CRUD API project"]],
    ["Databases", ["SQL basics", "JOINs", "Indexes", "Transactions", "MongoDB documents", "Query optimisation", "Repository layer"]],
    ["Authentication and security", ["Password hashing", "JWT", "Sessions", "Authorization", "Rate limits", "Injection prevention", "Secure API review"]],
    ["Scalable architecture", ["Caching", "Redis", "Message queues", "Load balancing", "Idempotency", "Logging", "Architecture exercise"]],
    ["Backend capstone", ["Design the API", "Implement data layer", "Add auth", "Add cache", "Write tests", "Deploy", "Document the system"]],
  ],
  "MERN Stack Developer": [
    ["JavaScript foundations", ["Data types", "Functions", "Arrays", "Objects", "ES6+", "Async JavaScript", "To-do app"]],
    ["React", ["Components", "Props", "useState", "useEffect", "Forms", "React Router", "Task management UI"]],
    ["Node and Express", ["Node modules", "Express routing", "REST APIs", "Middleware", "Errors", "API testing", "CRUD API"]],
    ["MongoDB and Mongoose", ["Documents", "CRUD", "Queries", "Schemas", "Relations", "Atlas", "Database integration"]],
    ["Git and collaboration", ["Git basics", "Branches", "Pull requests", "README", "Issues", "Code review", "Publish repository"]],
    ["MERN capstone", ["Architecture", "React API calls", "JWT auth", "Dashboard", "Testing", "Deployment", "Final demo"]],
  ],
  "Data Analyst": [
    ["Excel foundations", ["Formulas", "XLOOKUP", "INDEX-MATCH", "Pivot tables", "Conditional formatting", "Data types", "Sales workbook"]],
    ["SQL analysis", ["SELECT and WHERE", "JOINs", "GROUP BY", "HAVING", "CTEs", "Window functions", "SQL case study"]],
    ["Statistics", ["Mean and median", "Variance", "Probability", "Confidence intervals", "Hypothesis tests", "A/B tests", "Experiment write-up"]],
    ["Python and cleaning", ["Pandas basics", "NumPy", "Missing values", "Outliers", "groupby", "merge", "Clean data project"]],
    ["Visualisation", ["Chart selection", "Matplotlib", "Seaborn", "KPIs", "Dashboard layout", "Data storytelling", "Executive dashboard"]],
    ["Analytics portfolio", ["Define a metric", "Funnel analysis", "Investigate a drop", "Create findings", "Recommend actions", "Write documentation", "Publish case study"]],
  ],
  "Machine Learning Engineer": [
    ["Python and data foundations", ["Python syntax", "Functions", "NumPy", "Pandas", "Jupyter", "Git", "Clean a CSV dataset"]],
    ["EDA and statistics", ["Descriptive statistics", "Distributions", "Correlation", "Missing values", "Outliers", "Visualisation", "EDA report"]],
    ["Supervised learning", ["Train-test split", "Linear regression", "Logistic regression", "Trees", "Feature scaling", "Cross-validation", "Baseline model"]],
    ["Model evaluation", ["Precision and recall", "F1 score", "ROC-AUC", "Confusion matrix", "Imbalanced data", "Tuning", "Model comparison"]],
    ["Deep learning and LLMs", ["Neural networks", "Backpropagation", "CNN basics", "Transformers", "Embeddings", "RAG concepts", "Neural network experiment"]],
    ["MLOps and deployment", ["FastAPI", "Model serialisation", "Docker", "Drift detection", "Monitoring", "Documentation", "Deploy a model API"]],
  ],
};

const links = {
  "Frontend Developer": "https://react.dev/learn",
  "Backend Developer": "https://expressjs.com/",
  "MERN Stack Developer": "https://www.mongodb.com/docs/",
  "Data Analyst": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
  "Machine Learning Engineer": "https://scikit-learn.org/stable/getting_started.html",
};

function getTargetJob() {
  try {
    const saved = JSON.parse(localStorage.getItem("selectedJob") || "null");
    return typeof saved === "string" ? saved : saved?.title || "MERN Stack Developer";
  } catch { return "MERN Stack Developer"; }
}

const DailyPlan = () => {
  const navigate = useNavigate();
  const targetJob = useMemo(getTargetJob, []);
  const weeklyPlan = ROLE_WEEKS[targetJob] || ROLE_WEEKS["MERN Stack Developer"];
  const progressKey = `completedDailyPlan:${targetJob}`;
  const [completedDays, setCompletedDays] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(progressKey) || "[]"); return Array.isArray(saved) ? saved : []; } catch { return []; }
  });
  const dailyPlan = useMemo(() => weeklyPlan.flatMap(([weekTitle, topics], weekIndex) => topics.map((topic, topicIndex) => ({
    day: weekIndex * 7 + topicIndex + 1,
    week: `Week ${weekIndex + 1}`,
    topic,
    learn: weekTitle,
    task: topicIndex === 6 ? `Complete and document the ${topic} milestone.` : `Spend focused practice time on ${topic} and save your notes or code.`,
    video: links[targetJob] || links["MERN Stack Developer"],
  }))), [weeklyPlan, targetJob]);
  const toggleDay = (day) => setCompletedDays((current) => {
    const next = current.includes(day) ? current.filter((item) => item !== day) : [...current, day];
    localStorage.setItem(progressKey, JSON.stringify(next));
    return next;
  });
  const completedCount = completedDays.length;
  const progress = Math.round((completedCount / dailyPlan.length) * 100);
  const streak = dailyPlan.findIndex((item) => !completedDays.includes(item.day));
  const milestoneStreak = streak === -1 ? dailyPlan.length : streak;

  return <div className="daily-plan-page">
    <section className="daily-header"><span className="daily-label">PERSONALIZED DAILY PLAN</span><h1>Your {dailyPlan.length}-Day Learning Plan</h1><p>Daily tasks for your <strong>{targetJob}</strong> roadmap. Complete a task to save your progress.</p></section>
    <section className="daily-progress-card"><div className="daily-progress-top"><div><span>Learning Progress</span><h2>{progress}%</h2></div><div className="completed-count">{completedCount} / {dailyPlan.length} Days</div></div><div className="daily-progress-bar"><div style={{ width: `${progress}%` }} /></div><p>{completedCount === 0 ? "Start Day 1 and begin your journey." : completedCount === dailyPlan.length ? "🎉 Congratulations! You completed this role roadmap." : `${dailyPlan.length - completedCount} days remaining · ${milestoneStreak}-day milestone streak.`}</p></section>
    <section className="daily-container"><div className="daily-title"><h2>Daily Learning Plan</h2><p>Follow the tasks in order, or revisit any incomplete milestone.</p></div><div className="daily-list">{dailyPlan.map((item) => { const completed = completedDays.includes(item.day); return <div className={`daily-card ${completed ? "completed" : ""}`} key={item.day}><div className="day-number">{completed ? "✓" : item.day}</div><div className="daily-content"><div className="daily-card-header"><div><span className="week-tag">{item.week}</span><h3>{item.topic}</h3></div><span className="day-tag">Day {item.day}</span></div><div className="daily-info"><strong>📚 Focus</strong><p>{item.learn}</p></div><div className="daily-info"><strong>💻 Today’s Task</strong><p>{item.task}</p></div><div className="daily-actions"><a href={item.video} target="_blank" rel="noopener noreferrer" className="watch-video">Open learning resource ↗</a><button onClick={() => toggleDay(item.day)} aria-pressed={completed} className={completed ? "completed-btn" : "complete-btn"}>{completed ? "✓ Completed" : "Mark Complete"}</button></div></div></div>; })}</div></section>
    <section className="daily-bottom"><button className="daily-back" onClick={() => navigate("/roadmap")}>← Back to Roadmap</button><button className="daily-next" onClick={() => navigate("/resources")}>Explore Resources →</button></section>
  </div>;
};

export default DailyPlan;
