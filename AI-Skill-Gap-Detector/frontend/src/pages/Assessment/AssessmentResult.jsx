
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/assessmentResult.css";

const SKILLS = [
  { key: "HTML", name: "HTML" },
  { key: "CSS", name: "CSS" },
  { key: "JavaScript", name: "JavaScript" },
  { key: "React", name: "React.js" },
  { key: "Node.js", name: "Node.js" },
  { key: "Express.js", name: "Express.js" },
  { key: "MongoDB", name: "MongoDB" },
  { key: "REST API", name: "REST APIs" },
  { key: "Git", name: "Git & GitHub" },
];

const JOB_REQUIREMENTS = {
  "Full Stack Developer": {
    HTML: 4, CSS: 4, JavaScript: 5, React: 4, "Node.js": 4,
    "Express.js": 4, MongoDB: 4, "REST API": 4, Git: 4,
  },
  "Frontend Developer": {
    HTML: 5, CSS: 5, JavaScript: 5, React: 4, "Node.js": 2,
    "Express.js": 1, MongoDB: 1, "REST API": 3, Git: 4,
  },
  "Backend Developer": {
    HTML: 1, CSS: 1, JavaScript: 4, React: 1, "Node.js": 5,
    "Express.js": 5, MongoDB: 4, "REST API": 5, Git: 4,
  },
  "Data Scientist": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1, "Node.js": 1,
    "Express.js": 1, MongoDB: 3, "REST API": 3, Git: 4,
  },
  "Machine Learning Engineer": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1, "Node.js": 2,
    "Express.js": 2, MongoDB: 3, "REST API": 4, Git: 4,
  },
  "DevOps Engineer": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1, "Node.js": 2,
    "Express.js": 2, MongoDB: 2, "REST API": 3, Git: 5,
  },
  "Cloud Solutions Architect": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1, "Node.js": 2,
    "Express.js": 2, MongoDB: 3, "REST API": 4, Git: 4,
  },
};

const REASONING_ANSWERS = [
  "32", "48", "25", "EPH", "NBOHP", "OPSUI", "Son", "Brother",
  "Grandmother", "All cats need food", "All books are materials",
  "Some students are fit", "No roses are stones", "North-East",
  "South", "C", "Sameer", "Carrot", "Cube", "15", "EV", "IJ",
  "All laptops are computers", "90°", "Thursday",
];

const APTITUDE_ANSWERS = [
  "60", "25%", "25%", "140", "20%", "10%", "₹1,150", "₹1,800",
  "20", "₹240", "₹160", "8:3", "1/10", "4 days", "6 days",
  "24 days", "180 km", "60 km/h", "3 hours", "3 km", "1/2",
  "1/6", "3/5", "30", "25",
];

function readStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function normalizeAnswer(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function calculateScore(answers, correctAnswers) {
  const entries = Object.entries(correctAnswers);
  if (!entries.length) return 0;

  const correct = entries.filter(
    ([id, answer]) =>
      normalizeAnswer(answers[id]) === normalizeAnswer(answer)
  ).length;

  return Math.round((correct / entries.length) * 100);
}

function getLevel(score) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Improvement";
}

function getPriority(gap) {
  if (gap >= 3) return "High";
  if (gap === 2) return "Medium";
  if (gap === 1) return "Low";
  return "Ready";
}

function normalizeJobTitle(title = "") {
  const normalized = String(title).toLowerCase();

  if (normalized.includes("frontend") || normalized.includes("front-end")) {
    return "Frontend Developer";
  }
  if (normalized.includes("backend") || normalized.includes("back-end")) {
    return "Backend Developer";
  }
  if (normalized.includes("machine learning")) {
    return "Machine Learning Engineer";
  }
  if (normalized.includes("data scientist")) {
    return "Data Scientist";
  }
  if (normalized.includes("devops")) {
    return "DevOps Engineer";
  }
  if (normalized.includes("cloud")) {
    return "Cloud Solutions Architect";
  }
  if (
    normalized.includes("full stack") ||
    normalized.includes("full-stack") ||
    normalized.includes("mern")
  ) {
    return "Full Stack Developer";
  }
  return title;
}

function AssessmentResult() {
  const navigate = useNavigate();

  const technicalAnswers = useMemo(
    () => readStorage("technicalAssessmentAnswers"),
    []
  );
  const technicalRatings = useMemo(
    () => readStorage("technicalSkillRatings"),
    []
  );
  const reasoningAnswers = useMemo(
    () => readStorage("reasoningAssessmentAnswers"),
    []
  );
  const aptitudeAnswers = useMemo(
    () => readStorage("aptitudeAssessmentAnswers"),
    []
  );

  const rawSelectedJob = useMemo(() => {
    try {
      const item = localStorage.getItem("selectedJob");
      if (!item) return "Full Stack Developer";
      const parsed = JSON.parse(item);
      return typeof parsed === "object" && parsed !== null ? (parsed.title || "Full Stack Developer") : parsed;
    } catch {
      return localStorage.getItem("selectedJob") || "Full Stack Developer";
    }
  }, []);

  const selectedJob = rawSelectedJob;
  const normalizedJob = normalizeJobTitle(selectedJob);

  const requirements =
    JOB_REQUIREMENTS[normalizedJob] ||
    JOB_REQUIREMENTS[selectedJob] ||
    JOB_REQUIREMENTS["Full Stack Developer"];

  const hasTechnicalRatings = SKILLS.every(
    (skill) =>
      Number.isFinite(technicalRatings[skill.key]) &&
      technicalRatings[skill.key] >= 0 &&
      technicalRatings[skill.key] <= 5
  );

  const hasTechnicalResult =
    Number.isFinite(technicalAnswers.passed) &&
    Number.isFinite(technicalAnswers.total) &&
    technicalAnswers.total > 0;

  const technicalScore = hasTechnicalRatings
    ? Math.round(
        (SKILLS.reduce(
          (sum, skill) => sum + technicalRatings[skill.key],
          0
        ) /
          (SKILLS.length * 5)) *
          100
      )
    : hasTechnicalResult
      ? Math.round(
          (technicalAnswers.passed / technicalAnswers.total) * 100
        )
      : 0;

  const reasoningScore = calculateScore(
    reasoningAnswers,
    Object.fromEntries(
      REASONING_ANSWERS.map((answer, index) => [index + 1, answer])
    )
  );

  const aptitudeScore = calculateScore(
    aptitudeAnswers,
    Object.fromEntries(
      APTITUDE_ANSWERS.map((answer, index) => [index + 1, answer])
    )
  );

  const hasAssessmentData = hasTechnicalResult || Object.keys(reasoningAnswers).length > 0 || Object.keys(aptitudeAnswers).length > 0;

  const overallScore = Math.round(
    (technicalScore + reasoningScore + aptitudeScore) / 3
  );

  // Derive ratings if not explicitly set
  const effectiveRatings = useMemo(() => {
    if (hasTechnicalRatings) return technicalRatings;
    const derived = {};
    SKILLS.forEach((skill) => {
      const req = requirements[skill.key] ?? 3;
      const scoreRatio = technicalScore / 100;
      derived[skill.key] = Math.max(1, Math.min(5, Math.round(req * (0.5 + 0.5 * scoreRatio))));
    });
    return derived;
  }, [hasTechnicalRatings, technicalRatings, requirements, technicalScore]);

  const skillGaps = SKILLS.map((skill) => {
    const current = effectiveRatings[skill.key] ?? 3;
    const required = requirements[skill.key] ?? 3;
    const gap = Math.max(0, required - current);

    return {
      ...skill,
      current,
      required,
      gap,
      priority: getPriority(gap),
    };
  });

  const missingSkills = skillGaps
    .filter((skill) => skill.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  const results = {
    targetJob: selectedJob,
    technicalScore,
    reasoningScore,
    aptitudeScore,
    overallScore,
    hasTechnicalRatings,
    technicalRatings: effectiveRatings,
    skillGaps,
    missingSkills,
    completedAt: new Date().toISOString(),
  };

  useEffect(() => {
    localStorage.setItem("assessmentResults", JSON.stringify(results));
    if (!hasTechnicalRatings) {
      localStorage.setItem("technicalSkillRatings", JSON.stringify(effectiveRatings));
    }
  }, [
    selectedJob,
    technicalScore,
    reasoningScore,
    aptitudeScore,
    overallScore,
    hasTechnicalRatings,
    effectiveRatings
  ]);

  const restartAssessment = () => {
    [
      "technicalAssessmentAnswers",
      "technicalCodingSubmissions",
      "technicalCodingSubmissionsReactV1",
      "technicalSkillRatings",
      "technicalAssessmentLanguage",
      "reasoningAssessmentAnswers",
      "aptitudeAssessmentAnswers",
      "assessmentResults",
      "technicalAssessmentDeadline",
      "technicalAssessmentDeadlineReactV1",
      "reasoning_assessment_curr_idx",
      "reasoning_assessment_deadline",
      "aptitude_assessment_curr_idx",
      "aptitude_assessment_deadline",
      "reasoning_assessment_time_left",
      "aptitude_assessment_time_left",
    ].forEach((key) => localStorage.removeItem(key));

    navigate("/assessment");
  };

  const scoreCards = [
    {
      title: "Technical Skills",
      score: technicalScore,
      icon: "💻",
      description: hasTechnicalRatings
        ? "Self-rated technical proficiency"
        : hasTechnicalResult
          ? `${technicalAnswers.passed} of ${technicalAnswers.total} practical challenges passed`
          : "Technical assessment not completed",
    },
    {
      title: "Logical Reasoning",
      score: reasoningScore,
      icon: "🧠",
      description: `${Object.keys(reasoningAnswers).length} reasoning answer${Object.keys(reasoningAnswers).length === 1 ? "" : "s"} recorded`,
    },
    {
      title: "Aptitude",
      score: aptitudeScore,
      icon: "📊",
      description: `${Object.keys(aptitudeAnswers).length} aptitude answer${Object.keys(aptitudeAnswers).length === 1 ? "" : "s"} recorded`,
    },
  ];

  return (
    <div className="assessment-result-page">
      <header className="result-header">
        <div>
          <span className="result-label">Assessment Results</span>
          <h1>Your Combined Skill Report</h1>
          <p>
            Target role: <strong>{selectedJob}</strong>
          </p>
        </div>
      </header>

      <section className="overall-result">
        <div className="score-circle">
          <strong>{overallScore}%</strong>
          <span>Combined Score</span>
        </div>

        <div className="overall-content">
          <span className="level-badge">{hasAssessmentData ? getLevel(overallScore) : "Assessment pending"}</span>
          <h2>Your assessment overview</h2>
          <p>{hasAssessmentData
            ? "Your combined score is the average of technical skills, logical reasoning and aptitude. Improve your weakest areas to strengthen your preparation."
            : "No submitted assessment data was found. Complete the three assessment sections to generate an accurate score and learning priorities."}</p>
          {!hasAssessmentData && <button className="primary-result-btn" onClick={() => navigate("/assessment")}>Start assessment →</button>}
        </div>
      </section>

      <section className="score-section">
        <h2>Assessment Breakdown</h2>

        <div className="score-grid">
          {scoreCards.map((item) => (
            <div className="score-card" key={item.title}>
              <div className="score-card-top">
                <div className="score-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <span>{getLevel(item.score)}</span>
                </div>
              </div>

              <div className="large-score">{item.score}%</div>

              <div
                className="score-bar"
                role="progressbar"
                aria-valuenow={item.score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div style={{ width: `${item.score}%` }} />
              </div>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="score-section">
        <h2>Technical Skill Gap Analysis</h2>
        <p>
          Your current proficiency is compared with example requirements
          for the selected role. Ratings are on a 0–5 scale.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px" }}>Skill</th>
                <th style={{ padding: "12px" }}>Current</th>
                <th style={{ padding: "12px" }}>Required</th>
                <th style={{ padding: "12px" }}>Gap</th>
                <th style={{ padding: "12px" }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {skillGaps.map((skill) => (
                <tr key={skill.key}>
                  <td style={{ padding: "12px" }}>{skill.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {skill.current}/5
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {skill.required}/5
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {skill.gap}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <span className={`priority-pill priority-${skill.priority.toLowerCase()}`}>
                      {skill.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="result-next">
        <h2>Your Learning Priorities</h2>

        {!hasTechnicalRatings ? (
          <p>
            Complete the Technical Skills Assessment to discover your
            highest-priority missing skills.
          </p>
        ) : missingSkills.length === 0 ? (
          <p>
            Your ratings meet the configured requirements for this role.
            Continue practicing to maintain your skills.
          </p>
        ) : (
          <ol>
            {missingSkills.slice(0, 5).map((skill) => (
              <li key={skill.key} style={{ marginBottom: "12px" }}>
                <strong>{skill.name}</strong>: improve from {skill.current}/5
                to {skill.required}/5. Priority: {skill.priority}.
              </li>
            ))}
          </ol>
        )}

        <p>
          Logical Reasoning: <strong>{reasoningScore}%</strong>.{" "}
          Aptitude: <strong>{aptitudeScore}%</strong>. Practice these areas
          separately alongside your technical learning roadmap.
        </p>
      </section>

      <div className="result-actions">
        <button
          className="primary-result-btn"
          onClick={() => navigate("/skill-gap")}
        >
          View Full Skill Gap Report →
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
