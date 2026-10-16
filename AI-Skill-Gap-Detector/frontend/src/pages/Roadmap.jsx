import React from "react";
import { Link } from "react-router-dom";
import "../styles/roadmap.css";

function Roadmap() {
  const roadmap = [
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
            <strong>MERN Developer</strong>
            <small>6 Week Roadmap</small>
          </div>
        </section>

        {/* Progress */}
        <section className="roadmap-progress-card">
          <div className="progress-top">
            <div>
              <h3>Overall Roadmap Progress</h3>
              <p>Start learning and complete each milestone.</p>
            </div>

            <strong>0%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "0%" }}
            ></div>
          </div>

          <div className="progress-info">
            <span>0 of 6 weeks completed</span>
            <span>🎯 Goal: Job Ready</span>
          </div>
        </section>

        {/* Roadmap */}
        <section className="roadmap-section">

          <div className="section-heading">
            <div>
              <span className="section-label">YOUR LEARNING PATH</span>
              <h2>6-Week MERN Developer Roadmap</h2>
            </div>

            <span className="roadmap-count">
              {roadmap.length} Milestones
            </span>
          </div>

          <div className="timeline">

            {roadmap.map((item, index) => (
              <div className="timeline-item" key={item.week}>

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
                  <button className="complete-week-btn">
                    ○ Mark Week Complete
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

            <h3>Focus on JavaScript and React first</h3>

            <p>
              Your current skill assessment shows that JavaScript and React
              need improvement. Complete Weeks 1 and 2 before moving to
              backend development.
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
