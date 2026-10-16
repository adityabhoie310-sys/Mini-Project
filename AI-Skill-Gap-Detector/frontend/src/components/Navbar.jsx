import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("selectedJob");
    localStorage.removeItem("technicalAssessmentAnswers");
    localStorage.removeItem("reasoningAssessmentAnswers");
    localStorage.removeItem("aptitudeAssessmentAnswers");

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">✦</span>
          <span>SkillGap<span className="logo-ai"> AI</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/dashboard" onClick={closeMenu}>
            Dashboard
          </Link>

          <Link to="/select-job" onClick={closeMenu}>
            Career
          </Link>

          <Link to="/skill-gap" onClick={closeMenu}>
            Skill Gap
          </Link>

          <Link to="/roadmap" onClick={closeMenu}>
            Roadmap
          </Link>

          <Link to="/resources" onClick={closeMenu}>
            Resources
          </Link>

          {/* Mobile Profile Links */}
          <div className="mobile-menu-actions">
            <Link to="/profile" onClick={closeMenu}>
              My Profile
            </Link>

            <Link to="/progress" onClick={closeMenu}>
              Progress
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Profile */}
          <div className="profile-wrapper">
            <button
              className="profile-button"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="profile-avatar">
                A
              </div>

              <div className="profile-info">
                <span className="profile-name">Adi</span>
                <span className="profile-role">Student</span>
              </div>

              <span className={`profile-arrow ${profileOpen ? "open" : ""}`}>
                ▼
              </span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">

                <div className="dropdown-header">
                  <div className="dropdown-avatar">A</div>

                  <div>
                    <strong>Adi</strong>
                    <span>Student</span>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                >
                  👤 My Profile
                </Link>

                <Link
                  to="/progress"
                  onClick={() => setProfileOpen(false)}
                >
                  📊 My Progress
                </Link>

                <div className="dropdown-divider"></div>

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  ↪ Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
