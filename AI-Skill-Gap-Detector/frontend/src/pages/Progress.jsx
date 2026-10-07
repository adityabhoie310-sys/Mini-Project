import React from "react";
import Navbar from "../components/Navbar";
import "../styles/progress.css";

function Progress() {
  const progressData = {
    readiness: 68,
    technical: 72,
    reasoning: 84,
    aptitude: 68,
    roadmap: 42,
    dailyPlan: 35,
    projects: 2,
  };

  return (
    <div className="progress-page">
      <Navbar />

      <main className="progress-container">

        {/* Header */}
        <section className="progress-header">
          <div>
            <p className="progress-label">YOUR LEARNING JOURNEY</p>
            <h1>My Progress</h1>
            <p>
              Track your skills, assessments, roadmap and overall job readiness.
            </p>
          </div>

          <div className="target-job">
            <span>Target Job</span>
            <strong>MERN Developer</strong>
          </div>
        </section>

        {/* Readiness Score */}
        <section className="readiness-card">

          <div className="readiness-score">
            <div className="score-circle">
              <div>
                <strong>{progressData.readiness}%</strong>
                <span>Ready</span>
              </div>
            </div>
          </div>

          <div className="readiness-content">
            <span className="section-tag">JOB READINESS</span>
            <h2>You're making good progress!</h2>

            <p>
              Your current skills are developing well. Continue working on
              your high-priority skill gaps to become job-ready.
            </p>

            <div className="readiness-bar">
              <div
                className="readiness-fill"
                style={{ width: `${progressData.readiness}%` }}
              ></div>
            </div>

            <div className="readiness-info">
              <span>Current: {progressData.readiness}%</span>
              <span>Target: 90%</span>
            </div>
          </div>

        </section>

        {/* Statistics */}
        <section className="progress-stats">

          <div className="progress-stat-card">
            <div className="stat-icon blue">✓</div>
            <div>
              <strong>100</strong>
              <span>Questions Attempted</span>
            </div>
          </div>

          <div className="progress-stat-card">
            <div className="stat-icon green">★</div>
            <div>
              <strong>75%</strong>
              <span>Assessment Score</span>
            </div>
          </div>

          <div className="progress-stat-card">
            <div className="stat-icon purple">↗</div>
            <div>
              <strong>5</strong>
              <span>Skills Improved</span>
            </div>
          </div>

          <div className="progress-stat-card">
            <div className="stat-icon orange">◆</div>
            <div>
              <strong>{progressData.projects}</strong>
              <span>Projects Completed</span>
            </div>
          </div>

        </section>

        {/* Assessment Progress */}
        <section className="progress-section">

          <div className="section-heading">
            <div>
              <span className="section-tag">ASSESSMENT</span>
              <h2>Assessment Performance</h2>
            </div>

            <span className="overall-score">Overall 75%</span>
          </div>

          <div className="assessment-progress">

            <div className="assessment-item">
              <div className="assessment-top">
                <span>Technical Skills</span>
                <strong>{progressData.technical}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill blue-fill"
                  style={{ width: `${progressData.technical}%` }}
                ></div>
              </div>

              <small>50 questions</small>
            </div>

            <div className="assessment-item">
              <div className="assessment-top">
                <span>Logical Reasoning</span>
                <strong>{progressData.reasoning}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill green-fill"
                  style={{ width: `${progressData.reasoning}%` }}
                ></div>
              </div>

              <small>25 questions</small>
            </div>

            <div className="assessment-item">
              <div className="assessment-top">
                <span>Aptitude</span>
                <strong>{progressData.aptitude}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill purple-fill"
                  style={{ width: `${progressData.aptitude}%` }}
                ></div>
              </div>

              <small>25 questions</small>
            </div>

          </div>
        </section>

        {/* Learning Progress */}
        <section className="progress-section">

          <div className="section-heading">
            <div>
              <span className="section-tag">LEARNING</span>
              <h2>Learning Progress</h2>
            </div>
          </div>

          <div className="learning-grid">

            {/* Roadmap */}
            <div className="learning-card">

              <div className="learning-card-header">
                <div className="learning-icon blue-icon">🗺</div>

                <div>
                  <h3>Career Roadmap</h3>
                  <p>6-week MERN roadmap</p>
                </div>

                <strong>{progressData.roadmap}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill blue-fill"
                  style={{ width: `${progressData.roadmap}%` }}
                ></div>
              </div>

              <p className="progress-detail">
                2 of 6 weeks completed
              </p>

            </div>

            {/* Daily Plan */}
            <div className="learning-card">

              <div className="learning-card-header">
                <div className="learning-icon green-icon">📅</div>

                <div>
                  <h3>Daily Learning Plan</h3>
                  <p>42-day learning plan</p>
                </div>

                <strong>{progressData.dailyPlan}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill green-fill"
                  style={{ width: `${progressData.dailyPlan}%` }}
                ></div>
              </div>

              <p className="progress-detail">
                15 of 42 days completed
              </p>

            </div>

          </div>
        </section>

        {/* Skill Improvement */}
        <section className="progress-section">

          <div className="section-heading">
            <div>
              <span className="section-tag">SKILLS</span>
              <h2>Skill Improvement</h2>
            </div>
          </div>

          <div className="skills-table">

            <div className="skill-row skill-header">
              <span>Skill</span>
              <span>Before</span>
              <span>Current</span>
              <span>Target</span>
              <span>Progress</span>
            </div>

            <div className="skill-row">
              <span className="skill-name">JavaScript</span>
              <span>55%</span>
              <span>70%</span>
              <span>85%</span>

              <div className="mini-progress">
                <div style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="skill-row">
              <span className="skill-name">React.js</span>
              <span>40%</span>
              <span>60%</span>
              <span>80%</span>

              <div className="mini-progress">
                <div style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="skill-row">
              <span className="skill-name">Node.js</span>
              <span>50%</span>
              <span>65%</span>
              <span>75%</span>

              <div className="mini-progress">
                <div style={{ width: "60%" }}></div>
              </div>
            </div>

            <div className="skill-row">
              <span className="skill-name">MongoDB</span>
              <span>65%</span>
              <span>72%</span>
              <span>75%</span>

              <div className="mini-progress">
                <div style={{ width: "70%" }}></div>
              </div>
            </div>

          </div>
        </section>

        {/* Weekly Activity */}
        <section className="progress-section">

          <div className="section-heading">
            <div>
              <span className="section-tag">ACTIVITY</span>
              <h2>Weekly Learning Activity</h2>
            </div>
          </div>

          <div className="weekly-chart">

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "55%" }}></div>
              <span>Mon</span>
            </div>

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "75%" }}></div>
              <span>Tue</span>
            </div>

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "45%" }}></div>
              <span>Wed</span>
            </div>

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "85%" }}></div>
              <span>Thu</span>
            </div>

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "65%" }}></div>
              <span>Fri</span>
            </div>

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "90%" }}></div>
              <span>Sat</span>
            </div>

            <div className="chart-day">
              <div className="chart-bar" style={{ height: "30%" }}></div>
              <span>Sun</span>
            </div>

          </div>

        </section>

        {/* Bottom CTA */}
        <section className="progress-cta">

          <div>
            <span className="section-tag">NEXT STEP</span>
            <h2>Keep improving your skills 🚀</h2>
            <p>
              Follow your roadmap and complete your daily learning tasks
              to increase your job readiness score.
            </p>
          </div>

          <div className="cta-buttons">
            <a href="/roadmap" className="primary-btn">
              Continue Roadmap →
            </a>

            <a href="/skill-gap" className="secondary-btn">
              View Skill Gaps
            </a>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Progress;
