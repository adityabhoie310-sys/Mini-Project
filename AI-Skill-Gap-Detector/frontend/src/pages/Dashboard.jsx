import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  let results = null;
  try {
    results = JSON.parse(localStorage.getItem("assessmentResults") || "null");
  } catch {
    results = null;
  }
  const name = user?.name || "there";
  const readiness = Number.isFinite(results?.overallScore) ? results.overallScore : 0;
  const assessmentComplete = Boolean(results?.completedAt);
  const assessmentLabel = assessmentComplete ? "Complete" : "Not started";
  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <header className="dashboard-navbar">
        <Link to="/" className="dashboard-logo">
          Skill<span>Gap AI</span>
        </Link>

        <div className="dashboard-user">
          <div className="user-avatar">{name.charAt(0).toUpperCase()}</div>
          <div>
            <h4>Welcome, {name}</h4>
            <p>Student</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-container">

        {/* Welcome */}
        <section className="dashboard-welcome">
          <div>
            <span className="welcome-label">AI Career Assistant</span>

            <h1>
              Welcome back, {name}! 👋
            </h1>

            <p>
              Discover your skill gaps and follow a personalized
              roadmap to become job-ready.
            </p>
          </div>

          <Link to="/select-job" className="start-button">
            {assessmentComplete ? "Retake Assessment →" : "Start Assessment →"}
          </Link>
        </section>

        {/* Stats */}
        <section className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div>
              <span>Job Readiness</span>
              <h2>{readiness}%</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div>
              <span>Assessment</span>
              <h2>{assessmentLabel}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🧠</div>
            <div>
              <span>Skills Assessed</span>
              <h2>{assessmentComplete ? 3 : 0}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🗺️</div>
            <div>
              <span>Roadmap Steps</span>
              <h2>4</h2>
            </div>
          </div>

        </section>

        {/* Assessment */}
        <section className="dashboard-grid">

          <div className="assessment-card">

            <div className="card-header">
              <div>
                <span className="section-label">Get Started</span>
                <h2>Complete Your Assessment</h2>
              </div>

              <span className="assessment-status">
                {assessmentLabel}
              </span>
            </div>

            <p>
              Take our comprehensive assessment to understand
              your current abilities and identify your skill gaps.
            </p>

            <div className="assessment-sections">

              <div className="assessment-item">
                <span>💻</span>
                <div>
                  <h4>Technical Skills</h4>
                  <p>3 practical challenges</p>
                </div>
              </div>

              <div className="assessment-item">
                <span>🧩</span>
                <div>
                  <h4>Logical Reasoning</h4>
                  <p>25 Questions</p>
                </div>
              </div>

              <div className="assessment-item">
                <span>📐</span>
                <div>
                  <h4>Aptitude</h4>
                  <p>25 Questions</p>
                </div>
              </div>

            </div>

            <Link to={assessmentComplete ? "/assessment/result" : "/select-job"} className="assessment-button">
              {assessmentComplete ? "View Results →" : "Start Assessment →"}
            </Link>

          </div>

          {/* Roadmap */}
          <div className="roadmap-preview">

            <div className="card-header">
              <div>
                <span className="section-label">Career Journey</span>
                <h2>Your Roadmap</h2>
              </div>
            </div>

            <div className="roadmap-steps">

              <div className="roadmap-step active">
                <div className="step-number">1</div>
                <div>
                  <h4>Take Assessment</h4>
                  <p>Understand your current skills</p>
                </div>
              </div>

              <div className="roadmap-line"></div>

              <div className="roadmap-step">
                <div className="step-number">2</div>
                <div>
                  <h4>Find Skill Gaps</h4>
                  <p>Discover what you need to learn</p>
                </div>
              </div>

              <div className="roadmap-line"></div>

              <div className="roadmap-step">
                <div className="step-number">3</div>
                <div>
                  <h4>AI Roadmap</h4>
                  <p>Get your personalized learning plan</p>
                </div>
              </div>

              <div className="roadmap-line"></div>

              <div className="roadmap-step">
                <div className="step-number">4</div>
                <div>
                  <h4>Become Job Ready</h4>
                  <p>Practice, improve and get hired</p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* Features */}
        <section className="quick-actions">

          <div className="section-title">
            <span>Explore</span>
            <h2>Quick Actions</h2>
          </div>

          <div className="action-grid">

            <Link to="/select-job" className="action-card">
              <span>🎯</span>
              <h3>Select Job</h3>
              <p>Choose your target career</p>
            </Link>

            <Link to="/resources" className="action-card">
              <span>📚</span>
              <h3>Resources</h3>
              <p>Browse curated learning resources</p>
            </Link>

            <Link to="/coding-practice" className="action-card">
              <span>💻</span>
              <h3>Coding Practice</h3>
              <p>Solve coding problems</p>
            </Link>

            <Link to="/daily-plan" className="action-card">
              <span>📅</span>
              <h3>Daily Plan</h3>
              <p>Follow your daily study plan</p>
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Dashboard;
