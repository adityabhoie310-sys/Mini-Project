import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dailyPlan.css";

const DailyPlan = () => {
  const navigate = useNavigate();

  const [completedDays, setCompletedDays] = useState(() => {
    return JSON.parse(
      localStorage.getItem("completedDailyPlan") || "[]"
    );
  });

  const dailyPlan = [
    {
      day: 1,
      week: "Week 1",
      topic: "JavaScript Basics",
      learn: "Variables, data types, operators",
      task: "Create 10 JavaScript variables using different data types.",
      video:
        "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    },
    {
      day: 2,
      week: "Week 1",
      topic: "Functions",
      learn: "Function declaration, parameters, return values",
      task: "Create 5 functions for basic calculations.",
      video:
        "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    },
    {
      day: 3,
      week: "Week 1",
      topic: "Arrays",
      learn: "Array methods, map, filter, reduce",
      task: "Create an array of 10 students and filter students by marks.",
      video:
        "https://www.youtube.com/results?search_query=javascript+array+map+filter+reduce",
    },
    {
      day: 4,
      week: "Week 1",
      topic: "Objects",
      learn: "Objects, properties and methods",
      task: "Create a student object with name, skills and marks.",
      video:
        "https://www.youtube.com/results?search_query=javascript+objects+tutorial",
    },
    {
      day: 5,
      week: "Week 1",
      topic: "ES6",
      learn: "let, const, arrow functions, destructuring",
      task: "Convert normal functions into arrow functions.",
      video:
        "https://www.youtube.com/results?search_query=javascript+ES6+tutorial",
    },
    {
      day: 6,
      week: "Week 1",
      topic: "Async JavaScript",
      learn: "Promises, async and await",
      task: "Fetch data from a public API using async/await.",
      video:
        "https://www.youtube.com/results?search_query=javascript+async+await+promises",
    },
    {
      day: 7,
      week: "Week 1",
      topic: "JavaScript Project",
      learn: "DOM manipulation and JavaScript logic",
      task: "Build a Todo List using HTML, CSS and JavaScript.",
      video:
        "https://www.youtube.com/results?search_query=javascript+todo+list+project",
    },

    {
      day: 8,
      week: "Week 2",
      topic: "React Basics",
      learn: "Components, JSX and project structure",
      task: "Create your first React application.",
      video:
        "https://react.dev/learn",
    },
    {
      day: 9,
      week: "Week 2",
      topic: "Props",
      learn: "Passing data between components",
      task: "Create reusable StudentCard components.",
      video:
        "https://react.dev/learn/passing-props-to-a-component",
    },
    {
      day: 10,
      week: "Week 2",
      topic: "useState",
      learn: "State and state updates",
      task: "Build a counter and simple form using useState.",
      video:
        "https://react.dev/reference/react/useState",
    },
    {
      day: 11,
      week: "Week 2",
      topic: "Events",
      learn: "Click, change and submit events",
      task: "Create a registration form with event handling.",
      video:
        "https://react.dev/learn/responding-to-events",
    },
    {
      day: 12,
      week: "Week 2",
      topic: "useEffect",
      learn: "Side effects and API requests",
      task: "Fetch and display users from an API.",
      video:
        "https://react.dev/reference/react/useEffect",
    },
    {
      day: 13,
      week: "Week 2",
      topic: "React Router",
      learn: "Routes, navigation and pages",
      task: "Create Home, About and Contact pages.",
      video:
        "https://reactrouter.com/",
    },
    {
      day: 14,
      week: "Week 2",
      topic: "React Project",
      learn: "Combine React concepts",
      task: "Build a small React E-Commerce frontend.",
      video:
        "https://www.youtube.com/results?search_query=react+ecommerce+project",
    },

    {
      day: 15,
      week: "Week 3",
      topic: "Node.js",
      learn: "Node.js, npm and modules",
      task: "Create your first Node.js server.",
      video:
        "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
    },
    {
      day: 16,
      week: "Week 3",
      topic: "Express.js",
      learn: "Express server and routing",
      task: "Create GET and POST API routes.",
      video:
        "https://expressjs.com/",
    },
    {
      day: 17,
      week: "Week 3",
      topic: "REST API",
      learn: "HTTP methods and REST architecture",
      task: "Create CRUD APIs for students.",
      video:
        "https://www.youtube.com/results?search_query=node+express+rest+api+tutorial",
    },
    {
      day: 18,
      week: "Week 3",
      topic: "Middleware",
      learn: "Middleware and request processing",
      task: "Create a custom logging middleware.",
      video:
        "https://expressjs.com/en/guide/using-middleware.html",
    },
    {
      day: 19,
      week: "Week 3",
      topic: "Error Handling",
      learn: "API errors and status codes",
      task: "Create centralized Express error handling.",
      video:
        "https://expressjs.com/en/guide/error-handling.html",
    },
    {
      day: 20,
      week: "Week 3",
      topic: "API Testing",
      learn: "Testing APIs with Postman",
      task: "Test all CRUD endpoints.",
      video:
        "https://www.youtube.com/results?search_query=postman+api+testing+tutorial",
    },
    {
      day: 21,
      week: "Week 3",
      topic: "Node Project",
      learn: "Build a complete REST API",
      task: "Build a Student Management REST API.",
      video:
        "https://www.youtube.com/results?search_query=node+express+rest+api+project",
    },

    {
      day: 22,
      week: "Week 4",
      topic: "MongoDB Basics",
      learn: "Database, collections and documents",
      task: "Create a MongoDB database and collection.",
      video:
        "https://www.mongodb.com/docs/",
    },
    {
      day: 23,
      week: "Week 4",
      topic: "CRUD Operations",
      learn: "Create, Read, Update and Delete",
      task: "Perform CRUD operations on student data.",
      video:
        "https://www.youtube.com/results?search_query=mongodb+crud+tutorial",
    },
    {
      day: 24,
      week: "Week 4",
      topic: "Mongoose",
      learn: "Schemas and models",
      task: "Create a Student Mongoose model.",
      video:
        "https://mongoosejs.com/docs/guide.html",
    },
    {
      day: 25,
      week: "Week 4",
      topic: "MongoDB Atlas",
      learn: "Cloud database setup",
      task: "Connect your Node.js application to MongoDB Atlas.",
      video:
        "https://www.mongodb.com/docs/atlas/",
    },
    {
      day: 26,
      week: "Week 4",
      topic: "MongoDB + Express",
      learn: "Database integration",
      task: "Connect CRUD Express APIs with MongoDB.",
      video:
        "https://www.youtube.com/results?search_query=node+express+mongodb+mongoose+crud",
    },
    {
      day: 27,
      week: "Week 4",
      topic: "Authentication",
      learn: "JWT and password authentication",
      task: "Create register and login APIs.",
      video:
        "https://www.youtube.com/results?search_query=node+express+mongodb+jwt+authentication",
    },
    {
      day: 28,
      week: "Week 4",
      topic: "Database Project",
      learn: "Backend + MongoDB",
      task: "Build a Student Management backend.",
      video:
        "https://www.youtube.com/results?search_query=mern+student+management+project",
    },

    {
      day: 29,
      week: "Week 5",
      topic: "Git Basics",
      learn: "init, add, commit and status",
      task: "Create a Git repository for your project.",
      video:
        "https://git-scm.com/doc",
    },
    {
      day: 30,
      week: "Week 5",
      topic: "GitHub",
      learn: "Repositories and remote origin",
      task: "Push your project to GitHub.",
      video:
        "https://skills.github.com/",
    },
    {
      day: 31,
      week: "Week 5",
      topic: "Branches",
      learn: "Branching and merging",
      task: "Create a feature branch and merge it.",
      video:
        "https://www.youtube.com/results?search_query=git+branch+merge+tutorial",
    },
    {
      day: 32,
      week: "Week 5",
      topic: "Pull Requests",
      learn: "Pull requests and collaboration",
      task: "Create a pull request on GitHub.",
      video:
        "https://www.youtube.com/results?search_query=github+pull+request+tutorial",
    },
    {
      day: 33,
      week: "Week 5",
      topic: "Git Workflow",
      learn: "Professional Git workflow",
      task: "Practice clone, branch, commit, push and pull.",
      video:
        "https://www.youtube.com/results?search_query=professional+git+github+workflow",
    },
    {
      day: 34,
      week: "Week 5",
      topic: "GitHub Profile",
      learn: "README and project presentation",
      task: "Create a professional README for your project.",
      video:
        "https://www.youtube.com/results?search_query=professional+github+profile+readme",
    },
    {
      day: 35,
      week: "Week 5",
      topic: "Portfolio Preparation",
      learn: "Organize your projects",
      task: "Upload your best projects to GitHub.",
      video:
        "https://www.youtube.com/results?search_query=github+portfolio+for+developers",
    },

    {
      day: 36,
      week: "Week 6",
      topic: "MERN Architecture",
      learn: "Frontend, backend and database connection",
      task: "Design the architecture of your final project.",
      video:
        "https://www.youtube.com/results?search_query=MERN+stack+architecture+tutorial",
    },
    {
      day: 37,
      week: "Week 6",
      topic: "React + API",
      learn: "Axios and API integration",
      task: "Connect your React frontend with Express APIs.",
      video:
        "https://www.youtube.com/results?search_query=react+axios+node+express+api",
    },
    {
      day: 38,
      week: "Week 6",
      topic: "Authentication",
      learn: "Login, register and protected routes",
      task: "Add JWT authentication to your MERN application.",
      video:
        "https://www.youtube.com/results?search_query=mern+jwt+authentication+project",
    },
    {
      day: 39,
      week: "Week 6",
      topic: "Dashboard",
      learn: "Build application dashboard",
      task: "Create a responsive user dashboard.",
      video:
        "https://www.youtube.com/results?search_query=react+dashboard+project",
    },
    {
      day: 40,
      week: "Week 6",
      topic: "Testing",
      learn: "Frontend and backend testing",
      task: "Test APIs and fix application errors.",
      video:
        "https://www.youtube.com/results?search_query=mern+stack+testing+tutorial",
    },
    {
      day: 41,
      week: "Week 6",
      topic: "Deployment",
      learn: "Deploy frontend and backend",
      task: "Deploy your MERN project.",
      video:
        "https://www.youtube.com/results?search_query=deploy+MERN+stack+project",
    },
    {
      day: 42,
      week: "Week 6",
      topic: "Final Project",
      learn: "Complete MERN application",
      task: "Finish, test and publish your complete MERN project.",
      video:
        "https://www.youtube.com/results?search_query=complete+MERN+stack+project",
    },
  ];

  const toggleDay = (day) => {
    let updated;

    if (completedDays.includes(day)) {
      updated = completedDays.filter(
        (item) => item !== day
      );
    } else {
      updated = [...completedDays, day];
    }

    setCompletedDays(updated);

    localStorage.setItem(
      "completedDailyPlan",
      JSON.stringify(updated)
    );
  };

  const completedCount = completedDays.length;

  const progress = Math.round(
    (completedCount / dailyPlan.length) * 100
  );

  return (
    <div className="daily-plan-page">

    

      {/* Header */}
      <section className="daily-header">

        <span className="daily-label">
          PERSONALIZED DAILY PLAN
        </span>

        <h1>
          Your 42-Day Learning Plan
        </h1>

        <p>
          Learn every day, practice with projects,
          and track your progress toward becoming
          job ready.
        </p>

      </section>

      {/* Progress */}
      <section className="daily-progress-card">

        <div className="daily-progress-top">

          <div>
            <span>
              Learning Progress
            </span>

            <h2>
              {progress}%
            </h2>
          </div>

          <div className="completed-count">
            {completedCount} / {dailyPlan.length} Days
          </div>

        </div>

        <div className="daily-progress-bar">

          <div
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p>
          {completedCount === 0
            ? "Start Day 1 and begin your journey."
            : completedCount === dailyPlan.length
            ? "🎉 Congratulations! You completed the roadmap."
            : `${dailyPlan.length - completedCount} days remaining.`}
        </p>

      </section>

      {/* Daily List */}
      <section className="daily-container">

        <div className="daily-title">

          <h2>
            Daily Learning Plan
          </h2>

          <p>
            Complete each day before moving to the next.
          </p>

        </div>

        <div className="daily-list">

          {dailyPlan.map((item) => {

            const completed =
              completedDays.includes(item.day);

            return (
              <div
                className={`daily-card ${
                  completed ? "completed" : ""
                }`}
                key={item.day}
              >

                {/* Day */}
                <div className="day-number">
                  {completed ? "✓" : item.day}
                </div>

                {/* Content */}
                <div className="daily-content">

                  <div className="daily-card-header">

                    <div>

                      <span className="week-tag">
                        {item.week}
                      </span>

                      <h3>
                        {item.topic}
                      </h3>

                    </div>

                    <span className="day-tag">
                      Day {item.day}
                    </span>

                  </div>

                  {/* Learn */}
                  <div className="daily-info">

                    <strong>
                      📚 Learn
                    </strong>

                    <p>
                      {item.learn}
                    </p>

                  </div>

                  {/* Task */}
                  <div className="daily-info">

                    <strong>
                      💻 Today's Task
                    </strong>

                    <p>
                      {item.task}
                    </p>

                  </div>

                  {/* Bottom */}
                  <div className="daily-actions">

                    <a
                      href={item.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="watch-video"
                    >
                      ▶ Watch Video
                    </a>

                    <button
                      onClick={() =>
                        toggleDay(item.day)
                      }
                      className={
                        completed
                          ? "completed-btn"
                          : "complete-btn"
                      }
                    >
                      {completed
                        ? "✓ Completed"
                        : "Mark Complete"}
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </section>

      {/* Bottom */}
      <section className="daily-bottom">

        <button
          className="daily-back"
          onClick={() => navigate("/roadmap")}
        >
          ← Back to Roadmap
        </button>

        <button
          className="daily-next"
          onClick={() => navigate("/resources")}
        >
          Explore Resources →
        </button>

      </section>

    </div>
  );
};

export default DailyPlan;
