import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/assessmentResult.css";

function calculateScore(answers, questions) {
  if (!questions.length) return 0;

  let correct = 0;

  questions.forEach((question) => {
    if (answers[question.id] === question.answer) {
      correct++;
    }
  });

  return Math.round((correct / questions.length) * 100);
}

/*
  Temporary question data for score calculation.
  Later these questions will come from MongoDB.
*/

const technicalQuestions = [
  {
    id: 1,
    answer: "HTML",
  },
  {
    id: 2,
    answer: "const",
  },
  {
    id: 3,
    answer: "JSON.parse()",
  },
  {
    id: 4,
    answer: "MongoDB",
  },
  {
    id: 5,
    answer: "git init",
  },
  {
    id: 6,
    answer: "CSS",
  },
  {
    id: 7,
    answer: "Application Programming Interface",
  },
  {
    id: 8,
    answer: "//",
  },
  {
    id: 9,
    answer: "git pull",
  },
  {
    id: 10,
    answer: "Router",
  },
];

const reasoningQuestions = [
  {
    id: 1,
    answer: "32",
  },
  {
    id: 2,
    answer: "48",
  },
  {
    id: 3,
    answer: "25",
  },
  {
    id: 4,
    answer: "EPH",
  },
  {
    id: 5,
    answer: "NBOHP",
  },
  {
    id: 6,
    answer: "OPSUI",
  },
  {
    id: 7,
    answer: "Son",
  },
  {
    id: 8,
    answer: "Brother",
  },
  {
    id: 9,
    answer: "Grandmother",
  },
  {
    id: 10,
    answer: "All cats need food",
  },
  {
    id: 11,
    answer: "All books are materials",
  },
  {
    id: 12,
    answer: "Some students are fit",
  },
  {
    id: 13,
    answer: "No roses are stones",
  },
  {
    id: 14,
    answer: "North-East",
  },
  {
    id: 15,
    answer: "South",
  },
  {
    id: 16,
    answer: "C",
  },
  {
    id: 17,
    answer: "Sameer",
  },
  {
    id: 18,
    answer: "Carrot",
  },
  {
    id: 19,
    answer: "Cube",
  },
  {
    id: 20,
    answer: "15",
  },
  {
    id: 21,
    answer: "EV",
  },
  {
    id: 22,
    answer: "IJ",
  },
  {
    id: 23,
    answer: "All laptops are computers",
  },
  {
    id: 24,
    answer: "90°",
  },
  {
    id: 25,
    answer: "Thursday",
  },
];

const aptitudeQuestions = [
  {
    id: 1,
    answer: "60",
  },
  {
    id: 2,
    answer: "25%",
  },
  {
    id: 3,
    answer: "25%",
  },
  {
    id: 4,
    answer: "140",
  },
  {
    id: 5,
    answer: "20%",
  },
  {
    id: 6,
    answer: "10%",
  },
  {
    id: 7,
    answer: "₹1,150",
  },
  {
    id: 8,
    answer: "₹1,800",
  },
  {
    id: 9,
    answer: "20",
  },
  {
    id: 10,
    answer: "₹240",
  },
  {
    id: 11,
    answer: "₹160",
  },
  {
    id: 12,
    answer: "8:3",
  },
  {
    id: 13,
    answer: "1/10",
  },
  {
    id: 14,
    answer: "4 days",
  },
  {
    id: 15,
    answer: "6 days",
  },
  {
    id: 16,
    answer: "24 days",
  },
  {
    id: 17,
    answer: "180 km",
  },
  {
    id: 18,
    answer: "60 km/h",
  },
  {
    id: 19,
    answer: "3 hours",
  },
  {
    id: 20,
    answer: "3 km",
  },
  {
    id: 21,
    answer: "1/2",
  },
  {
    id: 22,
    answer: "1/6",
  },
  {
    id: 23,
    answer: "3/5",
  },
  {
    id: 24,
    answer: "30",
  },
  {
    id: 25,
    answer: "25",
  },
];

function AssessmentResult() {
  const navigate = useNavigate();

  const technicalAnswers = JSON.parse(
    localStorage.getItem("technicalAssessmentAnswers") || "{}"
  );

  const reasoningAnswers = JSON.parse(
    localStorage.getItem("reasoningAssessmentAnswers") || "{}"
  );

  const aptitudeAnswers = JSON.parse(
    localStorage.getItem("aptitudeAssessmentAnswers") || "{}"
  );

  const technicalScore = calculateScore(
    technicalAnswers,
    technicalQuestions
  );

  const reasoningScore = calculateScore(
    reasoningAnswers,
    reasoningQuestions
  );

  const aptitudeScore = calculateScore(
    aptitudeAnswers,
    aptitudeQuestions
  );

  const overallScore = Math.round(
    (technicalScore + reasoningScore + aptitudeScore) / 3
  );

  const getLevel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  };

  const getMessage = (score) => {
    if (score >= 80) {
      return "Excellent performance! You are showing strong job-ready skills.";
    }

    if (score >= 60) {
      return "Good performance! You have a solid foundation, but some skills need improvement.";
    }

    if (score >= 40) {
      return "You have a basic foundation. Focus on your weak areas to become job-ready.";
    }

    return "You need more practice. Your personalized roadmap will help you improve.";
  };

  const restartAssessment = () => {
    localStorage.removeItem("technicalAssessmentAnswers");
    localStorage.removeItem("reasoningAssessmentAnswers");
    localStorage.removeItem("aptitudeAssessmentAnswers");

    navigate("/assessment");
  };

  return (
    <div className="assessment-result-page">

      {/* Header */}
      <header className="result-header">
        <div>
          <span className="result-label">
            Assessment Completed
          </span>

          <h1>Your Assessment Results</h1>

          <p>
            Here is your current skill assessment based on your answers.
          </p>
        </div>
      </header>

      {/* Overall Score */}
      <section className="overall-result">

        <div className="score-circle">
          <strong>{overallScore}%</strong>
          <span>Overall Score</span>
        </div>

        <div className="overall-content">
          <span className="level-badge">
            {getLevel(overallScore)}
          </span>

          <h2>{getMessage(overallScore)}</h2>

          <p>
            Your results will be used to identify skill gaps and
            generate a personalized AI career roadmap.
          </p>
        </div>

      </section>

      {/* Section Scores */}
      <section className="score-section">

        <h2>Assessment Breakdown</h2>

        <div className="score-grid">

          {/* Technical */}
          <div className="score-card technical-score">

            <div className="score-card-top">
              <div className="score-icon">💻</div>

              <div>
                <h3>Technical Skills</h3>
                <span>50 Questions</span>
              </div>
            </div>

            <div className="large-score">
              {technicalScore}%
            </div>

            <div className="score-bar">
              <div
                style={{
                  width: `${technicalScore}%`,
                }}
              />
            </div>

            <p>
              Programming, Web Development, Database,
              Git & GitHub
            </p>

          </div>

          {/* Reasoning */}
          <div className="score-card reasoning-score">

            <div className="score-card-top">
              <div className="score-icon">🧠</div>

              <div>
                <h3>Logical Reasoning</h3>
                <span>25 Questions</span>
              </div>
            </div>

            <div className="large-score">
              {reasoningScore}%
            </div>

            <div className="score-bar">
              <div
                style={{
                  width: `${reasoningScore}%`,
                }}
              />
            </div>

            <p>
              Number Series, Coding-Decoding, Blood Relations,
              Syllogism & Logical Puzzles
            </p>

          </div>

          {/* Aptitude */}
          <div className="score-card aptitude-score">

            <div className="score-card-top">
              <div className="score-icon">📊</div>

              <div>
                <h3>Aptitude</h3>
                <span>25 Questions</span>
              </div>
            </div>

            <div className="large-score">
              {aptitudeScore}%
            </div>

            <div className="score-bar">
              <div
                style={{
                  width: `${aptitudeScore}%`,
                }}
              />
            </div>

            <p>
              Percentage, Profit & Loss, Ratio,
              Time & Work, Probability
            </p>

          </div>

        </div>

      </section>

      {/* Next Steps */}
      <section className="result-next">

        <h2>What Happens Next?</h2>

        <div className="next-grid">

          <div>
            <span>01</span>
            <h3>Analyze Skills</h3>
            <p>
              AI analyzes your strengths and weaknesses.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Find Skill Gaps</h3>
            <p>
              Your skills are compared with job requirements.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Generate Roadmap</h3>
            <p>
              AI creates a personalized learning roadmap.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>Become Job Ready</h3>
            <p>
              Follow your roadmap and track your progress.
            </p>
          </div>

        </div>

      </section>

      {/* Actions */}
      <div className="result-actions">

        <button
          className="primary-result-btn"
          onClick={() => navigate("/skill-gap")}
        >
          View Skill Gaps →
        </button>

        <button
          className="secondary-result-btn"
          onClick={restartAssessment}
        >
          Retake Assessment
        </button>

      </div>

    </div>
  );
}

export default AssessmentResult;