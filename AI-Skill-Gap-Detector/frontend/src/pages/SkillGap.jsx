import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/skillgap.css";

const SkillGap = () => {
  const navigate = useNavigate();

  const skillGaps = [
    {
      skill: "JavaScript",
      current: 55,
      required: 85,
      priority: "High",
      status: "Needs Improvement",
    },
    {
      skill: "React.js",
      current: 40,
      required: 80,
      priority: "High",
      status: "Needs Improvement",
    },
    {
      skill: "Node.js",
      current: 50,
      required: 75,
      priority: "Medium",
      status: "Improve",
    },
    {
      skill: "MongoDB",
      current: 65,
      required: 75,
      priority: "Low",
      status: "Almost Ready",
    },
    {
      skill: "Git & GitHub",
      current: 75,
      required: 80,
      priority: "Low",
      status: "Good",
    },
  ];

  return (
    <div className="skill-gap-page">
      
      {/* Header */}
      <section className="skill-gap-header">
        <p className="page-label">AI SKILL ANALYSIS</p>

        <h1>Your Skill Gap Analysis</h1>

        <p>
          Based on your assessment and selected career goal,
          here are the skills you need to improve.
        </p>

        <div className="job-badge">
          Target Job: <strong>MERN Developer</strong>
        </div>
      </section>

      {/* Summary */}
      <section className="skill-summary">
        <div className="summary-card">
          <span>Overall Score</span>
          <h2>68%</h2>
          <p>Current Skill Level</p>
        </div>

        <div className="summary-card">
          <span>Skill Gaps</span>
          <h2>5</h2>
          <p>Skills to Improve</p>
        </div>

        <div className="summary-card">
          <span>High Priority</span>
          <h2>2</h2>
          <p>Important Skills</p>
        </div>

        <div className="summary-card">
          <span>Job Readiness</span>
          <h2>68%</h2>
          <p>Keep Improving</p>
        </div>
      </section>

      {/* Skill Gap List */}
      <section className="skill-gap-section">
        <div className="section-heading">
          <h2>Skills Analysis</h2>
          <p>Current level vs required level for your target job.</p>
        </div>

        <div className="skill-list">
          {skillGaps.map((item, index) => (
            <div className="skill-gap-card" key={index}>
              <div className="skill-top">
                <div>
                  <h3>{item.skill}</h3>
                  <span className={`priority ${item.priority.toLowerCase()}`}>
                    {item.priority} Priority
                  </span>
                </div>

                <div className="skill-percent">
                  {item.current}%
                </div>
              </div>

              <div className="skill-info">
                <span>Current: {item.current}%</span>
                <span>Required: {item.required}%</span>
              </div>

              <div className="progress-background">
                <div
                  className="progress-current"
                  style={{ width: `${item.current}%` }}
                ></div>

                <div
                  className="progress-required"
                  style={{ width: `${item.required}%` }}
                ></div>
              </div>

              <div className="skill-bottom">
                <span className="status">
                  {item.status}
                </span>

                <span className="gap">
                  Gap: {Math.max(item.required - item.current, 0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendation */}
      <section className="ai-recommendation">
        <div className="ai-icon">🤖</div>

        <div>
          <h2>AI Recommendation</h2>

          <p>
            Focus first on <strong>JavaScript</strong> and{" "}
            <strong>React.js</strong>. These are high-priority
            skills for your MERN Developer goal.
          </p>

          <p>
            After improving these skills, continue with Node.js
            and MongoDB through practical projects.
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className="skill-gap-actions">
        <button
          className="secondary-btn"
          onClick={() => navigate("/assessment/result")}
        >
          ← Assessment Result
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/roadmap")}
        >
          Generate AI Roadmap →
        </button>
      </section>
    </div>
  );
};

export default SkillGap;
