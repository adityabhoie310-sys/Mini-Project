
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/jobService";
import "../styles/selectJob.css";

const fallbackJobs = [
  {
    id: 1,
    title: "Full Stack Engineer",
    icon: "💻",
    description: "Build frontend and backend applications.",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: 2,
    title: "Data Analyst",
    icon: "📊",
    description: "Analyze data and generate useful insights.",
    skills: ["Python", "SQL", "Excel", "Power BI"],
  },
  {
    id: 3,
    title: "Machine Learning Engineer",
    icon: "🤖",
    description: "Build and deploy machine learning models.",
    skills: ["Python", "NumPy", "Pandas", "Scikit-learn"],
  },
  {
    id: 4,
    title: "AI Engineer",
    icon: "🧠",
    description: "Build AI-powered applications.",
    skills: ["Python", "AI", "ML", "LLMs"],
  },
];

const SelectJob = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobs();
        const data = response.data;

        // Supports an array or an API response shaped as { value: [...] }
        const jobList = Array.isArray(data)
          ? data
          : Array.isArray(data?.value)
            ? data.value
            : Array.isArray(data?.jobs)
              ? data.jobs
              : [];

        if (active) {
          setJobs(jobList);
          if (jobList.length === 0) {
            setError("No jobs were returned by the server.");
          }
        }
      } catch (err) {
        if (active) {
          setError(
            "Unable to load jobs. Check that your backend is running on port 5000."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadJobs();

    return () => {
      active = false;
    };
  }, []);

  const handleContinue = () => {
    if (!selectedJob) return;

    localStorage.setItem("selectedJob", JSON.stringify(selectedJob));
    navigate("/assessment");
  };

  return (
    <div className="select-job-page">
      <main className="select-job-container">
        <div className="select-job-heading">
          <span>STEP 1 OF 3</span>
          <h1>Choose Your Target Job</h1>
          <p>
            Select the job role you want to prepare for.
            Your assessment and personalized roadmap will be based on your choice.
          </p>
        </div>

        {loading && <p>Loading job roles...</p>}

        {!loading && error && (
          <p role="alert">{error}</p>
        )}

        {!loading && jobs.length > 0 && (
          <div className="job-grid">
            {jobs.map((job, index) => {
              const jobId = job.id ?? job._id ?? job.jobId ?? index;
              const isSelected =
                String(selectedJob?.id ?? selectedJob?._id ?? selectedJob?.jobId) ===
                String(jobId);

              const skills = Array.isArray(job.skills) ? job.skills : [];

              return (
                <button
                  type="button"
                  key={jobId}
                  className={`job-card ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    setSelectedJob({ ...job, id: jobId })
                  }
                >
                  <div className="job-card-top">
                    <div className="job-icon">💼</div>
                    {isSelected && (
                      <div className="selected-check">✓</div>
                    )}
                  </div>

                  <h2>{job.title ?? job.name ?? "Untitled job"}</h2>
                  <p>
                    {job.description ?? "Explore the skills required for this role."}
                  </p>

                  <div className="job-skills">
                    {skills.map((skill, skillIndex) => (
                      <span key={`${skill}-${skillIndex}`}>
                        {typeof skill === "string"
                          ? skill
                          : skill.name ?? skill.title ?? ""}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="continue-section">
          {selectedJob && (
            <p>
              Selected: <strong>{selectedJob.title}</strong>
            </p>
          )}

          <button
            type="button"
            className="continue-button"
            onClick={handleContinue}
            disabled={!selectedJob || loading}
          >
            Continue to Assessment →
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectJob;
