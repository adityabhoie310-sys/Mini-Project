import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("userProfile") || "null");
      if (saved && typeof saved === "object") return saved;
    } catch {
      // Fall through to the authenticated user defaults.
    }
    return {
    name: user?.name || "User",
    email: user?.email || "",
    phone: "",
    college: "",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    targetJob: "MERN Developer",
    bio: "Aspiring software developer focused on MERN Stack and AI-powered applications.",
    };
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("userProfile", JSON.stringify(profile));

    setEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("selectedJob");
    localStorage.removeItem("technicalAssessmentAnswers");
    localStorage.removeItem("reasoningAssessmentAnswers");
    localStorage.removeItem("aptitudeAssessmentAnswers");

    navigate("/login");
  };

  return (
    <div className="profile-page">
   

      <main className="profile-container">

        {/* Page Header */}
        <section className="profile-header">
          <div>
            <span className="profile-label">ACCOUNT</span>
            <h1>My Profile</h1>
            <p>
              Manage your personal information and career preferences.
            </p>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "✕ Cancel" : "✏️ Edit Profile"}
          </button>
        </section>

        {/* Success Message */}
        {saved && (
          <div className="profile-success">
            ✓ Profile updated successfully
          </div>
        )}

        <div className="profile-layout">

          {/* Left Profile Card */}
          <aside className="profile-sidebar">

            <div className="profile-card">

              <div className="large-avatar">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <h2>{profile.name}</h2>

              <span className="student-badge">
                Student
              </span>

              <p className="profile-email">
                {profile.email}
              </p>

              <div className="profile-divider"></div>

              <div className="profile-stat">
                <span>Target Career</span>
                <strong>{profile.targetJob}</strong>
              </div>

              <div className="profile-stat">
                <span>Education</span>
                <strong>{profile.year}</strong>
              </div>

            </div>

            {/* Profile Navigation */}
            <div className="profile-menu">

              <Link to="/profile" className="active">
                👤 Profile
              </Link>

              <Link to="/progress">
                📊 Progress
              </Link>

              <Link to="/achievements">
                🏆 Achievements
              </Link>

              <Link to="/skill-gap">
                🎯 Skill Gaps
              </Link>

              <Link to="/roadmap">
                🗺️ Roadmap
              </Link>

            </div>

          </aside>

          {/* Main Profile */}
          <section className="profile-content">

            <form onSubmit={handleSave}>

              {/* Personal Information */}
              <div className="profile-section">

                <div className="section-title">
                  <div>
                    <h2>Personal Information</h2>
                    <p>Your basic personal details</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group">
                    <label>College / University</label>

                    <input
                      type="text"
                      name="college"
                      value={profile.college}
                      onChange={handleChange}
                      placeholder="Enter college name"
                      disabled={!editing}
                    />
                  </div>

                </div>

              </div>

              {/* Education */}
              <div className="profile-section">

                <div className="section-title">
                  <div>
                    <h2>Education</h2>
                    <p>Your academic information</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>Course</label>

                    <input
                      type="text"
                      name="course"
                      value={profile.course}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Current Year</label>

                    <select
                      name="year"
                      value={profile.year}
                      onChange={handleChange}
                      disabled={!editing}
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduate</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Career Preferences */}
              <div className="profile-section">

                <div className="section-title">
                  <div>
                    <h2>Career Preferences</h2>
                    <p>Choose your target career</p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-group full-width">
                    <label>Target Job Role</label>

                    <select
                      name="targetJob"
                      value={profile.targetJob}
                      onChange={handleChange}
                      disabled={!editing}
                    >
                      <option>MERN Developer</option>
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Data Analyst</option>
                      <option>Machine Learning Engineer</option>
                      <option>AI Engineer</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* About */}
              <div className="profile-section">

                <div className="section-title">
                  <div>
                    <h2>About Me</h2>
                    <p>Tell us about your career goals</p>
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="5"
                    disabled={!editing}
                    placeholder="Write something about yourself..."
                  ></textarea>
                </div>

              </div>

              {/* Save */}
              {editing && (
                <div className="profile-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-profile-btn"
                  >
                    Save Changes
                  </button>
                </div>
              )}

            </form>

            {/* Account */}
            <div className="account-section">

              <div>
                <h3>Account</h3>
                <p>Manage your SkillGap AI account.</p>
              </div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                ↪ Logout
              </button>

            </div>

          </section>

        </div>

      </main>
    </div>
  );
}

export default Profile;
