
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/assessment.css";

function Assessment() {
  const navigate = useNavigate();


  const selectedJob = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("selectedJob") || "null"); } catch { return null; }
  }, []);
  const technicalTracks = {
    "Backend Developer": {
      questions: "5 Backend challenges",
      description: "Complete backend technical and coding exercises with automatic test-case scoring.",
      topics: ["HTTP, REST & authentication", "SQL/NoSQL & indexes", "Architecture, caching & queues", "Concurrency & rate limiting"],
    },
    "MERN Stack Developer": {
      questions: "5 MERN challenges",
      description: "Complete full-stack challenges covering MongoDB, Express, React, Node.js, and deployment decisions.",
      topics: ["MongoDB & Mongoose", "Express & JWT", "React API integration", "Node.js & full-stack architecture"],
    },
    "Data Analyst": {
      questions: "5 Data Analyst challenges",
      description: "Complete data analysis challenges with automatic test-case scoring.",
      topics: ["SQL aggregation", "Excel-style lookups", "Statistics & A/B testing", "Data cleaning & KPIs"],
    },
    "Machine Learning Engineer": {
      questions: "5 ML Engineer challenges",
      description: "Complete machine-learning challenges covering evaluation, optimisation, deep learning, and MLOps.",
      topics: ["ML fundamentals & metrics", "Deep learning", "Math & optimisation", "MLOps & deployment"],
    },
    "Frontend Developer": {
    questions: "5 Frontend challenges",
    description: "Complete frontend technical and coding exercises with automatic test-case scoring.",
    topics: ["JavaScript core & async", "Semantic HTML, CSS & accessibility", "React hooks & rendering", "Performance, browser APIs & security"],
    },
  };
  const trackName = selectedJob?.title || "Frontend Developer";
  const technicalTrack = technicalTracks[trackName] || technicalTracks["Frontend Developer"];

  const sections = [
    {
      id: 1,
      title: "Technical & Coding Skills",
      icon: "💻",
      questions: technicalTrack.questions,
      duration: "30 Minutes",
      description: technicalTrack.description,
      topics: technicalTrack.topics,
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
            This assessment contains five technical and coding challenges and 50
            reasoning and aptitude questions. Your results will identify skill gaps
            and generate your personalized AI career roadmap.
          </p>
        </div>

        <div className="assessment-total">
          <strong>55</strong>
          <span>Total Exercises</span>
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
            Start with the Technical & Coding assessment.
            You will begin with five practical {trackName.replace(" Developer", "")} challenges.
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
