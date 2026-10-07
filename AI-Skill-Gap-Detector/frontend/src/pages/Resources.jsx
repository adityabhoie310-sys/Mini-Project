import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/resources.css";

const Resources = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const resources = [
    {
      title: "JavaScript Complete Guide",
      skill: "JavaScript",
      type: "Video",
      platform: "YouTube",
      description:
        "Learn JavaScript fundamentals, functions, arrays, objects, ES6 and asynchronous JavaScript.",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      icon: "▶",
    },
    {
      title: "JavaScript Documentation",
      skill: "JavaScript",
      type: "Documentation",
      platform: "MDN",
      description:
        "Official JavaScript reference and guides for learning core concepts.",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: "📖",
    },
    {
      title: "React Learn",
      skill: "React",
      type: "Documentation",
      platform: "React.dev",
      description:
        "Learn components, JSX, props, state, events, hooks and modern React.",
      url: "https://react.dev/learn",
      icon: "📖",
    },
    {
      title: "React Tutorial",
      skill: "React",
      type: "Video",
      platform: "YouTube",
      description:
        "Follow a complete React learning path from beginner to project level.",
      url: "https://www.youtube.com/results?search_query=react+js+full+course+for+beginners",
      icon: "▶",
    },
    {
      title: "Node.js Learning",
      skill: "Node.js",
      type: "Documentation",
      platform: "Node.js",
      description:
        "Official Node.js learning resources and API documentation.",
      url: "https://nodejs.org/en/learn",
      icon: "📖",
    },
    {
      title: "Node.js Full Course",
      skill: "Node.js",
      type: "Video",
      platform: "YouTube",
      description:
        "Learn Node.js, modules, npm, HTTP servers and backend development.",
      url: "https://www.youtube.com/results?search_query=node.js+full+course+for+beginners",
      icon: "▶",
    },
    {
      title: "Express.js Guide",
      skill: "Express.js",
      type: "Documentation",
      platform: "Express",
      description:
        "Learn routing, middleware, error handling and REST APIs.",
      url: "https://expressjs.com/",
      icon: "📖",
    },
    {
      title: "Express REST API Tutorial",
      skill: "Express.js",
      type: "Video",
      platform: "YouTube",
      description:
        "Learn how to create REST APIs using Node.js and Express.js.",
      url: "https://www.youtube.com/results?search_query=express.js+rest+api+tutorial",
      icon: "▶",
    },
    {
      title: "MongoDB Documentation",
      skill: "MongoDB",
      type: "Documentation",
      platform: "MongoDB",
      description:
        "Official MongoDB documentation covering databases, collections and CRUD.",
      url: "https://www.mongodb.com/docs/",
      icon: "📖",
    },
    {
      title: "MongoDB Full Course",
      skill: "MongoDB",
      type: "Video",
      platform: "YouTube",
      description:
        "Learn MongoDB, CRUD operations, queries and database concepts.",
      url: "https://www.youtube.com/results?search_query=mongodb+full+course+for+beginners",
      icon: "▶",
    },
    {
      title: "Git Documentation",
      skill: "Git",
      type: "Documentation",
      platform: "Git",
      description:
        "Official Git documentation for commands, branches and version control.",
      url: "https://git-scm.com/doc",
      icon: "📖",
    },
    {
      title: "Git & GitHub Course",
      skill: "Git",
      type: "Video",
      platform: "YouTube",
      description:
        "Learn Git commands, branches, GitHub repositories and collaboration.",
      url: "https://www.youtube.com/results?search_query=git+github+full+course+for+beginners",
      icon: "▶",
    },
    {
      title: "GitHub Skills",
      skill: "GitHub",
      type: "Practice",
      platform: "GitHub",
      description:
        "Interactive exercises for learning GitHub and development workflows.",
      url: "https://skills.github.com/",
      icon: "💻",
    },
    {
      title: "MERN Stack Tutorial",
      skill: "MERN",
      type: "Project",
      platform: "MongoDB",
      description:
        "Learn how MongoDB, Express, React and Node.js work together.",
      url: "https://www.mongodb.com/resources/languages/mern-stack-tutorial",
      icon: "🚀",
    },
    {
      title: "MERN Project Tutorial",
      skill: "MERN",
      type: "Video",
      platform: "YouTube",
      description:
        "Build a complete MERN stack application with frontend and backend.",
      url: "https://www.youtube.com/results?search_query=complete+MERN+stack+project",
      icon: "▶",
    },
  ];

  const categories = [
    "All",
    "Video",
    "Documentation",
    "Practice",
    "Project",
  ];

  const filteredResources =
    activeCategory === "All"
      ? resources
      : resources.filter(
          (resource) => resource.type === activeCategory
        );

  return (
    <div className="resources-page">

  

      {/* Header */}
      <section className="resources-header">

        <span className="resources-label">
          PERSONALIZED LEARNING RESOURCES
        </span>

        <h1>
          Learn the Skills You Need
        </h1>

        <p>
          AI-recommended resources based on your
          skill gaps and MERN Developer career goal.
        </p>

      </section>

      {/* Skill Summary */}
      <section className="resource-summary">

        <div className="resource-summary-card">
          <span>Target Role</span>
          <h3>MERN Developer</h3>
        </div>

        <div className="resource-summary-card">
          <span>Recommended Resources</span>
          <h3>{resources.length}</h3>
        </div>

        <div className="resource-summary-card">
          <span>Priority Skill</span>
          <h3>JavaScript</h3>
        </div>

        <div className="resource-summary-card">
          <span>Learning Duration</span>
          <h3>6 Weeks</h3>
        </div>

      </section>

      {/* Categories */}
      <section className="resource-filter">

        {categories.map((category) => (

          <button
            key={category}
            className={
              activeCategory === category
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>

        ))}

      </section>

      {/* Resources */}
      <section className="resources-container">

        <div className="resources-title">

          <div>
            <h2>
              Recommended Resources
            </h2>

            <p>
              Select a resource to start learning.
            </p>
          </div>

          <span>
            {filteredResources.length} Resources
          </span>

        </div>

        <div className="resources-grid">

          {filteredResources.map(
            (resource, index) => (

              <div
                className="resource-card"
                key={index}
              >

                <div className="resource-card-top">

                  <div className="resource-icon">
                    {resource.icon}
                  </div>

                  <span
                    className={`resource-type ${resource.type.toLowerCase()}`}
                  >
                    {resource.type}
                  </span>

                </div>

                <span className="resource-skill">
                  {resource.skill}
                </span>

                <h3>
                  {resource.title}
                </h3>

                <p>
                  {resource.description}
                </p>

                <div className="resource-platform">
                  <span>
                    Platform
                  </span>

                  <strong>
                    {resource.platform}
                  </strong>
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-open"
                >
                  {resource.type === "Video"
                    ? "▶ Watch Now"
                    : resource.type === "Practice"
                    ? "💻 Practice Now"
                    : resource.type === "Project"
                    ? "🚀 View Project"
                    : "📖 Open Resource"}

                  <span>→</span>
                </a>

              </div>

            )
          )}

        </div>

      </section>

      {/* Learning Tip */}
      <section className="learning-tip">

        <div className="tip-icon">
          🤖
        </div>

        <div>

          <h2>
            AI Learning Tip
          </h2>

          <p>
            Don't only watch videos. Use the{" "}
            <strong>
              Learn → Practice → Build
            </strong>{" "}
            method. After every topic, solve a small
            problem and build something practical.
          </p>

        </div>

      </section>

      {/* Bottom Actions */}
      <section className="resources-actions">

        <button
          className="resources-back"
          onClick={() => navigate("/daily-plan")}
        >
          ← Daily Plan
        </button>

        <button
          className="resources-next"
          onClick={() => navigate("/projects")}
        >
          Explore Projects →
        </button>

      </section>

    </div>
  );
};

export default Resources;
