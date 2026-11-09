import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/roadmap.css";

function Roadmap() {
  const selectedJob = useMemo(() => {
    try {
      const raw = localStorage.getItem("selectedJob");
      if (!raw) return "MERN Developer";
      const saved = JSON.parse(raw);
      return typeof saved === "string" ? saved : saved?.title || "MERN Developer";
    } catch { return "MERN Developer"; }
  }, []);
  const progressKey = `roadmapCompletedWeeks:${selectedJob}`;
  const [completedWeeks, setCompletedWeeks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
  });
  const mernRoadmap = [
    {
      week: "Week 1",
      title: "JavaScript Fundamentals",
      duration: "7 Days",
      level: "Beginner",
      skills: [
        "Variables & Data Types",
        "Functions",
        "Arrays & Objects",
        "ES6+",
        "DOM Manipulation",
        "Async JavaScript",
        "Promises & Async/Await",
      ],
      resources: [
        {
          name: "JavaScript Full Course",
          type: "Video",
          link: "https://www.youtube.com/results?search_query=javascript+full+course+for+beginners",
        },
        {
          name: "MDN JavaScript Guide",
          type: "Documentation",
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        },
      ],
      project: "Build a JavaScript To-Do Application",
    },

    {
      week: "Week 2",
      title: "React.js",
      duration: "7 Days",
      level: "Beginner → Intermediate",
      skills: [
        "Components",
        "JSX",
        "Props",
        "State",
        "useState",
        "useEffect",
        "Event Handling",
        "React Router",
      ],
      resources: [
        {
          name: "React Official Tutorial",
          type: "Documentation",
          link: "https://react.dev/learn",
        },
        {
          name: "React Full Course",
          type: "Video",
          link: "https://www.youtube.com/results?search_query=react+js+full+course+for+beginners",
        },
      ],
      project: "Build a React Task Management App",
    },

    {
      week: "Week 3",
      title: "Node.js & Express.js",
      duration: "7 Days",
      level: "Intermediate",
      skills: [
        "Node.js Basics",
        "NPM",
        "Modules",
        "Express.js",
        "REST API",
        "Middleware",
        "CRUD Operations",
        "API Testing",
      ],
      resources: [
        {
          name: "Node.js Documentation",
          type: "Documentation",
          link: "https://nodejs.org/docs/latest/api/",
        },
        {
          name: "Express.js Documentation",
          type: "Documentation",
          link: "https://expressjs.com/",
        },
        {
          name: "Node.js & Express Course",
          type: "Video",
          link: "https://www.youtube.com/results?search_query=node.js+express.js+full+course",
        },
      ],
      project: "Build a REST API with Node.js & Express",
    },

    {
      week: "Week 4",
      title: "MongoDB & Mongoose",
      duration: "7 Days",
      level: "Intermediate",
      skills: [
        "MongoDB Basics",
        "Collections",
        "Documents",
        "CRUD",
        "Queries",
        "Mongoose",
        "Schemas",
        "Database Relationships",
      ],
      resources: [
        {
          name: "MongoDB Documentation",
          type: "Documentation",
          link: "https://www.mongodb.com/docs/",
        },
        {
          name: "Mongoose Documentation",
          type: "Documentation",
          link: "https://mongoosejs.com/docs/",
        },
        {
          name: "MongoDB Full Course",
          type: "Video",
          link: "https://www.youtube.com/results?search_query=mongodb+mongoose+full+course",
        },
      ],
      project: "Connect MongoDB with Your REST API",
    },

    {
      week: "Week 5",
      title: "Git & GitHub",
      duration: "7 Days",
      level: "Beginner → Intermediate",
      skills: [
        "Git Basics",
        "git init",
        "git add",
        "git commit",
        "git branch",
        "git merge",
        "GitHub Repository",
        "Pull Requests",
      ],
      resources: [
        {
          name: "Git Documentation",
          type: "Documentation",
          link: "https://git-scm.com/doc",
        },
        {
          name: "GitHub Skills",
          type: "Practice",
          link: "https://skills.github.com/",
        },
        {
          name: "Git & GitHub Course",
          type: "Video",
          link: "https://www.youtube.com/results?search_query=git+github+full+course+for+beginners",
        },
      ],
      project: "Upload and Manage Your MERN Project on GitHub",
    },

    {
      week: "Week 6",
      title: "Complete MERN Project",
      duration: "7 Days",
      level: "Intermediate → Advanced",
      skills: [
        "React Frontend",
        "Node.js Backend",
        "Express API",
        "MongoDB",
        "Authentication",
        "JWT",
        "API Integration",
        "Deployment",
      ],
      resources: [
        {
          name: "MERN Stack Tutorial",
          type: "Video",
          link: "https://www.youtube.com/watch?v=7l5UgtWfnw0",
        },
        {
          name: "MongoDB MERN Guide",
          type: "Documentation",
          link: "https://www.mongodb.com/resources/languages/mern-stack",
        },
      ],
      project: "Build a Complete Job Portal / Skill Gap Detector",
    },
  ];

  const machineLearningRoadmap = [
    { week: "Week 1", title: "Python, NumPy and data foundations", duration: "7 Days", level: "Beginner", skills: ["Python syntax", "Functions & modules", "NumPy arrays", "Pandas DataFrames", "Jupyter notebooks", "Git basics"], resources: [{ name: "Python Tutorial", type: "Documentation", link: "https://docs.python.org/3/tutorial/" }, { name: "NumPy Learn", type: "Documentation", link: "https://numpy.org/learn/" }, { name: "Pandas Getting Started", type: "Documentation", link: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/" }], project: "Analyse and clean a public CSV dataset in a notebook" },
    { week: "Week 2", title: "Statistics, EDA and visualisation", duration: "7 Days", level: "Beginner → Intermediate", skills: ["Descriptive statistics", "Distributions", "Correlation vs causation", "Missing values", "Outliers", "Matplotlib & Seaborn"], resources: [{ name: "scikit-learn Data Preprocessing", type: "Documentation", link: "https://scikit-learn.org/stable/modules/preprocessing.html" }, { name: "Matplotlib Tutorials", type: "Documentation", link: "https://matplotlib.org/stable/tutorials/index.html" }], project: "Create an EDA report with meaningful charts and written findings" },
    { week: "Week 3", title: "Supervised machine learning", duration: "7 Days", level: "Intermediate", skills: ["Train/test split", "Linear regression", "Logistic regression", "Decision trees", "Feature scaling", "Cross-validation"], resources: [{ name: "scikit-learn Supervised Learning", type: "Documentation", link: "https://scikit-learn.org/stable/supervised_learning.html" }, { name: "Model Selection Guide", type: "Documentation", link: "https://scikit-learn.org/stable/model_selection.html" }], project: "Train and compare regression and classification baselines" },
    { week: "Week 4", title: "Evaluation and model improvement", duration: "7 Days", level: "Intermediate", skills: ["Precision & recall", "F1 and ROC-AUC", "Confusion matrix", "Imbalanced data", "Regularisation", "Hyperparameter tuning"], resources: [{ name: "scikit-learn Model Evaluation", type: "Documentation", link: "https://scikit-learn.org/stable/modules/model_evaluation.html" }, { name: "scikit-learn Pipelines", type: "Documentation", link: "https://scikit-learn.org/stable/modules/compose.html" }], project: "Build an imbalanced classification model and justify the metric" },
    { week: "Week 5", title: "Deep learning and modern AI", duration: "7 Days", level: "Intermediate → Advanced", skills: ["Neural networks", "Backpropagation", "CNN basics", "Transformers & attention", "Embeddings", "RAG concepts"], resources: [{ name: "PyTorch Tutorials", type: "Documentation", link: "https://pytorch.org/tutorials/" }, { name: "Hugging Face Course", type: "Course", link: "https://huggingface.co/learn" }], project: "Train a small neural network and document its evaluation" },
    { week: "Week 6", title: "MLOps, deployment and portfolio", duration: "7 Days", level: "Advanced", skills: ["FastAPI", "Model serialisation", "Docker", "Experiment tracking", "Data drift", "Monitoring"], resources: [{ name: "FastAPI Tutorial", type: "Documentation", link: "https://fastapi.tiangolo.com/tutorial/" }, { name: "Docker Get Started", type: "Documentation", link: "https://docs.docker.com/get-started/" }], project: "Deploy an end-to-end model API with a README, tests, and monitoring plan" },
  ];

  const frontendRoadmap = [
    { week: "Week 1", title: "HTML, CSS and accessibility", duration: "7 Days", level: "Beginner", skills: ["Semantic HTML", "Forms", "Box model", "Flexbox & Grid", "Responsive design", "ARIA basics"], resources: [{ name: "MDN HTML Guide", type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML" }, { name: "MDN CSS Guide", type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Learn/CSS" }], project: "Build an accessible, responsive portfolio landing page" },
    { week: "Week 2", title: "JavaScript core and browser APIs", duration: "7 Days", level: "Beginner → Intermediate", skills: ["Scope & closures", "this and prototypes", "Arrays", "Promises", "async/await", "DOM events", "Fetch API"], resources: [{ name: "MDN JavaScript Guide", type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" }, { name: "JavaScript.info", type: "Practice", link: "https://javascript.info/" }], project: "Build a searchable API-powered movie browser" },
    { week: "Week 3", title: "React foundations", duration: "7 Days", level: "Intermediate", skills: ["Components", "Props & state", "useState", "useEffect", "Controlled forms", "Lists & keys", "Custom hooks"], resources: [{ name: "React Learn", type: "Documentation", link: "https://react.dev/learn" }], project: "Build a task manager with add, edit, delete, and completion states" },
    { week: "Week 4", title: "React architecture and routing", duration: "7 Days", level: "Intermediate", skills: ["React Router", "Context API", "useMemo", "useCallback", "useRef", "Lazy loading", "Error states"], resources: [{ name: "React Router Docs", type: "Documentation", link: "https://reactrouter.com/" }, { name: "React Performance", type: "Documentation", link: "https://react.dev/learn/render-and-commit" }], project: "Create a multi-page dashboard with protected routes and shared state" },
    { week: "Week 5", title: "Performance and web security", duration: "7 Days", level: "Intermediate", skills: ["Core Web Vitals", "Bundle splitting", "Memoization", "CORS", "Cookies vs storage", "XSS & CSRF"], resources: [{ name: "web.dev Performance", type: "Documentation", link: "https://web.dev/learn/performance/" }, { name: "OWASP Top 10", type: "Documentation", link: "https://owasp.org/www-project-top-ten/" }], project: "Audit and optimise a React app for performance and accessibility" },
    { week: "Week 6", title: "Frontend portfolio project", duration: "7 Days", level: "Advanced", skills: ["Design system", "API integration", "Testing", "Accessibility audit", "Deployment", "Project explanation"], resources: [{ name: "Vite Deployment Guide", type: "Documentation", link: "https://vite.dev/guide/static-deploy.html" }], project: "Deploy a polished, accessible React product dashboard" },
  ];

  const backendRoadmap = [
    { week: "Week 1", title: "HTTP, REST and Node.js foundations", duration: "7 Days", level: "Beginner", skills: ["HTTP methods", "Status codes", "REST principles", "Node modules", "Async I/O", "Environment variables"], resources: [{ name: "MDN HTTP", type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }, { name: "Node.js Docs", type: "Documentation", link: "https://nodejs.org/docs/latest/api/" }], project: "Build a small JSON API with Node.js" },
    { week: "Week 2", title: "Express APIs and validation", duration: "7 Days", level: "Intermediate", skills: ["Routing", "Middleware", "Error handling", "Validation", "Pagination", "API testing"], resources: [{ name: "Express Guide", type: "Documentation", link: "https://expressjs.com/en/guide/routing.html" }], project: "Build a documented CRUD API with validation and tests" },
    { week: "Week 3", title: "Databases and query performance", duration: "7 Days", level: "Intermediate", skills: ["SQL joins", "Indexes", "Transactions", "Normalization", "MongoDB documents", "Query optimisation"], resources: [{ name: "PostgreSQL Tutorial", type: "Documentation", link: "https://www.postgresql.org/docs/current/tutorial.html" }, { name: "MongoDB Docs", type: "Documentation", link: "https://www.mongodb.com/docs/" }], project: "Design a data model and implement efficient repository queries" },
    { week: "Week 4", title: "Authentication and API security", duration: "7 Days", level: "Intermediate", skills: ["Hashing", "JWT", "Sessions", "Authorization", "Rate limiting", "SQL injection prevention"], resources: [{ name: "OWASP API Security", type: "Documentation", link: "https://owasp.org/www-project-api-security/" }], project: "Secure an API with role-based access and rate limits" },
    { week: "Week 5", title: "Scalable backend architecture", duration: "7 Days", level: "Advanced", skills: ["Caching", "Redis", "Queues", "Load balancing", "Idempotency", "Observability"], resources: [{ name: "Redis Docs", type: "Documentation", link: "https://redis.io/docs/latest/" }], project: "Add cache and background processing to an API" },
    { week: "Week 6", title: "Backend capstone and deployment", duration: "7 Days", level: "Advanced", skills: ["Docker", "CI/CD basics", "Logging", "Monitoring", "Deployment", "Architecture explanation"], resources: [{ name: "Docker Get Started", type: "Documentation", link: "https://docs.docker.com/get-started/" }], project: "Deploy a production-ready URL shortener with metrics" },
  ];

  const dataAnalystRoadmap = [
    { week: "Week 1", title: "Excel and business data basics", duration: "7 Days", level: "Beginner", skills: ["Formulas", "XLOOKUP", "INDEX-MATCH", "Pivot tables", "Conditional formatting", "Data types"], resources: [{ name: "Microsoft Excel Help", type: "Documentation", link: "https://support.microsoft.com/excel" }], project: "Build an Excel sales analysis workbook with pivot summaries" },
    { week: "Week 2", title: "SQL for analysis", duration: "7 Days", level: "Beginner → Intermediate", skills: ["SELECT & WHERE", "JOINs", "GROUP BY", "HAVING", "CTEs", "Window functions"], resources: [{ name: "PostgreSQL Tutorial", type: "Documentation", link: "https://www.postgresql.org/docs/current/tutorial.html" }], project: "Answer business questions from a sales database using SQL" },
    { week: "Week 3", title: "Statistics and experimentation", duration: "7 Days", level: "Intermediate", skills: ["Central tendency", "Variance", "Probability", "Confidence intervals", "Hypothesis tests", "A/B testing"], resources: [{ name: "Khan Academy Statistics", type: "Course", link: "https://www.khanacademy.org/math/statistics-probability" }], project: "Analyse an A/B test and make a recommendation" },
    { week: "Week 4", title: "Python and data cleaning", duration: "7 Days", level: "Intermediate", skills: ["Pandas", "NumPy", "groupby", "merge", "Missing values", "Outlier handling"], resources: [{ name: "Pandas Getting Started", type: "Documentation", link: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/" }], project: "Clean, join, and analyse a messy multi-table dataset" },
    { week: "Week 5", title: "Visualisation and dashboards", duration: "7 Days", level: "Intermediate", skills: ["Chart selection", "Matplotlib", "Seaborn", "Power BI/Tableau", "KPIs", "Dashboard design"], resources: [{ name: "Matplotlib Tutorials", type: "Documentation", link: "https://matplotlib.org/stable/tutorials/index.html" }], project: "Create an executive dashboard for a business funnel" },
    { week: "Week 6", title: "Analytics portfolio case study", duration: "7 Days", level: "Advanced", skills: ["EDA workflow", "Funnel analysis", "Storytelling", "Recommendations", "Documentation", "Presentation"], resources: [{ name: "GitHub Skills", type: "Practice", link: "https://skills.github.com/" }], project: "Publish an end-to-end sales-drop investigation and dashboard" },
  ];

  const roadmaps = {
    "Frontend Developer": frontendRoadmap,
    "Backend Developer": backendRoadmap,
    "MERN Stack Developer": mernRoadmap,
    "MERN Developer": mernRoadmap,
    "Data Analyst": dataAnalystRoadmap,
    "Machine Learning Engineer": machineLearningRoadmap,
  };
  const roadmap = roadmaps[selectedJob] || mernRoadmap;

  const progress = Math.round((completedWeeks.length / roadmap.length) * 100);
  const toggleWeek = (week) => {
    setCompletedWeeks((current) => {
      const next = current.includes(week) ? current.filter((item) => item !== week) : [...current, week];
      localStorage.setItem(progressKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="roadmap-page">
      

      <main className="roadmap-container">

        {/* Header */}
        <section className="roadmap-header">
          <div>
            <span className="roadmap-badge">🤖 AI PERSONALIZED ROADMAP</span>

            <h1>Your Career Roadmap</h1>

            <p>
              Follow this step-by-step roadmap to become job-ready for your
              selected career.
            </p>
          </div>

          <div className="target-job-box">
            <span>Target Job</span>
            <strong>{selectedJob}</strong>
            <small>{roadmap.length} Week Roadmap</small>
          </div>
        </section>

        {/* Progress */}
        <section className="roadmap-progress-card">
          <div className="progress-top">
            <div>
              <h3>Overall Roadmap Progress</h3>
              <p>Start learning and complete each milestone.</p>
            </div>

            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="progress-info">
            <span>{completedWeeks.length} of {roadmap.length} weeks completed</span>
            <span>🎯 Goal: Job Ready</span>
          </div>
        </section>

        {/* Roadmap */}
        <section className="roadmap-section">

          <div className="section-heading">
            <div>
              <span className="section-label">YOUR LEARNING PATH</span>
              <h2>{roadmap.length}-Week {selectedJob} Roadmap</h2>
            </div>

            <span className="roadmap-count">
              {roadmap.length} Milestones
            </span>
          </div>

          <div className="timeline">

            {roadmap.map((item, index) => (
              <div className={`timeline-item ${completedWeeks.includes(item.week) ? "completed" : ""}`} key={item.week}>

                {/* Timeline */}
                <div className="timeline-marker">
                  <span>{index + 1}</span>
                </div>

                <div className="timeline-content">

                  {/* Week Header */}
                  <div className="week-card-header">
                    <div>
                      <span className="week-label">{item.week}</span>
                      <h3>{item.title}</h3>
                    </div>

                    <div className="week-meta">
                      <span>⏱ {item.duration}</span>
                      <span>📈 {item.level}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="roadmap-block">
                    <h4>📚 Skills to Learn</h4>

                    <div className="skill-list">
                      {item.skills.map((skill) => (
                        <span className="skill-tag" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="roadmap-block">
                    <h4>🔗 Recommended Resources</h4>

                    <div className="resource-list">
                      {item.resources.map((resource) => (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="roadmap-resource"
                          key={resource.name}
                        >
                          <div>
                            <strong>{resource.name}</strong>
                            <span>{resource.type}</span>
                          </div>

                          <span className="resource-arrow">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Project */}
                  <div className="project-box">
                    <div className="project-icon">💻</div>

                    <div>
                      <span>PROJECT</span>
                      <strong>{item.project}</strong>
                    </div>
                  </div>

                  {/* Week Button */}
                  <button className="complete-week-btn" onClick={() => toggleWeek(item.week)} aria-pressed={completedWeeks.includes(item.week)}>
                    {completedWeeks.includes(item.week) ? "✓ Week Completed" : "○ Mark Week Complete"}
                  </button>

                </div>
              </div>
            ))}

          </div>
        </section>

        {/* AI Recommendation */}
        <section className="ai-roadmap-card">

          <div className="ai-icon">🤖</div>

          <div className="ai-content">
            <span>AI RECOMMENDATION</span>

            <h3>Start with your highest-priority skill gaps</h3>

            <p>
              Review your Skill Gap Analysis, then complete the earliest relevant
              milestone before moving on. Your completed weeks are saved locally.
            </p>

            <Link to="/skill-gap" className="ai-link">
              View Your Skill Gaps →
            </Link>
          </div>

        </section>

        {/* Bottom Actions */}
        <section className="roadmap-actions">

          <Link to="/skill-gap" className="secondary-action">
            ← Back to Skill Gaps
          </Link>

          <Link to="/daily-plan" className="primary-action">
            View Daily Learning Plan →
          </Link>

        </section>

      </main>
    </div>
  );
}

export default Roadmap;
