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

const ROLE_FOCUS = {
  "Frontend Developer": [
    "JavaScript core & async",
    "Semantic HTML, CSS & accessibility",
    "React hooks, state & rendering",
    "Performance, browser APIs & security",
    "Practical UI exercises",
  ],
  "Backend Developer": [
    "HTTP, REST & authentication",
    "SQL/NoSQL, indexes & transactions",
    "Architecture, caching & queues",
    "Concurrency & reliability",
    "API and rate-limiter design",
  ],
  "MERN Stack Developer": [
    "MongoDB & Mongoose",
    "Express middleware & JWT",
    "React, Router & API integration",
    "Node event loop & non-blocking I/O",
    "Full-stack architecture & deployment",
  ],
  "Data Analyst": [
    "SQL joins, CTEs & window functions",
    "Excel formulas & pivot tables",
    "Statistics & A/B testing",
    "Pandas, NumPy & data cleaning",
    "KPIs, dashboards & funnel analysis",
  ],
  "Machine Learning Engineer": [
    "ML fundamentals & evaluation",
    "Algorithms, validation & metrics",
    "Deep learning & neural networks",
    "Math, probability & optimization",
    "MLOps, LLMs and model deployment",
  ],
};

function normalizeRoleName(title = "") {
  const norm = String(title || "").trim().toLowerCase();
  if (
    norm.includes("mern") ||
    norm.includes("full stack") ||
    norm.includes("full-stack") ||
    norm.includes("fullstack")
  ) {
    return "MERN Stack Developer";
  }
  if (norm.includes("backend") || norm.includes("back-end")) {
    return "Backend Developer";
  }
  if (
    norm.includes("machine learning") ||
    norm.includes("ai engineer") ||
    norm.includes("artificial intelligence") ||
    norm.includes("data scientist")
  ) {
    return "Machine Learning Engineer";
  }
  if (
    norm.includes("data analyst") ||
    norm.includes("analytics") ||
    norm.includes("data analysis")
  ) {
    return "Data Analyst";
  }
  return "Frontend Developer";
}

function getSelectedRole() {
  try {
    const raw = localStorage.getItem("selectedJob");
    if (!raw) return "Frontend Developer";
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return normalizeRoleName(parsed);
      if (typeof parsed?.title === "string") return normalizeRoleName(parsed.title);
      if (typeof parsed?.name === "string") return normalizeRoleName(parsed.name);
    } catch {
      return normalizeRoleName(raw);
    }
    return "Frontend Developer";
  } catch {
    return "Frontend Developer";
  }
}

/* ---------------- Coding challenges ---------------- */

const FRONTEND_CHALLENGES = [
  {
    id: "modalFocus",
    title: "Accessible modal keyboard navigation",
    difficulty: "Intermediate",
    prompt:
      "Build an accessible modal in React with role=dialog, aria-modal, aria-labelledby, Escape-to-close, and focus trapping. In this runnable exercise, write nextFocusIndex(total, current, direction) to return the next focusable element index (wrapping around if necessary). direction is 1 for Tab and -1 for Shift+Tab.",
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
      "Fetch API data with useEffect and show loading, error, and success states; then extract the lifecycle into a reusable useFetch custom Hook. In this runnable exercise, write getRequestState({ loading, error, data }) which returns 'loading', 'error', 'empty' (if data is null or an empty array), or 'success' for the UI state.",
    functionName: "getRequestState",
    starterCode: `function getRequestState({ loading, error, data }) {
  // Write your solution here
}`,
    tests: [
      { args: [{ loading: true, error: null, data: null }], expected: "loading" },
      { args: [{ loading: false, error: "Network error", data: null }], expected: "error" },
      { args: [{ loading: false, error: null, data: [] }], expected: "empty" },
      { args: [{ loading: false, error: null, data: [{ id: 1 }] }], expected: "success" },
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
      {
        args: [[{ name: "React" }, { name: "Router" }, { name: "Node" }], "rea"],
        expected: [{ name: "React" }],
      },
      {
        args: [[{ name: "React" }, { name: "Router" }], "RO"],
        expected: [{ name: "Router" }],
      },
      {
        args: [[{ name: "React" }, { name: "Router" }], ""],
        expected: [{ name: "React" }, { name: "Router" }],
      },
    ],
  },
  {
    id: "todoReducer",
    title: "To-do application state with useState",
    difficulty: "Intermediate",
    prompt:
      "Build a to-do app with add, edit, delete, and complete functionality using useState. In this runnable exercise, write updateTodos(todos, action). action has type 'add', 'edit', 'toggle', or 'delete'; each todo is { id, text, completed }.",
    functionName: "updateTodos",
    starterCode: `function updateTodos(todos, action) {
  // Return a new todo array. Do not mutate todos.
}`,
    tests: [
      {
        args: [
          [],
          { type: "add", todo: { id: 1, text: "Learn hooks", completed: false } },
        ],
        expected: [{ id: 1, text: "Learn hooks", completed: false }],
      },
      {
        args: [
          [{ id: 1, text: "Learn hooks", completed: false }],
          { type: "toggle", id: 1 },
        ],
        expected: [{ id: 1, text: "Learn hooks", completed: true }],
      },
      {
        args: [
          [
            { id: 1, text: "Old", completed: false },
            { id: 2, text: "Keep", completed: false },
          ],
          { type: "edit", id: 1, text: "New" },
        ],
        expected: [
          { id: 1, text: "New", completed: false },
          { id: 2, text: "Keep", completed: false },
        ],
      },
      {
        args: [
          [{ id: 1, text: "Remove", completed: false }],
          { type: "delete", id: 1 },
        ],
        expected: [],
      },
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
      {
        args: [
          [
            { path: "/", lazy: false },
            { path: "/dashboard", lazy: true },
          ],
        ],
        expected: ["/dashboard"],
      },
      {
        args: [
          [
            { path: "/login", lazy: true },
            { path: "/settings", lazy: true },
          ],
        ],
        expected: ["/login", "/settings"],
      },
      {
        args: [[{ path: "/", lazy: false }]],
        expected: [],
      },
    ],
  },
];

const BACKEND_CHALLENGES = [
  {
    id: "httpAuth",
    title: "HTTP, REST and authentication",
    difficulty: "Intermediate",
    prompt:
      "Design a REST endpoint check. Write getHttpResponse(method, authenticated) returning { status, message }. GET and POST require authentication: if authenticated is true return { status: 200, message: 'ok' }, if false return { status: 401, message: 'unauthorized' }. Any other HTTP method returns { status: 405, message: 'method_not_allowed' }.",
    functionName: "getHttpResponse",
    starterCode: `function getHttpResponse(method, authenticated) {
  // Return { status, message }
}`,
    tests: [
      { args: ["GET", true], expected: { status: 200, message: "ok" } },
      { args: ["POST", false], expected: { status: 401, message: "unauthorized" } },
      { args: ["PATCH", true], expected: { status: 405, message: "method_not_allowed" } },
    ],
  },
  {
    id: "queryIndex",
    title: "SQL/NoSQL, indexes and transactions",
    difficulty: "Intermediate",
    prompt:
      "Choose the indexed fields that match a query. Write recommendedIndex(query) to return an array of query keys in their original order, excluding undefined, null, and empty-string ('') values.",
    functionName: "recommendedIndex",
    starterCode: `function recommendedIndex(query) {
  // Return fields that should be indexed for this query.
}`,
    tests: [
      { args: [{ email: "a@b.com", status: "active" }], expected: ["email", "status"] },
      { args: [{ userId: 7, createdAt: null, status: "" }], expected: ["userId"] },
      { args: [{}], expected: [] },
    ],
  },
  {
    id: "cacheQueue",
    title: "Architecture, caching and queues",
    difficulty: "Intermediate",
    prompt:
      "Decide whether a request should be served from cache or queued for background work. Write routeWork({ cacheHit, isSlow }) to return 'cache' if cacheHit is true. If cacheHit is false and isSlow is true, return 'queue'. Otherwise return 'origin'.",
    functionName: "routeWork",
    starterCode: `function routeWork({ cacheHit, isSlow }) {
  // Return "cache", "queue", or "origin".
}`,
    tests: [
      { args: [{ cacheHit: true, isSlow: true }], expected: "cache" },
      { args: [{ cacheHit: false, isSlow: true }], expected: "queue" },
      { args: [{ cacheHit: false, isSlow: false }], expected: "origin" },
    ],
  },
  {
    id: "retryPolicy",
    title: "Concurrency and reliability",
    difficulty: "Intermediate",
    prompt:
      "Implement safe exponential retry timing. Write retryDelay(attempt, baseMs) so attempt 0 returns baseMs and each subsequent attempt doubles the delay (baseMs * 2^attempt).",
    functionName: "retryDelay",
    starterCode: `function retryDelay(attempt, baseMs) {
  // Return the retry delay in milliseconds.
}`,
    tests: [
      { args: [0, 100], expected: 100 },
      { args: [2, 100], expected: 400 },
      { args: [3, 250], expected: 2000 },
    ],
  },
  {
    id: "rateLimiter",
    title: "API and rate-limiter design",
    difficulty: "Intermediate",
    prompt:
      "Implement a fixed-window rate-limit check. Write isAllowed(requestCount, limit) to return true only when requestCount is strictly less than limit, otherwise false.",
    functionName: "isAllowed",
    starterCode: `function isAllowed(requestCount, limit) {
  // Return true when request can proceed.
}`,
    tests: [
      { args: [0, 5], expected: true },
      { args: [4, 5], expected: true },
      { args: [5, 5], expected: false },
    ],
  },
];

const makeChallenge = (id, title, prompt, functionName, starterCode, tests) => ({
  id,
  title,
  prompt,
  functionName,
  starterCode,
  tests,
  difficulty: "Intermediate",
});

const MERN_CHALLENGES = [
  makeChallenge(
    "mongoSchema",
    "MongoDB documents and schemas",
    "Sanitize MongoDB document keys. Write selectDocumentFields(document) to return an array of keys whose values are not null, not undefined, and not empty string ('').",
    "selectDocumentFields",
    `function selectDocumentFields(document) {\n  // Return selected field names.\n}`,
    [
      { args: [{ name: "Ada", age: null, role: "" }], expected: ["name"] },
      { args: [{ id: 1, active: false }], expected: ["id", "active"] },
    ]
  ),
  makeChallenge(
    "expressMiddleware",
    "Express middleware and JWT",
    "Verify authentication token in Express middleware. Write authorizeRequest(token) returning 'authorized' when token is a non-empty string, otherwise 'unauthorized'.",
    "authorizeRequest",
    `function authorizeRequest(token) {\n  // Return "authorized" or "unauthorized".\n}`,
    [
      { args: ["jwt.token"], expected: "authorized" },
      { args: [""], expected: "unauthorized" },
      { args: [null], expected: "unauthorized" },
    ]
  ),
  makeChallenge(
    "reactApi",
    "React API integration",
    "Manage API state in React. Write apiViewState({ loading, error, data }) returning 'loading' if loading is true, 'error' if error is non-null, 'empty' if data is empty array or null, and 'success' otherwise.",
    "apiViewState",
    `function apiViewState({ loading, error, data }) {\n  // Return the UI state.\n}`,
    [
      { args: [{ loading: true, error: null, data: null }], expected: "loading" },
      { args: [{ loading: false, error: "Failed", data: null }], expected: "error" },
      { args: [{ loading: false, error: null, data: [] }], expected: "empty" },
      { args: [{ loading: false, error: null, data: [{ id: 1 }] }], expected: "success" },
    ]
  ),
  makeChallenge(
    "nodeEventLoop",
    "Node.js non-blocking work",
    "Route tasks to avoid blocking the Node.js event loop. Write executionMode(isCpuHeavy) returning 'worker' if isCpuHeavy is true, otherwise 'eventLoop'.",
    "executionMode",
    `function executionMode(isCpuHeavy) {\n  // Return "worker" or "eventLoop".\n}`,
    [
      { args: [true], expected: "worker" },
      { args: [false], expected: "eventLoop" },
    ]
  ),
  makeChallenge(
    "fullStackDesign",
    "Full-stack architecture and deployment",
    "Generate environment-aware deployment config. Write deploymentConfig(environment) returning { secure: true, cache: true } for 'production' and { secure: false, cache: false } otherwise.",
    "deploymentConfig",
    `function deploymentConfig(environment) {\n  // Return deployment configuration.\n}`,
    [
      { args: ["production"], expected: { secure: true, cache: true } },
      { args: ["development"], expected: { secure: false, cache: false } },
    ]
  ),
];

const DATA_ANALYST_CHALLENGES = [
  makeChallenge(
    "sqlAggregation",
    "SQL aggregation and windows",
    "Simulate a SQL GROUP BY SUM aggregation. Write groupTotals(rows) to return an object where each key is a category name and its value is the total sum of amount for that category.",
    "groupTotals",
    `function groupTotals(rows) {\n  // Return totals by category.\n}`,
    [
      {
        args: [
          [
            { category: "A", amount: 2 },
            { category: "A", amount: 3 },
            { category: "B", amount: 4 },
          ],
        ],
        expected: { A: 5, B: 4 },
      },
      { args: [[]], expected: {} },
    ]
  ),
  makeChallenge(
    "excelLookup",
    "Excel lookups and pivot thinking",
    "Simulate an Excel VLOOKUP/XLOOKUP by identifier. Write lookupById(rows, id) returning the row matching id, or null if not found.",
    "lookupById",
    `function lookupById(rows, id) {\n  // Find the matching row.\n}`,
    [
      {
        args: [
          [
            { id: 1, value: "A" },
            { id: 2, value: "B" },
          ],
          2,
        ],
        expected: { id: 2, value: "B" },
      },
      { args: [[], 1], expected: null },
    ]
  ),
  makeChallenge(
    "statistics",
    "Statistics and A/B testing",
    "Compute arithmetic mean for a metric. Write mean(values) returning the arithmetic mean of an array of numbers, or 0 if the array is empty.",
    "mean",
    `function mean(values) {\n  // Return the arithmetic mean.\n}`,
    [
      { args: [[2, 4, 6]], expected: 4 },
      { args: [[]], expected: 0 },
    ]
  ),
  makeChallenge(
    "pandasCleaning",
    "Data cleaning with Pandas",
    "Simulate Pandas dropna filtering. Write cleanValues(values) returning an array excluding null, undefined, and empty string ('') elements.",
    "cleanValues",
    `function cleanValues(values) {\n  // Return cleaned values.\n}`,
    [
      { args: [[1, null, "", 2, undefined, 3]], expected: [1, 2, 3] },
      { args: [[0, false]], expected: [0, false] },
    ]
  ),
  makeChallenge(
    "kpiInsight",
    "KPIs and funnel analysis",
    "Calculate funnel conversion rate. Write conversionRate(visitors, conversions) returning the percentage (conversions / visitors * 100) rounded to two decimal places (e.g. 12.5). Return 0 if visitors is 0 or negative.",
    "conversionRate",
    `function conversionRate(visitors, conversions) {\n  // Return a percentage rounded to two decimals.\n}`,
    [
      { args: [200, 25], expected: 12.5 },
      { args: [0, 5], expected: 0 },
    ]
  ),
];

const ML_CHALLENGES = [
  makeChallenge(
    "mlFundamentals",
    "ML fundamentals and evaluation",
    "Diagnose model generalization. Write classifyFit(trainScore, validationScore) returning 'overfit' if (trainScore - validationScore) > 0.15, otherwise 'stable'.",
    "classifyFit",
    `function classifyFit(trainScore, validationScore) {\n  // Return "overfit" or "stable".\n}`,
    [
      { args: [0.95, 0.7], expected: "overfit" },
      { args: [0.8, 0.72], expected: "stable" },
    ]
  ),
  makeChallenge(
    "modelMetrics",
    "Algorithms, validation and metrics",
    "Calculate classification precision metric. Write precision(tp, fp) returning tp / (tp + fp), or 0 when (tp + fp) === 0.",
    "precision",
    `function precision(tp, fp) {\n  // Return precision.\n}`,
    [
      { args: [8, 2], expected: 0.8 },
      { args: [0, 0], expected: 0 },
    ]
  ),
  makeChallenge(
    "neuralNetwork",
    "Deep learning and transformers",
    "Apply inverted dropout mask to layer activations. Write applyDropout(values, keepMask) returning an array of values where the corresponding keepMask entry is true.",
    "applyDropout",
    `function applyDropout(values, keepMask) {\n  // Return kept values.\n}`,
    [
      { args: [[1, 2, 3], [true, false, true]], expected: [1, 3] },
      { args: [[], []], expected: [] },
    ]
  ),
  makeChallenge(
    "mlMath",
    "Math, probability and optimization",
    "Perform one step of gradient descent. Write gradientStep(weight, gradient, learningRate) returning the updated weight (weight - gradient * learningRate), rounded to four decimal places if needed.",
    "gradientStep",
    `function gradientStep(weight, gradient, learningRate) {\n  // Return updated weight.\n}`,
    [
      { args: [10, 2, 0.1], expected: 9.8 },
      { args: [1, -4, 0.25], expected: 2 },
    ]
  ),
  makeChallenge(
    "mlops",
    "MLOps, LLMs and deployment",
    "Automate ML monitoring response. Write deploymentAction(driftDetected) returning 'retrain' if driftDetected is true, otherwise 'monitor'.",
    "deploymentAction",
    `function deploymentAction(driftDetected) {\n  // Return "retrain" or "monitor".\n}`,
    [
      { args: [true], expected: "retrain" },
      { args: [false], expected: "monitor" },
    ]
  ),
];

function getChallengesForRole(role) {
  const roleChallenges = {
    "Backend Developer": BACKEND_CHALLENGES,
    "MERN Stack Developer": MERN_CHALLENGES,
    "Data Analyst": DATA_ANALYST_CHALLENGES,
    "Machine Learning Engineer": ML_CHALLENGES,
  };
  return roleChallenges[role] || FRONTEND_CHALLENGES;
}

/* ---------------- Code Execution ---------------- */

const workerScript = `
self.onmessage = ({ data }) => {
  try {
    const cleanCode = data.code
      .replace(/export\\s+default\\s+/g, "")
      .replace(/export\\s+/g, "")
      .replace(/module\\.exports\\s*=\\s*/g, "");

    const factory = new Function(
      '"use strict";\\n' +
      cleanCode +
      '\\n;return typeof ' + data.functionName +
      ' === "function" ? ' + data.functionName + ' : null;'
    );

    const candidate = factory();
    if (typeof candidate !== "function") {
      throw new Error("Define a function named " + data.functionName + ".");
    }

    const checks = data.tests.map(({ args, expected }) => {
      try {
        const testArgs = JSON.parse(JSON.stringify(args));
        const actual = candidate(...testArgs);
        const passed = typeof actual === "number" && typeof expected === "number"
          ? Math.abs(actual - expected) < 1e-6
          : JSON.stringify(actual) === JSON.stringify(expected);
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

function runDirectly(challenge, code) {
  try {
    const cleanCode = code
      .replace(/export\s+default\s+/g, "")
      .replace(/export\s+/g, "")
      .replace(/module\.exports\s*=\s*/g, "");

    const factory = new Function(
      '"use strict";\n' +
      cleanCode +
      '\n;return typeof ' + challenge.functionName +
      ' === "function" ? ' + challenge.functionName + ' : null;'
    );

    const candidate = factory();
    if (typeof candidate !== "function") {
      return { error: `Define a function named ${challenge.functionName}.` };
    }

    const checks = challenge.tests.map(({ args, expected }) => {
      try {
        const testArgs = JSON.parse(JSON.stringify(args));
        const actual = candidate(...testArgs);
        const passed = typeof actual === "number" && typeof expected === "number"
          ? Math.abs(actual - expected) < 1e-6
          : JSON.stringify(actual) === JSON.stringify(expected);
        return { passed, expected, actual, error: null };
      } catch (err) {
        return {
          passed: false,
          expected,
          actual: undefined,
          error: err instanceof Error ? err.message : "Test execution failed."
        };
      }
    });

    return { checks, passed: checks.every((c) => c.passed) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Unable to execute your solution." };
  }
}

function runInWorker(challenge, code) {
  return new Promise((resolve) => {
    if (typeof Worker === "undefined") {
      resolve(runDirectly(challenge, code));
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
      if (worker) worker.terminate();
      if (url) URL.revokeObjectURL(url);
      resolve(result);
    };

    try {
      url = URL.createObjectURL(
        new Blob([workerScript], { type: "text/javascript" })
      );
      worker = new Worker(url);
    } catch {
      // Fallback to direct synchronous execution if Web Worker creation is disallowed
      resolve(runDirectly(challenge, code));
      return;
    }

    timer = setTimeout(() => {
      finish({
        error: "Execution timed out. Check your code for an infinite loop.",
      });
    }, 2000);

    worker.onmessage = ({ data }) => finish(data);
    worker.onerror = (err) => {
      finish({
        error: err?.message || "An execution error occurred.",
      });
    };

    try {
      worker.postMessage({
        code,
        functionName: challenge.functionName,
        tests: challenge.tests,
      });
    } catch {
      finish(runDirectly(challenge, code));
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
  return PROGRAMMING_LANGUAGES.some((item) => item.value === saved)
    ? saved
    : "javascript";
}

function readSavedSubmissions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
      return {};
    }
    const valid = {};
    Object.keys(saved).forEach((id) => {
      const entry = saved[id];
      if (entry && typeof entry.code === "string") {
        valid[id] = {
          code: entry.code,
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
    if (Number.isFinite(saved) && saved > Date.now()) {
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
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
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

function getAssessedSkillRatings(submissions, role) {
  const passed = (id) => submissions[id]?.passed === true;
  const roleChallenges = getChallengesForRole(role);
  const passedCount = roleChallenges.filter(({ id }) => passed(id)).length;
  const scoreOutOf5 = Math.round((passedCount / roleChallenges.length) * 5);

  if (role === "Frontend Developer") {
    return {
      HTML: passed("modalFocus") ? 4 : 1,
      CSS: passed("modalFocus") ? 4 : 1,
      JavaScript: passed("memoizedSearch") || passed("todoReducer") ? 4 : 1,
      React: passed("fetchState") || passed("lazyRoutes") ? 4 : 1,
      "REST API": passed("fetchState") ? 4 : 1,
      Git: 3,
    };
  }

  if (role === "Backend Developer") {
    return {
      "Node.js": passed("retryPolicy") || passed("rateLimiter") ? 4 : 1,
      "Express.js": passed("httpAuth") ? 4 : 1,
      MongoDB: passed("queryIndex") ? 4 : 1,
      "REST API": passed("httpAuth") ? 4 : 1,
      JavaScript: scoreOutOf5,
      Git: 3,
    };
  }

  if (role === "MERN Stack Developer") {
    return {
      MongoDB: passed("mongoSchema") ? 4 : 1,
      "Express.js": passed("expressMiddleware") ? 4 : 1,
      React: passed("reactApi") ? 4 : 1,
      "Node.js": passed("nodeEventLoop") ? 4 : 1,
      "REST API": passed("reactApi") ? 4 : 1,
      JavaScript: scoreOutOf5,
      HTML: 4,
      CSS: 3,
      Git: 3,
    };
  }

  if (role === "Data Analyst") {
    return {
      SQL: passed("sqlAggregation") ? 4 : 1,
      Excel: passed("excelLookup") ? 4 : 1,
      Statistics: passed("statistics") ? 4 : 1,
      "Data Cleaning": passed("pandasCleaning") ? 4 : 1,
      "KPIs & Analytics": passed("kpiInsight") ? 4 : 1,
      Python: scoreOutOf5,
    };
  }

  if (role === "Machine Learning Engineer") {
    return {
      "ML Fundamentals": passed("mlFundamentals") ? 4 : 1,
      "Model Evaluation": passed("modelMetrics") ? 4 : 1,
      "Deep Learning": passed("neuralNetwork") ? 4 : 1,
      "ML Mathematics": passed("mlMath") ? 4 : 1,
      MLOps: passed("mlops") ? 4 : 1,
      Python: scoreOutOf5,
    };
  }

  return {
    JavaScript: scoreOutOf5,
    React: scoreOutOf5,
    HTML: passed("modalFocus") ? 4 : 1,
    "REST API": passed("fetchState") ? 4 : 1,
  };
}

/* ---------------- Main component ---------------- */

export default function TechnicalAssessment() {
  const navigate = useNavigate();
  const [targetRole] = useState(getSelectedRole);
  const focusTopics = ROLE_FOCUS[targetRole] || ROLE_FOCUS["Frontend Developer"];
  const activeChallenges = useMemo(() => getChallengesForRole(targetRole), [targetRole]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [submissions, setSubmissions] = useState(readSavedSubmissions);
  const [language, setLanguage] = useState(getSavedLanguage);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [modal, setModal] = useState(null);
  const [deadline] = useState(getDeadline);
  const [remaining, setRemaining] = useState(() => secondsLeft(deadline));
  const [completed, setCompleted] = useState(false);
  const [tabWarning, setTabWarning] = useState(false);
  const timeUpHandled = useRef(false);

  const challenge = activeChallenges[activeIndex] || activeChallenges[0];

  const selectedLanguage =
    PROGRAMMING_LANGUAGES.find((item) => item.value === language) ||
    PROGRAMMING_LANGUAGES[0];

  const code =
    submissions[challenge.id]?.code ?? challenge.starterCode;

  const passedCount = useMemo(
    () =>
      activeChallenges.filter(
        ({ id }) => submissions[id]?.passed === true
      ).length,
    [activeChallenges, submissions]
  );

  const assessedSkillRatings = useMemo(
    () => getAssessedSkillRatings(submissions, targetRole),
    [submissions, targetRole]
  );

  const completionPercentage = Math.round(
    (passedCount / activeChallenges.length) * 100
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // Ignore storage errors
    }
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // Ignore storage errors
    }
  }, [language]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden && !locked) setTabWarning(true);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [locked]);

  /* ---------------- Save assessment result ---------------- */

  const saveResult = useCallback(
    (timedOut) => {
      const secondsUsed = Math.max(
        0,
        Math.min(TOTAL_SECONDS, TOTAL_SECONDS - secondsLeft(deadline))
      );

      try {
        const payload = {
          passed: passedCount,
          total: activeChallenges.length,
          timedOut,
          secondsUsed,
          completedAt: new Date().toISOString(),
          language,
          targetRole,
          focusTopics,
          skillRatings: assessedSkillRatings,
          challenges: activeChallenges.map((item) => ({
            id: item.id,
            passed: submissions[item.id]?.passed === true,
          })),
        };

        localStorage.setItem(RESULT_KEY, JSON.stringify(payload));
        localStorage.setItem(
          "technicalSkillRatings",
          JSON.stringify(assessedSkillRatings)
        );
        localStorage.removeItem(TIMER_KEY);
        setCompleted(true);
        return true;
      } catch {
        return false;
      }
    },
    [
      passedCount,
      deadline,
      language,
      submissions,
      targetRole,
      focusTopics,
      assessedSkillRatings,
      activeChallenges,
    ]
  );

  /* ---------------- Time-up handling ---------------- */

  useEffect(() => {
    if (remaining !== 0 || timeUpHandled.current || completed) {
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

  const runTests = async (submitForScore = false) => {
    if (isRunning || locked) return;

    if (!selectedLanguage.executable) {
      setResult({
        type: "error",
        message:
          `${selectedLanguage.label} in-browser execution is not configured. ` +
          "Select JavaScript to run and submit tests directly in your browser.",
        checks: [],
      });
      return;
    }

    setIsRunning(true);
    setResult(null);

    try {
      const evaluation = await runInWorker(challenge, code);

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

      if (submitForScore) {
        setSubmissions((previous) => ({
          ...previous,
          [challenge.id]: {
            code,
            passed: evaluation.passed,
          },
        }));
      }

      setResult({
        type: evaluation.passed ? "success" : "error",
        message: evaluation.passed
          ? submitForScore
            ? "Submitted successfully! All test cases passed and your score is updated."
            : "All tests passed! Click 'Submit solution' to count this challenge toward your official score."
          : "Some test cases failed. Review the results below and update your solution.",
        checks: evaluation.checks,
        submitted: submitForScore,
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
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runTests(true);
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
      index >= activeChallenges.length
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
          <h1>Technical & Coding Assessment</h1>
          <p>
            {targetRole} track · Solve practical coding exercises and verify key competency areas.
          </p>
        </div>
      </header>

      {/* Timer */}
      <section className={`time-bar ${timerState}`} aria-label="Time remaining">
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
              ? "Less than 30 seconds left! Finish up your answers."
              : "Less than 2 minutes left."}
          </p>
        )}
      </section>

      {/* Track Competencies */}
      <section className="assessment-scope" aria-label={`${targetRole} assessment topics`}>
        <div>
          <span className="scope-label">Your technical track</span>
          <h2>{targetRole}</h2>
          <p>
            These competencies shape your technical evaluation and personalized career roadmap.
          </p>
        </div>
        <ul>
          {focusTopics.map((topic) => (
            <li key={topic}>✓ {topic}</li>
          ))}
        </ul>
      </section>

      <p className="runner-notice" role="note">
        Practice runner: JavaScript executes test cases locally in your browser with immediate feedback.
      </p>

      {tabWarning && (
        <section className="integrity-notice" role="status">
          <span>You switched away from the assessment tab. Please stay focused on this tab.</span>
          <button type="button" onClick={() => setTabWarning(false)}>
            Dismiss
          </button>
        </section>
      )}

      {/* Challenge progress */}
      <section className="technical-progress" aria-label="Assessment progress">
        <div className="progress-info">
          <span>
            Challenge {activeIndex + 1} of {activeChallenges.length}
          </span>
          <span>
            {passedCount} / {activeChallenges.length} passed · {completionPercentage}%
          </span>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={activeChallenges.length}
          aria-valuenow={passedCount}
          aria-label="Challenges passed"
        >
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </section>

      {/* Challenge Navigator */}
      <nav className="challenge-navigator" aria-label="Challenge list">
        {activeChallenges.map((item, index) => {
          const status = submissions[item.id]?.passed
            ? "passed"
            : submissions[item.id]?.code
              ? "draft"
              : "unanswered";
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => goToChallenge(index)}
              aria-current={index === activeIndex ? "step" : undefined}
              className={`challenge-jump ${status} ${
                index === activeIndex ? "active" : ""
              }`}
              disabled={isRunning || locked}
            >
              {index + 1}
              <span className="sr-only">: {item.title}, {status}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Question Card */}
      <main className="question-container">
        <section className="question-card">
          <div className="question-number">
            Live coding challenge {activeIndex + 1} of {activeChallenges.length}
          </div>

          <span className="question-topic">
            Technical Assessment · Drafts save automatically
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
              {challenge.tests.map(({ args, expected }, index) => (
                <li key={`${challenge.id}-${index}`}>
                  <code>
                    {challenge.functionName}({args.map(displayValue).join(", ")})
                  </code>
                  {" → "}
                  <code>{displayValue(expected)}</code>
                </li>
              ))}
            </ul>
          </div>

          {/* Language selector */}
          <div className="language-selector">
            <label htmlFor="programming-language">
              <strong>Language:</strong>
            </label>
            <select
              id="programming-language"
              aria-label="Programming language"
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
              disabled={isRunning || locked}
            >
              {PROGRAMMING_LANGUAGES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                  {item.executable ? " — Ready to run" : " — Runner required"}
                </option>
              ))}
            </select>
          </div>

          {/* Code editor */}
          <label htmlFor="technical-code">
            <strong>Your {selectedLanguage.label} solution:</strong>
          </label>
          <textarea
            id="technical-code"
            className="technical-editor"
            value={code}
            onChange={(event) => updateCode(event.target.value)}
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
              className="run-btn"
              onClick={() => runTests(false)}
              disabled={isRunning || locked}
              title="Run tests to check your code"
            >
              {isRunning ? "Running..." : "▶ Run tests"}
            </button>

            <button
              type="button"
              className="submit-btn"
              onClick={() => runTests(true)}
              disabled={isRunning || locked}
              title="Submit code and count toward your score"
            >
              ✓ Submit solution
            </button>

            <button
              type="button"
              className="previous-btn"
              onClick={resetCode}
              disabled={isRunning || locked}
            >
              ↺ Reset code
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
                {result.type === "success" ? "✓ All tests passed!" : "✗ Test results"}
              </h3>
              <p>{result.message}</p>

              {result.checks.length > 0 && (
                <>
                  <p className="test-score-summary">
                    Score:{" "}
                    <strong>
                      {result.checks.filter((item) => item.passed).length} / {result.checks.length}
                    </strong>{" "}
                    tests passed
                  </p>
                  <div className="test-case-list">
                    {result.checks.map((check, index) => (
                      <article
                        className={`test-case ${check.passed ? "passed-case" : "failed-case"}`}
                        key={`${challenge.id}-result-${index}`}
                      >
                        <strong>
                          {check.passed ? "✓ Passed" : "✗ Failed"} — Test {index + 1}
                        </strong>
                        <p>
                          Expected: <code>{displayValue(check.expected)}</code>
                        </p>
                        <p>
                          Actual: <code>{displayValue(check.actual)}</code>
                        </p>
                        {check.error && (
                          <p className="test-error">Error: {check.error}</p>
                        )}
                      </article>
                    ))}
                  </div>
                </>
              )}

              {result.submitted && (
                <p className="solution-guidance">
                  <strong>Solution guidance:</strong> Make sure your solution satisfies all input contracts, handles boundary conditions, avoids input mutation, and keeps algorithmic complexity low.
                </p>
              )}
            </section>
          )}
        </section>

        {/* Navigation */}
        <nav className="question-navigation" aria-label="Challenge navigation">
          <button
            type="button"
            className="previous-btn"
            onClick={() => goToChallenge(activeIndex - 1)}
            disabled={activeIndex === 0 || isRunning || locked}
          >
            ← Previous
          </button>

          <span className="question-counter">
            {activeIndex + 1} / {activeChallenges.length}
          </span>

          {activeIndex === activeChallenges.length - 1 ? (
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
                <h2 id="modal-title">⏰ Time&apos;s up!</h2>
                <p>
                  Your results were saved: {passedCount} of{" "}
                  {activeChallenges.length} challenges passed.
                  Moving to the Logical Reasoning section...
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
