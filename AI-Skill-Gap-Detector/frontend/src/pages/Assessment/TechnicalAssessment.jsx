

import React, {

  useCallback,

  useEffect,

  useMemo,

  useRef,

  useState,

} from "react";

import { useNavigate } from "react-router-dom";

import "../../styles/technicalAssessment.css";

/* ---------------- Configuration ---------------- */

const STORAGE_KEY = "technicalCodingSubmissionsReactV1";

const RESULT_KEY = "technicalAssessmentAnswers";

const LANGUAGE_KEY = "technicalAssessmentLanguage";

const TIMER_KEY = "technicalAssessmentDeadlineReactV1";

const TOTAL_SECONDS = 30 * 60;

const WARNING_SECONDS = 2 * 60;

const DANGER_SECONDS = 30;

const AUTO_ADVANCE_MS = 2000;

const NEXT_PATH = "/assessment/reasoning";

const PROGRAMMING_LANGUAGES = [

  { value: "javascript", label: "JavaScript", executable: true },

  { value: "python", label: "Python", executable: false },

  { value: "java", label: "Java", executable: false },

  { value: "cpp", label: "C++", executable: false },

  { value: "c", label: "C", executable: false },

  { value: "typescript", label: "TypeScript", executable: false },

];

// The assessment is scoped to the role selected in the career step. The practical
// coding exercises verify practical problem solving; this focus map makes the
// interview topics and follow-up roadmap role-specific.
const ROLE_FOCUS = {
  "Frontend Developer": ["JavaScript core & async", "Semantic HTML, CSS & accessibility", "React hooks, state & rendering", "Performance, browser APIs & security", "Practical UI exercises"],
  "Backend Developer": ["HTTP, REST & authentication", "SQL/NoSQL, indexes & transactions", "Architecture, caching & queues", "Concurrency & reliability", "API and rate-limiter design"],
  "MERN Stack Developer": ["MongoDB & Mongoose", "Express middleware & JWT", "React, Router & API integration", "Node event loop & non-blocking I/O", "Full-stack architecture & deployment"],
  "Data Analyst": ["SQL joins, CTEs & window functions", "Excel formulas & pivot tables", "Statistics & A/B testing", "Pandas, NumPy & data cleaning", "KPIs, dashboards & case analysis"],
  "Machine Learning Engineer": ["ML fundamentals & evaluation", "Algorithms, validation & feature engineering", "Deep learning & transformers", "Math, probability & optimization", "MLOps, LLMs and model deployment"],
};

function getSelectedRole() {
  try {
    const saved = JSON.parse(localStorage.getItem("selectedJob") || "null");
    return typeof saved?.title === "string" ? saved.title : "Frontend Developer";
  } catch {
    return "Frontend Developer";
  }
}

/* ---------------- Coding challenges ---------------- */

const challenges = [

  {

    id: "modalFocus",

    title: "Accessible modal keyboard navigation",

    difficulty: "Intermediate",

    prompt:

      "Build an accessible modal in React with role=dialog, aria-modal, aria-labelledby, Escape-to-close, and focus trapping. In this runnable exercise, write nextFocusIndex(total, current, direction) to return the next focusable element index. direction is 1 for Tab and -1 for Shift+Tab.",

    functionName: "nextFocusIndex",

    starterCode: `function nextFocusIndex(total, current, direction) {

  // Write your solution here

}`,

    tests: [

      { args: [3, 2, 1], expected: 0 },

      { args: [3, 0, -1], expected: 2 },

      { args: [4, 1, 1], expected: 2 },

    ],

  },

  {

    id: "fetchState",

    title: "Fetch API data with useEffect",

    difficulty: "Intermediate",

    prompt:

      "Fetch API data with useEffect and show loading, error, and success states; then extract the lifecycle into a reusable useFetch custom Hook. In this runnable exercise, write getRequestState({ loading, error, data }) which returns loading, error, empty, or success for the UI state.",

    functionName: "getRequestState",

    starterCode: `function getRequestState({ loading, error, data }) {

  // Write your solution here

}`,

    tests: [

      { args: [{ loading: true, error: null, data: null }], expected: "loading" },

      { args: [{ loading: false, error: "Network error", data: null }], expected: "error" },

      { args: [{ loading: false, error: null, data: [] }], expected: "empty" },

    ],

  },

  {

    id: "memoizedSearch",

    title: "Search with useMemo and useCallback",

    difficulty: "Intermediate",

    prompt:

      "Build a search component using useMemo for filtered results and useCallback for stable handlers. In this runnable exercise, write filterByQuery(items, query) to return items whose name contains query, case-insensitively. An empty query returns all items.",

    functionName: "filterByQuery",

    starterCode: `function filterByQuery(items, query) {

  // Write your solution here

}`,

    tests: [

      { args: [[{ name: "React" }, { name: "Router" }, { name: "Node" }], "rea"], expected: [{ name: "React" }] },

      { args: [[{ name: "React" }, { name: "Router" }], "RO"], expected: [{ name: "Router" }] },

      { args: [[{ name: "React" }, { name: "Router" }], ""], expected: [{ name: "React" }, { name: "Router" }] },

    ],

  },

  {

    id: "todoReducer",

    title: "To-do application state with useState",

    difficulty: "Intermediate",

    prompt:

      "Build a to-do app with add, edit, delete, and complete functionality using useState. In this runnable exercise, write updateTodos(todos, action). action has type add, edit, toggle, or delete; each todo is { id, text, completed }.",

    functionName: "updateTodos",

    starterCode: `function updateTodos(todos, action) {

  // Return a new todo array. Do not mutate todos.

}`,

    tests: [

      { args: [[], { type: "add", todo: { id: 1, text: "Learn hooks", completed: false } }], expected: [{ id: 1, text: "Learn hooks", completed: false }] },

      { args: [[{ id: 1, text: "Learn hooks", completed: false }], { type: "toggle", id: 1 }], expected: [{ id: 1, text: "Learn hooks", completed: true }] },

      { args: [[{ id: 1, text: "Old", completed: false }, { id: 2, text: "Keep", completed: false }], { type: "edit", id: 1, text: "New" }], expected: [{ id: 1, text: "New", completed: false }, { id: 2, text: "Keep", completed: false }] },

      { args: [[{ id: 1, text: "Remove", completed: false }], { type: "delete", id: 1 }], expected: [] },

    ],

  },

  {

    id: "lazyRoutes",

    title: "React Router, Context, and lazy loading",

    difficulty: "Intermediate",

    prompt:

      "Create a multi-page React app using React Router, Context API, and lazy loading. In this runnable exercise, write getLazyRouteNames(routes) to return the paths of routes configured for lazy loading. Each route is { path, lazy }.",

    functionName: "getLazyRouteNames",

    starterCode: `function getLazyRouteNames(routes) {

  // Return an array of paths where lazy is true.

}`,

    tests: [

      { args: [[{ path: "/", lazy: false }, { path: "/dashboard", lazy: true }]], expected: ["/dashboard"] },

      { args: [[{ path: "/login", lazy: true }, { path: "/settings", lazy: true }]], expected: ["/login", "/settings"] },

      { args: [[{ path: "/", lazy: false }]], expected: [] },

    ],

  },

];

/* ---------------- JavaScript worker ---------------- */

// A Web Worker timeout helps with infinite loops, but it is NOT

// a security sandbox. Use an isolated backend runner for production.

const workerScript = `
self.onmessage = ({ data }) => {
  try {
    const factory = new Function(
      '"use strict";\\n' +
      data.code +
      '\\n;return typeof ' + data.functionName +
      ' === "function" ? ' + data.functionName + ' : null;'
    );

    const candidate = factory();
    if (typeof candidate !== "function") {
      throw new Error("Define a function named " + data.functionName + ".");
    }

    const checks = data.tests.map(({ args, expected }) => {
      try {
        const actual = candidate(...args);
        const passed = JSON.stringify(actual) === JSON.stringify(expected);
        return { passed, expected, actual, error: null };
      } catch (error) {
        return {
          passed: false,
          expected,
          actual: undefined,
          error: error instanceof Error ? error.message : "Test execution failed."
        };
      }
    });

    self.postMessage({ checks, passed: checks.every((check) => check.passed) });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : "Unable to execute your solution."
    });
  }
};
`;

function runInWorker(challenge, code) {

  return new Promise((resolve) => {

    if (typeof Worker === "undefined") {

      resolve({

        error: "Your browser does not support Web Workers.",

      });

      return;

    }

    let worker;

    let url;

    let timer;

    let finished = false;

    const finish = (result) => {

      if (finished) return;

      finished = true;

      clearTimeout(timer);

      if (worker) {

        worker.terminate();

      }

      if (url) {

        URL.revokeObjectURL(url);

      }

      resolve(result);

    };

    try {

      url = URL.createObjectURL(

        new Blob([workerScript], {

          type: "text/javascript",

        })

      );

      worker = new Worker(url);

    } catch {

      finish({

        error: "Unable to start the code runner.",

      });

      return;

    }

    timer = setTimeout(() => {

      finish({

        error:

          "Execution timed out. Check your code for an infinite loop.",

      });

    }, 1500);

    worker.onmessage = ({ data }) => finish(data);

    worker.onerror = () => {

      finish({

        error: "An execution error occurred.",

      });

    };

    try {

      worker.postMessage({

        code,

        functionName: challenge.functionName,

        tests: challenge.tests,

      });

    } catch {

      finish({

        error: "Unable to send code to the test runner.",

      });

    }

  });

}

/* ---------------- Storage helpers ---------------- */

function safeRead(key, fallback) {

  try {

    const value = localStorage.getItem(key);

    return value === null ? fallback : value;

  } catch {

    return fallback;

  }

}

function getSavedLanguage() {

  const saved = safeRead(LANGUAGE_KEY, "javascript");

  return PROGRAMMING_LANGUAGES.some(

    (item) => item.value === saved

  )

    ? saved

    : "javascript";

}

function readSavedSubmissions() {

  try {

    const saved = JSON.parse(

      localStorage.getItem(STORAGE_KEY) || "{}"

    );

    if (

      !saved ||

      typeof saved !== "object" ||

      Array.isArray(saved)

    ) {

      return {};

    }

    const valid = {};

    challenges.forEach(({ id }) => {

      const entry = saved[id];

      if (entry && typeof entry.code === "string") {

        valid[id] = {

          code: entry.code,

          // Keep progress when refreshing the page.

          // Client-side flags are not secure for official grading.

          passed: entry.passed === true,

        };

      }

    });

    return valid;

  } catch {

    return {};

  }

}

function getDeadline() {

  try {

    const saved = Number(localStorage.getItem(TIMER_KEY));

    if (Number.isFinite(saved) && saved > 0) {

      return saved;

    }

    const deadline = Date.now() + TOTAL_SECONDS * 1000;

    localStorage.setItem(TIMER_KEY, String(deadline));

    return deadline;

  } catch {

    return Date.now() + TOTAL_SECONDS * 1000;

  }

}

function secondsLeft(deadline) {

  return Math.max(

    0,

    Math.ceil((deadline - Date.now()) / 1000)

  );

}

function formatTime(totalSeconds) {

  const minutes = String(

    Math.floor(totalSeconds / 60)

  ).padStart(2, "0");

  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;

}

function displayValue(value) {

  if (value === undefined) return "undefined";

  try {

    return JSON.stringify(value) ?? String(value);

  } catch {

    return String(value);

  }

}

function getAssessedSkillRatings(submissions) {
  const passed = (id) => submissions[id]?.passed === true;
  const passedCount = challenges.filter(({ id }) => passed(id)).length;

  return {
    // These values are intentionally limited to competencies covered by the
    // five React exercises; omitted skills are displayed as "Not assessed".
    JavaScript: Math.round((passedCount / challenges.length) * 5),
    React: Math.round((passedCount / challenges.length) * 5),
    HTML: passed("modalFocus") ? 4 : 0,
    "REST API": passed("fetchState") ? 4 : 0,
  };
}

/* ---------------- Main component ---------------- */

export default function TechnicalAssessment() {

  const navigate = useNavigate();
  const [targetRole] = useState(getSelectedRole);
  const focusTopics = ROLE_FOCUS[targetRole] || ROLE_FOCUS["Frontend Developer"];

  const [activeIndex, setActiveIndex] = useState(0);

  const [submissions, setSubmissions] = useState(

    readSavedSubmissions

  );

  const [language, setLanguage] = useState(getSavedLanguage);

  const [result, setResult] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const [modal, setModal] = useState(null);

  const [deadline] = useState(getDeadline);

  const [remaining, setRemaining] = useState(

    () => secondsLeft(deadline)

  );

  const [completed, setCompleted] = useState(false);

  const timeUpHandled = useRef(false);

  const challenge = challenges[activeIndex];

  const selectedLanguage =

    PROGRAMMING_LANGUAGES.find(

      (item) => item.value === language

    ) || PROGRAMMING_LANGUAGES[0];

  const code =

    submissions[challenge.id]?.code ??

    challenge.starterCode;

  const passedCount = useMemo(

    () =>

      challenges.filter(

        ({ id }) => submissions[id]?.passed === true

      ).length,

    [submissions]

  );

  const assessedSkillRatings = useMemo(
    () => getAssessedSkillRatings(submissions),
    [submissions]
  );

  const completionPercentage = Math.round(

    (passedCount / challenges.length) * 100

  );

  const timePercentage = Math.max(

    0,

    Math.min(100, (remaining / TOTAL_SECONDS) * 100)

  );

  const timerState =

    remaining <= DANGER_SECONDS

      ? "danger"

      : remaining <= WARNING_SECONDS

        ? "warning"

        : "normal";

  const isTimeUp = remaining === 0;

  const locked = isTimeUp || completed || modal === "timeup";
  /* ---------------- Timer ---------------- */

  useEffect(() => {

    if (completed) return undefined;

    const id = setInterval(() => {

      setRemaining(secondsLeft(deadline));

    }, 500);

    return () => clearInterval(id);

  }, [deadline, completed]);

  /* ---------------- Autosave ---------------- */

  useEffect(() => {

    try {

      localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(submissions)

      );

    } catch {

      // Keep the assessment usable if storage is unavailable.

    }

  }, [submissions]);

  useEffect(() => {

    try {

      localStorage.setItem(LANGUAGE_KEY, language);

    } catch {

      // The selector still works without localStorage.

    }

  }, [language]);

  /* ---------------- Save assessment result ---------------- */

  const saveResult = useCallback(

    (timedOut) => {

      const secondsUsed = Math.max(

        0,

        Math.min(

          TOTAL_SECONDS,

          TOTAL_SECONDS - secondsLeft(deadline)

        )

      );

      try {

        localStorage.setItem(

          RESULT_KEY,

          JSON.stringify({

            passed: passedCount,

            total: challenges.length,

            timedOut,

            secondsUsed,

            completedAt: new Date().toISOString(),

            language,

            targetRole,

            focusTopics,

            skillRatings: assessedSkillRatings,

            challenges: challenges.map((item) => ({

              id: item.id,

              passed:

                submissions[item.id]?.passed === true,

            })),

          })

        );

        localStorage.removeItem(TIMER_KEY);

        setCompleted(true);

        return true;

      } catch {

        return false;

      }

    },

    [passedCount, deadline, language, submissions, targetRole, focusTopics, assessedSkillRatings]

  );

  /* ---------------- Time-up handling ---------------- */

  useEffect(() => {

    if (

      remaining !== 0 ||

      timeUpHandled.current ||

      completed

    ) {

      return;

    }

    timeUpHandled.current = true;

    saveResult(true);

    setModal("timeup");

  }, [remaining, completed, saveResult]);

  useEffect(() => {

    if (modal !== "timeup") return undefined;

    const id = setTimeout(() => {

      navigate(NEXT_PATH);

    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(id);

  }, [modal, navigate]);

  /* ---------------- Editor actions ---------------- */

  const updateCode = (value) => {

    if (locked || isRunning) return;

    setSubmissions((previous) => ({

      ...previous,

      [challenge.id]: {

        code: value,

        passed: false,

      },

    }));

    setResult(null);

  };

  const resetCode = () => {

    updateCode(challenge.starterCode);

  };

  const runTests = async () => {

    if (isRunning || locked) return;

    if (!selectedLanguage.executable) {

      setResult({

        type: "error",

        message:

          `${selectedLanguage.label} execution is not configured. ` +

          "Select JavaScript or connect a compatible code execution service.",

        checks: [],

      });

      return;

    }

    setIsRunning(true);

    setResult(null);

    try {

      const evaluation = await runInWorker(

        challenge,

        code

      );

      if (evaluation.error) {

        setSubmissions((previous) => ({

          ...previous,

          [challenge.id]: {

            code,

            passed: false,

          },

        }));

        setResult({

          type: "error",

          message: evaluation.error,

          checks: [],

        });

        return;

      }

      setSubmissions((previous) => ({

        ...previous,

        [challenge.id]: {

          code,

          passed: evaluation.passed,

        },

      }));

      setResult({

        type: evaluation.passed ? "success" : "error",

        message: evaluation.passed

          ? "Excellent! All test cases passed."

          : "Some test cases failed. Review the results below.",

        checks: evaluation.checks,

      });

    } catch {

      setResult({

        type: "error",

        message: "Something went wrong while running the tests.",

        checks: [],

      });

    } finally {

      setIsRunning(false);

    }

  };

  const handleEditorKeyDown = (event) => {

    if (

      (event.ctrlKey || event.metaKey) &&

      event.key === "Enter"

    ) {

      event.preventDefault();

      runTests();

    }

  };

  const changeLanguage = (nextLanguage) => {

    if (isRunning || locked) return;

    setLanguage(nextLanguage);

    setResult(null);

  };

  const goToChallenge = (index) => {

    if (

      isRunning ||

      locked ||

      index < 0 ||

      index >= challenges.length

    ) {

      return;

    }

    setActiveIndex(index);

    setResult(null);

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="technical-page">

      <header className="technical-header">

        <div>

          <h1>Technical Skills Assessment</h1>

          <p>

            {targetRole} track · solve practical coding exercises and review the interview areas your role requires.

          </p>

        </div>

        </header>

      {/* Timer */}

      <section

        className={`time-bar ${timerState}`}

        aria-label="Time remaining"

      >

        <div className="time-bar-info">

          <span>⏱ Time remaining</span>

          <strong

            role="timer"

            aria-live="off"

            aria-label={`${Math.floor(remaining / 60)} minutes ${

              remaining % 60

            } seconds remaining`}

          >

            {formatTime(remaining)}

          </strong>

        </div>

        <div

          className="time-bar-track"

          role="progressbar"

          aria-valuemin={0}

          aria-valuemax={TOTAL_SECONDS}

          aria-valuenow={remaining}

          aria-label="Time remaining"

        >

          <div

            className="time-bar-fill"

            style={{ width: `${timePercentage}%` }}

          />

        </div>

        {timerState !== "normal" && !isTimeUp && (

          <p className="time-bar-note" role="status">

            {timerState === "danger"

              ? "Less than 1 minute left!"

              : "Less than 2 minutes left."}

          </p>

        )}

      </section>

      <section className="assessment-scope" aria-label={`${targetRole} assessment topics`}>
        <div>
          <span className="scope-label">Your technical track</span>
          <h2>{targetRole}</h2>
          <p>These are the competencies used to shape your technical review and personalized roadmap.</p>
        </div>
        <ul>
          {focusTopics.map((topic) => <li key={topic}>✓ {topic}</li>)}
        </ul>
      </section>

      {/* Challenge progress */}

      <section

        className="technical-progress"

        aria-label="Assessment progress"

      >

        <div className="progress-info">

          <span>

            Challenge {activeIndex + 1} of {challenges.length}

          </span>

          <span>

            {passedCount} / {challenges.length} passed ·{" "}

            {completionPercentage}%

          </span>

        </div>

        <div

          className="progress-track"

          role="progressbar"

          aria-valuemin={0}

          aria-valuemax={challenges.length}

          aria-valuenow={passedCount}

          aria-label="Challenges passed"

        >

          <div

            className="progress-fill"

            style={{

              width: `${completionPercentage}%`,

            }}

          />

        </div>

      </section>

      <main className="question-container">

        <section className="question-card">

          <div className="question-number">

            Live coding challenge {activeIndex + 1}

          </div>

          <span className="question-topic">

            Coding assessment · Drafts save automatically

          </span>

          <h2>{challenge.title}</h2>

          <p>{challenge.prompt}</p>

          <div className="challenge-meta">

            <span>Difficulty: {challenge.difficulty}</span>

            <span>{challenge.tests.length} test cases</span>

          </div>

          {/* Examples */}

          <div className="visible-tests">

            <strong>Example test cases</strong>

            <ul>

              {challenge.tests.map(

                ({ args, expected }, index) => (

                  <li key={`${challenge.id}-${index}`}>

                    <code>

                      {challenge.functionName}(

                      {args.map(displayValue).join(", ")})

                    </code>

                    {" → "}

                    <code>{displayValue(expected)}</code>

                  </li>

                )

              )}

            </ul>

          </div>

          {/* Language selector */}

          <div className="language-selector">

<select

              id="programming-language"

              aria-label="Programming language"
              value={language}

              onChange={(event) =>

                changeLanguage(event.target.value)

              }

              disabled={isRunning || locked}

            >

              {PROGRAMMING_LANGUAGES.map((item) => (

                <option

                  key={item.value}

                  value={item.value}

                >

                  {item.label}

                  {item.executable

                    ? " — Ready"

                    : " — Runner required"}

                </option>

              ))}

            </select>

</div>

          {/* Code editor */}

          <label htmlFor="technical-code">

            <strong>

              Your {selectedLanguage.label} solution

            </strong>

          </label>

          <textarea

            id="technical-code"

            className="technical-editor"

            value={code}

            onChange={(event) =>

              updateCode(event.target.value)

            }

            onKeyDown={handleEditorKeyDown}

            spellCheck={false}

            autoCapitalize="off"

            autoCorrect="off"

            autoComplete="off"

            rows={12}

            disabled={isRunning || locked}

            aria-describedby="editor-help"

          />

<div className="editor-actions">

            <button

              type="button"

              className="next-btn"

              onClick={runTests}

              disabled={isRunning || locked}

            >

              {isRunning ? "Running tests..." : "▶ Run tests"}

            </button>

            <button

              type="button"

              className="previous-btn"

              onClick={resetCode}

              disabled={isRunning || locked}

            >

              Reset code

            </button>

          </div>

          {/* Results */}

          {result && (

            <section

              className={`test-results ${result.type}`}

              role="status"

              aria-live="polite"

            >

              <h3>

                {result.type === "success"

                  ? "✓ Test results"

                  : "Test results"}

              </h3>

              <p>{result.message}</p>

              {result.checks.length > 0 && (

                <>

                  <p>

                    Score:{" "}

                    {

                      result.checks.filter(

                        (item) => item.passed

                      ).length

                    }{" "}

                    / {result.checks.length} tests passed

                  </p>

                  <div className="test-case-list">

                    {result.checks.map((check, index) => (

                      <article

                        className="test-case"

                        key={`${challenge.id}-result-${index}`}

                      >

                        <strong>

                          {check.passed ? "✓" : "✗"} Test{" "}

                          {index + 1}

                        </strong>

                        <p>

                          Expected:{" "}

                          <code>

                            {displayValue(check.expected)}

                          </code>

                        </p>

                        <p>

                          Actual:{" "}

                          <code>

                            {displayValue(check.actual)}

                          </code>

                        </p>

                        {check.error && (

                          <p>Error: {check.error}</p>

                        )}

                      </article>

                    ))}

                  </div>

                </>

              )}

            </section>

          )}

        </section>

        {/* Challenge navigation */}

        <nav
          className="question-navigation"
          aria-label="Challenge navigation"
        >
          <button
            type="button"
            className="previous-btn"
            onClick={() => goToChallenge(activeIndex - 1)}
            disabled={activeIndex === 0 || isRunning || locked}
          >
            ← Previous
          </button>

          <span className="question-counter">
            {activeIndex + 1} / {challenges.length}
          </span>

          {activeIndex === challenges.length - 1 ? (
            <button
              type="button"
              className="finish-btn"
              onClick={() => {
                saveResult(false);
                navigate(NEXT_PATH);
              }}
              disabled={isRunning || locked}
            >
              Finish section →
            </button>
          ) : (
            <button
              type="button"
              className="next-btn"
              onClick={() => goToChallenge(activeIndex + 1)}
              disabled={isRunning || locked}
            >
              Next →
            </button>
          )}
        </nav>

      </main>

      {/* Confirmation dialogs */}

      {modal && (

        <div className="modal-backdrop">

          <div

            className="modal-card"

            role="dialog"

            aria-modal="true"

            aria-labelledby="modal-title"

          >

            {modal === "timeup" && (

              <>

                <h2 id="modal-title">

                  ⏰ Time&apos;s up!

                </h2>

                <p>

                  Your results were saved: {passedCount} of{" "}

                  {challenges.length} challenges passed.

                  Moving to the next section...

                </p>

                <div className="modal-actions">

                  <button

                    type="button"

                    className="finish-btn"

                    onClick={() => navigate(NEXT_PATH)}

                    autoFocus

                  >

                    Continue now →

                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </div>

  );

}

