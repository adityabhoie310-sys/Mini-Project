
import React, { useState } from "react";
import "../styles/codingPractice.css";
import "../styles.css";

const problems = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Easy",
    skill: "JavaScript",
    description: "Write a function that returns a string in reverse order.",
    exampleInput: '"hello"',
    exampleOutput: '"olleh"',
    starterCode: `function reverseString(str) {
  // Write your solution here
  return str.split("").reverse().join("");
}`,
    testCases: [
      { input: ["hello"], expected: "olleh" },
      { input: ["react"], expected: "tcaer" },
    ],
  },
  {
    id: 2,
    title: "Find Maximum Number",
    difficulty: "Easy",
    skill: "Arrays",
    description: "Return the largest number from an array.",
    exampleInput: "[10, 5, 25, 8]",
    exampleOutput: "25",
    starterCode: `function findMaximum(numbers) {
  // Write your solution here
  return Math.max(...numbers);
}`,
    testCases: [
      { input: [[10, 5, 25, 8]], expected: 25 },
      { input: [[-1, -5, -3]], expected: -1 },
    ],
  },
  {
    id: 3,
    title: "Check Palindrome",
    difficulty: "Easy",
    skill: "Strings",
    description: "Return true if the given string is a palindrome.",
    exampleInput: '"madam"',
    exampleOutput: "true",
    starterCode: `function isPalindrome(str) {
  // Write your solution here
  return str === str.split("").reverse().join("");
}`,
    testCases: [
      { input: ["madam"], expected: true },
      { input: ["coding"], expected: false },
    ],
  },
  {
    id: 4,
    title: "Count Vowels",
    difficulty: "Easy",
    skill: "Strings",
    description: "Count the vowels in a string.",
    exampleInput: '"javascript"',
    exampleOutput: "3",
    starterCode: `function countVowels(str) {
  // Write your solution here
  return (str.match(/[aeiou]/gi) || []).length;
}`,
    testCases: [
      { input: ["javascript"], expected: 3 },
      { input: ["sky"], expected: 0 },
    ],
  },
  {
    id: 5,
    title: "Remove Duplicates",
    difficulty: "Medium",
    skill: "Arrays",
    description: "Remove duplicate values without changing their order.",
    exampleInput: "[1, 2, 2, 3, 1]",
    exampleOutput: "[1, 2, 3]",
    starterCode: `function removeDuplicates(arr) {
  // Write your solution here
  return [...new Set(arr)];
}`,
    testCases: [
      { input: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
      { input: [[4, 4, 4]], expected: [4] },
    ],
  },
  {
    id: 6,
    title: "Two Sum",
    difficulty: "Medium",
    skill: "Arrays",
    description: "Return the indices of two numbers whose sum equals the target.",
    exampleInput: "[2, 7, 11, 15], target = 9",
    exampleOutput: "[0, 1]",
    starterCode: `function twoSum(numbers, target) {
  // Write your solution here
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
    ],
  },
];

const practiceSets = {
  reasoning: [
    {
      question: "Find the next number: 2, 4, 8, 16, ?",
      options: ["18", "24", "32", "36"],
      answer: "32",
      explanation: "Each number is multiplied by 2.",
    },
    {
      question: "Find the next number: 3, 6, 9, 12, ?",
      options: ["13", "14", "15", "18"],
      answer: "15",
      explanation: "Each number increases by 3.",
    },
    {
      question: "If all roses are flowers, which statement must be true?",
      options: [
        "All flowers are roses",
        "All roses are flowers",
        "All flowers are red",
        "No roses are flowers",
      ],
      answer: "All roses are flowers",
      explanation: "This statement directly follows from the condition.",
    },
    {
      question: "Which item does not belong?",
      options: ["Apple", "Mango", "Banana", "Carrot"],
      answer: "Carrot",
      explanation: "Carrot is a vegetable; the others are fruits.",
    },
    {
      question: "A is taller than B. B is taller than C. Who is shortest?",
      options: ["A", "B", "C", "Cannot determine"],
      answer: "C",
      explanation: "The order is A, then B, then C.",
    },
  ],
  aptitude: [
    {
      question: "What is 20% of 250?",
      options: ["25", "40", "50", "60"],
      answer: "50",
      explanation: "20 / 100 × 250 = 50.",
    },
    {
      question: "A product costs ₹800. What is its price after a 10% discount?",
      options: ["₹700", "₹720", "₹750", "₹780"],
      answer: "₹720",
      explanation: "10% of ₹800 is ₹80; ₹800 − ₹80 = ₹720.",
    },
    {
      question: "What is the average of 10, 20, and 30?",
      options: ["15", "20", "25", "30"],
      answer: "20",
      explanation: "(10 + 20 + 30) / 3 = 20.",
    },
    {
      question: "If 5 pens cost ₹50, what do 8 pens cost at the same rate?",
      options: ["₹60", "₹70", "₹80", "₹100"],
      answer: "₹80",
      explanation: "One pen costs ₹10, so 8 pens cost ₹80.",
    },
    {
      question: "A person travels 120 km in 3 hours. What is the average speed?",
      options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
      answer: "40 km/h",
      explanation: "Speed = distance / time = 120 / 3 = 40 km/h.",
    },
  ],
};

const tabs = [
  { id: "coding", label: "Coding & Technical", icon: "💻" },
  { id: "reasoning", label: "Logical Reasoning", icon: "🧠" },
  { id: "aptitude", label: "Aptitude", icon: "📐" },
];

function CodingPractice() {
  const [activeTab, setActiveTab] = useState("coding");
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [code, setCode] = useState(problems[0].starterCode);
  const [testResults, setTestResults] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checkedSets, setCheckedSets] = useState({});
  const [language, setLanguage] = useState("javascript");

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setTestResults(null);
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setTestResults(null);
  };

  const handleRun = () => {
    if (language !== "javascript") {
      setTestResults([
        {
          id: 1,
          passed: false,
          actual:
            "This browser runner supports JavaScript only. Use a sandboxed backend runner for Python, Java, and C++.",
        },
      ]);
      return;
    }

    try {
      const match = selectedProblem.starterCode.match(
        /function\s+([a-zA-Z_$][\w$]*)\s*\(/
      );

      if (!match) {
        throw new Error("Could not identify the function name.");
      }

      const functionName = match[1];

      // This is a basic practice runner, NOT a secure sandbox.
      // Do not use it to execute untrusted code in production.
      // eslint-disable-next-line no-new-func
      const runner = new Function(
        `${code}\nreturn typeof ${functionName} === "function" ? ${functionName} : null;`
      )();

      if (typeof runner !== "function") {
        throw new Error(`Please define the function ${functionName}().`);
      }

      const results = selectedProblem.testCases.map((testCase, index) => {
        try {
          const actual = runner(...testCase.input);
          const passed =
            JSON.stringify(actual) === JSON.stringify(testCase.expected);

          return {
            id: index + 1,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.expected),
            actual: JSON.stringify(actual) ?? "undefined",
            passed,
          };
        } catch (error) {
          return {
            id: index + 1,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.expected),
            actual: `Error: ${error.message}`,
            passed: false,
          };
        }
      });

      setTestResults(results);
    } catch (error) {
      setTestResults([
        {
          id: 1,
          passed: false,
          actual: `Execution error: ${error.message}`,
        },
      ]);
    }
  };

  const handleReset = () => {
    setCode(selectedProblem.starterCode);
    setTestResults(null);
  };

  const handleAnswer = (tabId, questionIndex, option) => {
    const key = `${tabId}-${questionIndex}`;

    setAnswers((previous) => ({
      ...previous,
      [key]: option,
    }));
  };

  const checkAnswers = (tabId) => {
    setCheckedSets((previous) => ({
      ...previous,
      [tabId]: true,
    }));
  };

  const resetAnswers = (tabId) => {
    setAnswers((previous) => {
      const updated = { ...previous };

      practiceSets[tabId].forEach((_, index) => {
        delete updated[`${tabId}-${index}`];
      });

      return updated;
    });

    setCheckedSets((previous) => ({
      ...previous,
      [tabId]: false,
    }));
  };

  const currentQuestions = practiceSets[activeTab];
  const isQuizTab = activeTab === "reasoning" || activeTab === "aptitude";

  const quizScore = isQuizTab
    ? currentQuestions.filter(
        (item, index) =>
          answers[`${activeTab}-${index}`] === item.answer
      ).length
    : 0;

  const answeredCount = isQuizTab
    ? currentQuestions.filter(
        (_, index) => answers[`${activeTab}-${index}`] !== undefined
      ).length
    : 0;

  return (
    <div className="coding-page">
      <main className="coding-container">
        <header className="coding-header">
          <div>
            <span className="section-tag">LEARN · PRACTICE · IMPROVE</span>
            <h1>Practice Center</h1>
            <p>
              Practice coding, logical reasoning, and aptitude in one place.
            </p>
          </div>

          <div className="coding-progress">
            <span>Available Coding Problems</span>
            <strong>{problems.length}</strong>
          </div>
        </header>

        <nav className="practice-tabs" aria-label="Practice categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? "active" : ""}
              aria-pressed={activeTab === tab.id}
              onClick={() => selectTab(tab.id)}
            >
              <span aria-hidden="true">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "coding" && (
          <section className="coding-layout">
            <aside className="problem-sidebar">
              <div className="sidebar-title">
                <h2>Problems</h2>
                <span>{problems.length}</span>
              </div>

              <div className="problem-list">
                {problems.map((problem) => (
                  <button
                    type="button"
                    key={problem.id}
                    className={`problem-item ${
                      selectedProblem.id === problem.id ? "selected" : ""
                    }`}
                    onClick={() => selectProblem(problem)}
                  >
                    <span className="problem-number">{problem.id}</span>

                    <span className="problem-info">
                      <strong>{problem.title}</strong>
                      <span>{problem.skill}</span>
                    </span>

                    <small className={problem.difficulty.toLowerCase()}>
                      {problem.difficulty}
                    </small>
                  </button>
                ))}
              </div>
            </aside>

            <section className="problem-content">
              <div className="problem-heading">
                <span
                  className={`difficulty-badge ${selectedProblem.difficulty.toLowerCase()}`}
                >
                  {selectedProblem.difficulty}
                </span>

                <h2>{selectedProblem.title}</h2>
                <span className="skill-label">
                  Skill: {selectedProblem.skill}
                </span>
              </div>

              <div className="problem-description">
                <h3>Problem</h3>
                <p>{selectedProblem.description}</p>

                <h3>Example</h3>
                <div className="example-box">
                  <div>
                    <span>Input</span>
                    <code>{selectedProblem.exampleInput}</code>
                  </div>

                  <div>
                    <span>Output</span>
                    <code>{selectedProblem.exampleOutput}</code>
                  </div>
                </div>
              </div>

              <div className="editor-wrapper">
                <div className="editor-header">
                  <label className="language-selector">
                    <span>Language:</span>
                    <select
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python (backend runner needed)</option>
                      <option value="java">Java (backend runner needed)</option>
                      <option value="cpp">C++ (backend runner needed)</option>
                    </select>
                  </label>

                  <button
                    type="button"
                    className="reset-button"
                    onClick={handleReset}
                  >
                    Reset Code
                  </button>
                </div>

                <textarea
                  className="code-editor"
                  aria-label="Code editor"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setTestResults(null);
                  }}
                  spellCheck="false"
                  autoCapitalize="off"
                  autoComplete="off"
                />

                <div className="editor-footer">
                  <span>{code.length} characters</span>

                  <button
                    type="button"
                    className="run-button"
                    onClick={handleRun}
                  >
                    ▶ Run Tests
                  </button>
                </div>
              </div>

              {testResults && (
                <section className="code-result" aria-live="polite">
                  <div className="result-heading">
                    <strong>Test Results</strong>
                    <span>
                      {testResults.filter((result) => result.passed).length} /{" "}
                      {testResults.length} Passed
                    </span>
                  </div>

                  {testResults.map((result) => (
                    <article
                      key={result.id}
                      className={`test-result ${
                        result.passed ? "passed" : "failed"
                      }`}
                    >
                      <div className="test-result-title">
                        <strong>Test Case #{result.id}</strong>
                        <span>
                          {result.passed ? "✓ PASSED" : "✗ FAILED"}
                        </span>
                      </div>

                      {result.input !== undefined && (
                        <p>
                          Input: <code>{result.input}</code>
                        </p>
                      )}

                      {result.expected !== undefined && (
                        <p>
                          Expected: <code>{result.expected}</code>
                        </p>
                      )}

                      <p>
                        Actual: <code>{result.actual}</code>
                      </p>
                    </article>
                  ))}
                </section>
              )}
            </section>
          </section>
        )}

        {isQuizTab && (
          <section className="practice-question-list">
            <div className="quiz-header">
              <div>
                <span className="section-tag">
                  {activeTab === "reasoning"
                    ? "LOGICAL REASONING"
                    : "QUANTITATIVE APTITUDE"}
                </span>
                <h2>
                  {activeTab === "reasoning"
                    ? "Logical Reasoning Practice"
                    : "Aptitude Practice"}
                </h2>
                <p>
                  Select one answer for each question, then check your score.
                </p>
              </div>

              <div className="quiz-progress">
                {answeredCount} / {currentQuestions.length} answered
              </div>
            </div>

            {currentQuestions.map((item, index) => {
              const key = `${activeTab}-${index}`;
              const selectedAnswer = answers[key];
              const checked = Boolean(checkedSets[activeTab]);

              return (
                <article className="practice-question" key={item.question}>
                  <h3>
                    {index + 1}. {item.question}
                  </h3>

                  <div className="practice-options">
                    {item.options.map((option) => {
                      const isCorrect = checked && option === item.answer;
                      const isWrong =
                        checked &&
                        selectedAnswer === option &&
                        option !== item.answer;

                      return (
                        <label
                          key={option}
                          className={[
                            "practice-option",
                            isCorrect ? "correct-option" : "",
                            isWrong ? "wrong-option" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <input
                            type="radio"
                            name={key}
                            value={option}
                            checked={selectedAnswer === option}
                            disabled={checked}
                            onChange={() =>
                              handleAnswer(activeTab, index, option)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {checked && (
                    <p className="answer-explanation">
                      <strong>
                        {selectedAnswer === item.answer
                          ? "Correct!"
                          : `Correct answer: ${item.answer}`}
                      </strong>{" "}
                      {item.explanation}
                    </p>
                  )}
                </article>
              );
            })}

            <div className="quiz-actions">
              {!checkedSets[activeTab] ? (
                <button
                  type="button"
                  className="run-button"
                  onClick={() => checkAnswers(activeTab)}
                  disabled={answeredCount !== currentQuestions.length}
                >
                  Check Answers
                </button>
              ) : (
                <>
                  <p className="quiz-score">
                    Your score: {quizScore} / {currentQuestions.length}
                  </p>
                  <button
                    type="button"
                    className="reset-button"
                    onClick={() => resetAnswers(activeTab)}
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default CodingPractice;

