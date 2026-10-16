
import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/skillgap.css";

// All skill ratings use a scale from 0 to 5.
const SKILLS = [
  { name: "HTML", key: "HTML" },
  { name: "CSS", key: "CSS" },
  { name: "JavaScript", key: "JavaScript" },
  { name: "React.js", key: "React" },
  { name: "Node.js", key: "Node.js" },
  { name: "Express.js", key: "Express.js" },
  { name: "MongoDB", key: "MongoDB" },
  { name: "REST APIs", key: "REST API" },
  { name: "Git & GitHub", key: "Git" },
];

// Required skill levels depend on the selected target job.
// Values range from 0 to 5.
const JOB_REQUIREMENTS = {
  "Full Stack Developer": {
    HTML: 4, CSS: 4, JavaScript: 5, React: 4,
    "Node.js": 4, "Express.js": 4, MongoDB: 4,
    "REST API": 4, Git: 4,
  },
  "Full Stack Engineer": {
    HTML: 4, CSS: 4, JavaScript: 5, React: 4,
    "Node.js": 4, "Express.js": 4, MongoDB: 4,
    "REST API": 4, Git: 4,
  },
  "Frontend Developer": {
    HTML: 5, CSS: 5, JavaScript: 5, React: 4,
    "Node.js": 2, "Express.js": 1, MongoDB: 1,
    "REST API": 3, Git: 4,
  },
  "Backend Developer": {
    HTML: 1, CSS: 1, JavaScript: 4, React: 1,
    "Node.js": 5, "Express.js": 5, MongoDB: 4,
    "REST API": 5, Git: 4,
  },
  "Data Scientist": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1,
    "Node.js": 1, "Express.js": 1, MongoDB: 3,
    "REST API": 3, Git: 4,
  },
  "Machine Learning Engineer": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1,
    "Node.js": 2, "Express.js": 2, MongoDB: 3,
    "REST API": 4, Git: 4,
  },
  "DevOps Engineer": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1,
    "Node.js": 2, "Express.js": 2, MongoDB: 2,
    "REST API": 3, Git: 5,
  },
  "Cloud Solutions Architect": {
    HTML: 1, CSS: 1, JavaScript: 2, React: 1,
    "Node.js": 2, "Express.js": 2, MongoDB: 3,
    "REST API": 4, Git: 4,
  },
};

const DEFAULT_REQUIREMENTS = JOB_REQUIREMENTS["Full Stack Developer"];

function readLocalStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeJobTitle(title = "") {
  const normalized = title.toLowerCase();

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

function getPriority(gap) {
  if (gap >= 3) return "High";
  if (gap === 2) return "Medium";
  if (gap === 1) return "Low";
  return "Ready";
}

function getStatus(gap) {
  if (gap >= 3) return "Needs Improvement";
  if (gap === 2) return "Improve";
  if (gap === 1) return "Almost Ready";
  return "Requirement Met";
}

export default function SkillGap() {
  const navigate = useNavigate();
  const reportRef = useRef(null);

  const selectedJob = readLocalStorage("selectedJob", {});
  const storedRatings = readLocalStorage("technicalSkillRatings", null);
  const assessmentResults = readLocalStorage("assessmentResults", null);
  
  const savedRatings =
    storedRatings ||
    assessmentResults?.technicalRatings || {
      HTML: 3,
      CSS: 3,
      JavaScript: 3,
      React: 2,
      "Node.js": 2,
      "Express.js": 2,
      MongoDB: 2,
      "REST API": 2,
      Git: 3,
    };

  const jobTitle =
    typeof selectedJob === "string"
      ? selectedJob
      : selectedJob?.title || "Full Stack Developer";

  const matchedJob = normalizeJobTitle(jobTitle);
  const requirements =
    JOB_REQUIREMENTS[matchedJob] || DEFAULT_REQUIREMENTS;

  // Accept either a direct ratings object or { ratings: {...} }.
  const ratings =
    savedRatings?.ratings &&
    typeof savedRatings.ratings === "object"
      ? savedRatings.ratings
      : savedRatings;

  const hasRatings = Boolean(storedRatings || assessmentResults?.technicalRatings);

  const skillGaps = useMemo(() => {
    return SKILLS.map(({ name, key }) => {
      const rawRating = Number(ratings?.[key]);
      const validRating =
        Number.isFinite(rawRating) && rawRating >= 0 && rawRating <= 5;

      const currentLevel = validRating ? rawRating : 0;
      const requiredLevel = requirements[key] ?? 3;
      const gapLevel = Math.max(requiredLevel - currentLevel, 0);

      return {
        skill: name,
        key,
        currentLevel,
        requiredLevel,
        current: currentLevel * 20,
        required: requiredLevel * 20,
        gapLevel,
        gap: gapLevel * 20,
        priority: getPriority(gapLevel),
        status: getStatus(gapLevel),
      };
    });
  }, [ratings, requirements]);

  const overallScore = Math.round(
    skillGaps.reduce((sum, item) => sum + item.current, 0) /
      skillGaps.length
  );

  const requiredScore = Math.round(
    skillGaps.reduce((sum, item) => sum + item.required, 0) /
      skillGaps.length
  );

  const missingSkills = skillGaps.filter((item) => item.gapLevel > 0);

  const highPriorityCount = skillGaps.filter(
    (item) => item.priority === "High"
  ).length;

  const jobReadiness =
    requiredScore > 0
      ? Math.min(100, Math.round((overallScore / requiredScore) * 100))
      : 0;

  const priorityOrder = { High: 0, Medium: 1, Low: 2, Ready: 3 };

  const prioritizedSkills = [...skillGaps].sort(
    (a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      b.gapLevel - a.gapLevel
  );

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;

      let remainingHeight = imageHeight;
      let position = 0;

      pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        position = remainingHeight - imageHeight;
        pdf.addPage();
        pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save("AI-Skill-Gap-Career-Report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      window.alert("Unable to generate the PDF. Please try again.");
    }
  };

  const topRecommendations = prioritizedSkills
    .filter((item) => item.gapLevel > 0)
    .slice(0, 3);

  return (
    <div className="skill-gap-page" ref={reportRef}>
      <section className="skill-gap-header">
        <div className="skill-gap-header-content">
          <div>
            <p className="page-label">AI SKILL ANALYSIS</p>
            <h1>Your Skill Gap Analysis</h1>
            <p>
              Your current ratings are compared with the target proficiency
              levels for your selected career.
            </p>
          </div>

          <button type="button" onClick={downloadPDF}>
            Download Career PDF Report
          </button>
        </div>

        <div className="job-badge">
          Target Job: <strong>{jobTitle}</strong>
        </div>
      </section>

      {!hasRatings && (
        <section
          role="status"
          style={{
            padding: "1rem",
            marginBottom: "1.5rem",
            border: "1px solid #f59e0b",
            borderRadius: "10px",
          }}
        >
          <h3>Complete your technical skills assessment</h3>
          <p>
            No skill ratings were found. The report currently uses zero for
            your current proficiency. Complete the rating assessment to get
            a meaningful analysis.
          </p>
          <button
            type="button"
            onClick={() => navigate("/assessment")}
          >
            Go to Assessment
          </button>
        </section>
      )}

      <section
        style={{
          background: "var(--surface)",
          borderRadius: "12px",
          padding: "1.5rem",
          border: "1px solid var(--surface-border)",
          marginBottom: "2rem",
        }}
      >
        <h2>Skill Competency Radar</h2>
        <p>
          Current proficiency versus the required proficiency for your
          selected job. Each rating point represents 20%.
        </p>

        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillGaps}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="Current Proficiency"
                dataKey="current"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.4}
              />
              <Radar
                name="Required Proficiency"
                dataKey="required"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.15}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="skill-summary">
        <div className="summary-card">
          <span>Current Skill Score</span>
          <h2>{overallScore}%</h2>
          <p>Average self-rating</p>
        </div>

        <div className="summary-card">
          <span>Skills With Gaps</span>
          <h2>{missingSkills.length}</h2>
          <p>Skills below target</p>
        </div>

        <div className="summary-card">
          <span>High Priority</span>
          <h2>{highPriorityCount}</h2>
          <p>Largest skill gaps</p>
        </div>

        <div className="summary-card">
          <span>Job Readiness</span>
          <h2>{jobReadiness}%</h2>
          <p>Relative to required levels</p>
        </div>
      </section>

      <section className="skill-gap-section">
        <div className="section-heading">
          <h2>Skills Analysis</h2>
          <p>
            Current level, required level, missing proficiency, and priority.
          </p>
        </div>

        <div className="skill-list">
          {prioritizedSkills.map((item) => (
            <article className="skill-gap-card" key={item.key}>
              <div className="skill-top">
                <div>
                  <h3>{item.skill}</h3>
                  <span
                    className={`priority ${item.priority.toLowerCase()}`}
                  >
                    {item.priority === "Ready"
                      ? "Requirement Met"
                      : `${item.priority} Priority`}
                  </span>
                </div>

                <div className="skill-percent">{item.current}%</div>
              </div>

              <div className="skill-info">
                <span>
                  Current: {item.currentLevel}/5 ({item.current}%)
                </span>
                <span>
                  Required: {item.requiredLevel}/5 ({item.required}%)
                </span>
              </div>

              <div className="progress-background">
                <div
                  className="progress-current"
                  style={{ width: `${item.current}%` }}
                />
                <div
                  className="progress-required"
                  style={{ width: `${item.required}%` }}
                />
              </div>

              <div className="skill-bottom">
                <span className="status">{item.status}</span>
                <span className="gap">
                  Gap: {item.gapLevel} level(s) / {item.gap}%
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-recommendation">
        <div className="ai-icon">AI</div>
        <div>
          <h2>Recommended Focus Areas</h2>

          {!hasRatings ? (
            <p>
              Complete your technical skills assessment first. Your
              recommendations will then be based on your ratings.
            </p>
          ) : topRecommendations.length === 0 ? (
            <p>
              Great work! Your current ratings meet or exceed the configured
              requirements for {jobTitle}.
            </p>
          ) : (
            <>
              <p>
                Focus on these skills first for your {jobTitle} goal:
              </p>
              <ul>
                {topRecommendations.map((item) => (
                  <li key={item.key}>
                    <strong>{item.skill}</strong>: current {item.currentLevel}/5,
                    required {item.requiredLevel}/5 — {item.priority} priority.
                  </li>
                ))}
              </ul>
            </>
          )}

          <p>
            These recommendations are generated from configured job
            requirements and your self-ratings; they are not a verified
            external industry benchmark.
          </p>
        </div>
      </section>

      <section className="skill-gap-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/assessment")}
        >
          Retake Assessment
        </button>

        <button
          type="button"
          onClick={() => navigate("/roadmap")}
        >
          View Learning Roadmap
        </button>
      </section>
    </div>
  );
}

