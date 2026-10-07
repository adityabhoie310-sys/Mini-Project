
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/assessment.css";

function Assessment() {
  const navigate = useNavigate();

  const selectedJob = JSON.parse(
    localStorage.getItem("selectedJob")
  );

  const sections = [
    {
      id: 1,
      title: "Technical Skills",
      icon: "💻",
      questions: 50,
      duration: "45 Minutes",
      description:
        "Test your programming, web development, database, Git & GitHub, and job-specific technical skills.",
      topics: [
        "Programming",
        "Web Development",
        "Database",
        "Git & GitHub",
        "Job-specific Skills",
      ],
    },
    {
      id: 2,
      title: "Logical Reasoning",
      icon: "🧠",
      questions: 25,
      duration: "25 Minutes",
      description:
        "Evaluate your logical thinking, problem-solving, patterns, and reasoning ability.",
      topics: [
        "Number Series",
        "Coding-Decoding",
        "Blood Relations",
        "Syllogism",
        "Logical Puzzles",
        "Pattern Recognition",
      ],
    },
    {
      id: 3,
      title: "Aptitude",
      icon: "📊",
      questions: 25,
      duration: "30 Minutes",
      description:
        "Measure your quantitative and mathematical problem-solving skills.",
      topics: [
        "Quantitative Aptitude",
        "Percentage",
        "Profit & Loss",
        "Ratio & Proportion",
        "Time & Work",
        "Probability",
      ],
    },
  ];

  const startAssessment = () => {
    navigate("/assessment/technical");
  };

  return (
    <div className="assessment-page">

      {/* Header */}
      <header className="assessment-header">
        <div>
          <h1>Skill Assessment</h1>
          <p>
            Evaluate your current skills and discover your skill gaps.
          </p>
        </div>

        {selectedJob && (
          <div className="selected-job">
            <span>Target Job</span>
            <strong>{selectedJob.title}</strong>
          </div>
        )}
      </header>

      {/* Introduction */}
      <section className="assessment-intro">
        <div>
          <h2>Complete Your Assessment</h2>

          <p>
            This assessment contains 100 questions divided into three
            sections. Your results will be used to identify skill gaps
            and generate your personalized AI career roadmap.
          </p>
        </div>

        <div className="assessment-total">
          <strong>100</strong>
          <span>Total Questions</span>
        </div>
      </section>

      {/* Sections */}
      <section className="assessment-sections">

        {sections.map((section) => (
          <div className="assessment-section-card" key={section.id}>

            <div className="section-top">
              <div className="section-icon">
                {section.icon}
              </div>

              <div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            </div>

            <div className="section-info">

              <div>
                <span>Questions</span>
                <strong>{section.questions}</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>{section.duration}</strong>
              </div>

            </div>

            <div className="topics">

              <h4>Topics Covered</h4>

              <div className="topic-list">
                {section.topics.map((topic) => (
                  <span key={topic}>
                    ✓ {topic}
                  </span>
                ))}
              </div>

            </div>

          </div>
        ))}

      </section>

      {/* Rules */}
      <section className="assessment-rules">

        <h2>Assessment Rules</h2>

        <div className="rules-grid">

          <div>
            <span>✓</span>
            <p>Answer every question carefully.</p>
          </div>

          <div>
            <span>✓</span>
            <p>Each question has one correct answer.</p>
          </div>

          <div>
            <span>✓</span>
            <p>Do not refresh the page during the assessment.</p>
          </div>

          <div>
            <span>✓</span>
            <p>Your answers will be evaluated automatically.</p>
          </div>

          <div>
            <span>✓</span>
            <p>Results will identify your strong and weak skills.</p>
          </div>

          <div>
            <span>✓</span>
            <p>AI will generate your personalized roadmap.</p>
          </div>

        </div>

      </section>

      {/* Start */}
      <section className="assessment-start">

        <div>
          <h2>Ready to Start?</h2>

          <p>
            Start with the Technical Skills assessment.
            You will answer 50 questions.
          </p>
        </div>

        <button onClick={startAssessment}>
          Start Assessment →
        </button>

      </section>

    </div>
  );
}

export default Assessment;