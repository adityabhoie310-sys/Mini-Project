
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/selectJob.css";

const jobs = [
  {
    id: 1,
    title: "MERN Developer",
    icon: "🌐",
    description: "Build full-stack web applications using MongoDB, Express, React and Node.js.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    icon: "🎨",
    description: "Create responsive and interactive user interfaces for web applications.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 3,
    title: "Backend Developer",
    icon: "⚙️",
    description: "Develop APIs, servers, databases and backend systems.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    id: 4,
    title: "Data Analyst",
    icon: "📊",
    description: "Analyze data and generate useful business insights.",
    skills: ["Python", "SQL", "Excel", "Power BI"],
  },
  {
    id: 5,
    title: "Machine Learning Engineer",
    icon: "🤖",
    description: "Build and deploy machine learning models and intelligent systems.",
    skills: ["Python", "NumPy", "Pandas", "Scikit-learn"],
  },
  {
    id: 6,
    title: "AI Engineer",
    icon: "🧠",
    description: "Build AI-powered applications using machine learning and generative AI.",
    skills: ["Python", "AI", "ML", "LLM"],
  },
];

const SelectJob = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleContinue = () => {
    if (!selectedJob) return;

    localStorage.setItem("selectedJob", JSON.stringify(selectedJob));

    navigate("/assessment");
  };

  return (
    <div className="select-job-page">

      {/* Main */}
      <main className="select-job-container">

        <div className="select-job-heading">
          <span>STEP 1 OF 3</span>

          <h1>Choose Your Target Job</h1>

          <p>
            Select the job role you want to prepare for.
            Your assessment and personalized roadmap will
            be based on your choice.
          </p>
        </div>

        {/* Job Cards */}
        <div className="job-grid">

          {jobs.map((job) => (
            <button
              key={job.id}
              className={`job-card ${
                selectedJob?.id === job.id ? "selected" : ""
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="job-card-top">
                <div className="job-icon">{job.icon}</div>

                {selectedJob?.id === job.id && (
                  <div className="selected-check">✓</div>
                )}
              </div>

              <h2>{job.title}</h2>

              <p>{job.description}</p>

              <div className="job-skills">
                {job.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </button>
          ))}

        </div>

        {/* Continue */}
        <div className="continue-section">

          {selectedJob && (
            <p>
              Selected: <strong>{selectedJob.title}</strong>
            </p>
          )}

          <button
            className="continue-button"
            onClick={handleContinue}
            disabled={!selectedJob}
          >
            Continue to Assessment →
          </button>

        </div>

      </main>

    </div>
  );
};

export default SelectJob;