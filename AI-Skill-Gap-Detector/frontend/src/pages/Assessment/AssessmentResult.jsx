
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/assessmentResult.css";
import api from "../../services/api";

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
  "MERN Stack Developer": {
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
  "Data Analyst": {
    SQL: 5, Excel: 4, Statistics: 4, "Data Cleaning": 4,
    "KPIs & Analytics": 4, Python: 4, Git: 3,
  },
  "Data Scientist": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1, "Node.js": 1,
    "Express.js": 1, MongoDB: 3, "REST API": 3, Git: 4,
  },
  "Machine Learning Engineer": {
    "ML Fundamentals": 5, "Model Evaluation": 4, "Deep Learning": 4,
    "ML Mathematics": 4, MLOps: 4, Python: 5, "Machine Learning": 4, Git: 4,
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
  if (normalized.includes("machine learning") || normalized.includes("ai engineer") || normalized.includes("artificial intelligence")) {
    return "Machine Learning Engineer";
  }
  if (normalized.includes("data analyst") || normalized.includes("analytics") || normalized.includes("data analysis")) {
    return "Data Analyst";
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
    normalized.includes("mern") ||
    normalized.includes("full stack") ||
    normalized.includes("full-stack")
  ) {
    return "MERN Stack Developer";
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
  const reportGeneratedAt = useMemo(() => new Date().toISOString(), []);

  const requirements =
    JOB_REQUIREMENTS[normalizedJob] ||
    JOB_REQUIREMENTS[selectedJob] ||
    JOB_REQUIREMENTS["Full Stack Developer"];

  const assessedTechnicalRatings =
    technicalAnswers.skillRatings && typeof technicalAnswers.skillRatings === "object"
      ? technicalAnswers.skillRatings
      : technicalRatings;

  const hasTechnicalRatings = Object.values(assessedTechnicalRatings).some(
    (rating) => Number.isFinite(rating) && rating >= 0 && rating <= 5
  );

  const hasTechnicalResult =
    Number.isFinite(technicalAnswers.passed) &&
    Number.isFinite(technicalAnswers.total) &&
    technicalAnswers.total > 0;

  const technicalScore = hasTechnicalRatings
    ? Math.round(
        (Object.values(assessedTechnicalRatings).reduce(
          (sum, rating) => sum + rating,
          0
        ) /
          (Object.values(assessedTechnicalRatings).length * 5)) *
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

  // Preserve only skill evidence produced by the combined assessment.
  const effectiveRatings = useMemo(() => {
    return hasTechnicalRatings ? assessedTechnicalRatings : {};
  }, [hasTechnicalRatings, assessedTechnicalRatings]);

  const assessmentSkillList = useMemo(() => {
    const assessed = Object.keys(effectiveRatings).filter((key) =>
      Number.isFinite(Number(effectiveRatings[key]))
    );
    if (!assessed.length) return SKILLS;
    return assessed.map((key) => ({
      key,
      name: SKILLS.find((skill) => skill.key === key)?.name || key,
    }));
  }, [effectiveRatings]);

  const skillGaps = assessmentSkillList.map((skill) => {
    const hasEvidence = Number.isFinite(effectiveRatings[skill.key]);
    const current = hasEvidence ? effectiveRatings[skill.key] : null;
    const required = requirements[skill.key] ?? 3;
    const gap = hasEvidence ? Math.max(0, required - current) : null;

    return {
      ...skill,
      current,
      required,
      gap,
      priority: hasEvidence ? getPriority(gap) : "Not assessed",
    };
  });

  const missingSkills = skillGaps
    .filter((skill) => skill.gap !== null && skill.gap > 0)
    .sort((a, b) => b.gap - a.gap);
  const strengthSkills = skillGaps.filter((skill) => skill.gap === 0);

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
    completedAt: reportGeneratedAt,
  };

  useEffect(() => {
    localStorage.setItem("assessmentResults", JSON.stringify(results));
  }, [
    selectedJob,
    technicalScore,
    reasoningScore,
    aptitudeScore,
    overallScore,
    hasTechnicalRatings,
    effectiveRatings
  ]);

  useEffect(() => {
    if (!hasAssessmentData || !localStorage.getItem("token")) return;
    api.post("/assessments/submit", {
      breakdown: {
        technical: technicalScore,
        reasoning: reasoningScore,
        aptitude: aptitudeScore,
      },
      completedAt: results.completedAt,
    }).then(({ data }) => {
      if (data?.id) localStorage.setItem("lastAssessmentResultId", data.id);
    }).catch(() => {
      // The local report remains available if the API is offline; a later
      // completed assessment will retry persistence.
    });
  }, [hasAssessmentData, technicalScore, reasoningScore, aptitudeScore, results.completedAt]);

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

      <section className="result-insights" aria-label="Assessment insights">
        <article>
          <span className="insight-label">YOUR STRENGTHS</span>
          <h2>{strengthSkills.length ? "Skills meeting your target" : "Build your first strength"}</h2>
          <p>{strengthSkills.length ? strengthSkills.map((skill) => skill.name).join(", ") : "Pass more technical challenges to identify skills that meet the target level."}</p>
        </article>
        <article>
          <span className="insight-label">TOP NEXT STEP</span>
          <h2>{missingSkills[0]?.name || "Complete all assessment sections"}</h2>
          <p>{missingSkills[0] ? `Close the ${missingSkills[0].gap}-level gap first; it has the highest impact on your ${selectedJob} readiness.` : "Review your roadmap and keep practising to maintain your current level."}</p>
          <button className="insight-action" onClick={() => navigate("/coding-practice")}>Practise now →</button>
        </article>
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
                    {skill.current === null ? "Not assessed" : `${skill.current}/5`}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {skill.required}/5
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {skill.gap === null ? "—" : skill.gap}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <span className={`priority-pill priority-${skill.priority.toLowerCase().replace(/\s+/g, "-")}`}>
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
            Complete the Technical & Coding Assessment to discover your
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
