import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/practice.css";

function Practice() {
  const categories = [
    {
      icon: "💻",
      title: "Technical Skills",
      description:
        "Practice programming, JavaScript, React, Node.js, MongoDB and Git.",
      questions: 50,
      difficulty: "Easy → Hard",
      link: "/coding-practice",
    },
    {
      icon: "🧠",
      title: "Logical Reasoning",
      description:
        "Improve your logical thinking with series, puzzles and patterns.",
      questions: 25,
      difficulty: "Easy → Medium",
      link: "/practice",
    },
    {
      icon: "📐",
      title: "Aptitude",
      description:
        "Practice percentages, ratios, probability, time and work.",
      questions: 25,
      difficulty: "Easy → Hard",
      link: "/practice",
    },
    {
      icon: "⚛️",
      title: "React Practice",
      description:
        "Practice React components, hooks, events, state and API integration.",
      questions: 30,
      difficulty: "Beginner → Advanced",
      link: "/coding-practice",
    },
    {
      icon: "🟢",
      title: "Node.js Practice",
      description:
        "Practice Express.js, REST APIs, authentication and backend concepts.",
      questions: 30,
      difficulty: "Beginner → Advanced",
      link: "/coding-practice",
    },
    {
      icon: "🍃",
      title: "MongoDB Practice",
      description:
        "Practice queries, CRUD operations, aggregation and database concepts.",
      questions: 25,
      difficulty: "Beginner → Advanced",
      link: "/coding-practice",
    },
  ];

  return (
    <div className="practice-page">
      <Navbar />

      <main className="practice-container">

        {/* Header */}
        <section className="practice-header">
          <div>
            <span className="section-tag">LEARN • PRACTICE • IMPROVE</span>
            <h1>Practice Center</h1>
            <p>
              Strengthen your skills with targeted practice based on your
              MERN Developer career goal.
            </p>
          </div>

          <div className="practice-score">
            <span>Practice Score</span>
            <strong>68%</strong>
            <small>Keep practicing 🚀</small>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="practice-stats">

          <div className="practice-stat">
            <span className="stat-number">120</span>
            <span>Questions Solved</span>
          </div>

          <div className="practice-stat">
            <span className="stat-number">86</span>
            <span>Correct Answers</span>
          </div>

          <div className="practice-stat">
            <span className="stat-number">12</span>
            <span>Coding Problems</span>
          </div>

          <div className="practice-stat">
            <span className="stat-number">7</span>
            <span>Day Streak</span>
          </div>

        </section>

        {/* Categories */}
        <section className="practice-section">

          <div className="practice-section-heading">
            <div>
              <span className="section-tag">CATEGORIES</span>
              <h2>Choose Your Practice</h2>
            </div>
          </div>

          <div className="practice-grid">

            {categories.map((category, index) => (
              <div className="practice-card" key={index}>

                <div className="practice-card-top">
                  <div className="practice-icon">
                    {category.icon}
                  </div>

                  <span className="question-count">
                    {category.questions} Questions
                  </span>
                </div>

                <h3>{category.title}</h3>

                <p>{category.description}</p>

                <div className="practice-card-footer">
                  <span>{category.difficulty}</span>

                  <Link to={category.link}>
                    Practice →
                  </Link>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* Coding Challenge */}
        <section className="coding-banner">

          <div className="coding-banner-icon">
            &lt;/&gt;
          </div>

          <div className="coding-banner-content">
            <span className="section-tag">CODING CHALLENGE</span>

            <h2>Improve your coding skills</h2>

            <p>
              Solve programming problems and prepare for real technical
              challenges with our coding practice environment.
            </p>
          </div>

          <Link to="/coding-practice" className="coding-button">
            Start Coding →
          </Link>

        </section>

        {/* Recommended */}
        <section className="recommended-section">

          <div>
            <span className="section-tag">AI RECOMMENDATION</span>
            <h2>What should you practice?</h2>

            <p>
              Based on your current skill profile, focus more on
              <strong> JavaScript, React.js and Node.js</strong>.
            </p>
          </div>

          <div className="recommended-skills">
            <span>JavaScript</span>
            <span>React.js</span>
            <span>Node.js</span>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Practice;

