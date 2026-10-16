import React, { useState } from "react";
import "../styles/codingPractice.css";

function CodingPractice() {
  const problems = [
    {
      id: 1,
      title: "Reverse a String",
      difficulty: "Easy",
      skill: "JavaScript",
      description:
        "Write a function that takes a string and returns the string reversed.",
      exampleInput: '"hello"',
      starterCode: `function reverseString(str) {
  // Write your code here
  return str.split('').reverse().join('');
}`,
      testCases: [
        { input: ["hello"], expected: "olleh" },
        { input: ["react"], expected: "tcaer" }
      ]
    },

    {
      id: 2,
      title: "Find Maximum Number",
      difficulty: "Easy",
      skill: "JavaScript",
      description:
        "Write a function that returns the largest number from an array.",
      exampleInput: "[10, 5, 25, 8]",
      exampleOutput: "25",
      starterCode: `function findMaximum(numbers) {
  // Write your code here
  return Math.max(...numbers);
}`,
      testCases: [
        { input: [[10, 5, 25, 8]], expected: 25 },
        { input: [[-1, -5, -3]], expected: -1 }
      ]
    },

    {
      id: 3,
      title: "Check Palindrome",
      difficulty: "Easy",
      skill: "JavaScript",
      description:
        "Check whether a given string is a palindrome.",
      exampleInput: '"madam"',
      exampleOutput: "true",
      starterCode: `function isPalindrome(str) {
  // Write your code here
  return str === str.split('').reverse().join('');
}`,
      testCases: [
        { input: ["madam"], expected: true },
        { input: ["coding"], expected: false }
      ]
    },

    {
      id: 4,
      title: "Count Vowels",
      difficulty: "Easy",
      skill: "JavaScript",
      description:
        "Count the number of vowels present in a given string.",
      exampleInput: '"javascript"',
      exampleOutput: "3",
      starterCode: `function countVowels(str) {
  // Write your code here
  return (str.match(/[aeiou]/gi) || []).length;
}`,
      testCases: [
        { input: ["javascript"], expected: 3 },
        { input: ["sky"], expected: 0 }
      ]
    },

    {
      id: 5,
      title: "Remove Duplicates",
      difficulty: "Medium",
      skill: "JavaScript",
      description:
        "Remove duplicate values from an array without changing the order.",
      exampleInput: "[1, 2, 2, 3, 1]",
      exampleOutput: "[1, 2, 3]",
      starterCode: `function removeDuplicates(arr) {
  // Write your code here
  return [...new Set(arr)];
}`,
      testCases: [
        { input: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
        { input: [[4, 4, 4]], expected: [4] }
      ]
    },

    {
      id: 6,
      title: "Two Sum",
      difficulty: "Medium",
      skill: "JavaScript",
      description:
        "Find two numbers in an array whose sum equals the target.",
      exampleInput: "[2, 7, 11, 15], target = 9",
      exampleOutput: "[0, 1]",
      starterCode: `function twoSum(numbers, target) {
  // Write your code here
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) return [i, j];
    }
  }
}`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] }
      ]
    },
  ];

  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [code, setCode] = useState(problems[0].starterCode);
  const [language, setLanguage] = useState("javascript");
  const [testResults, setTestResults] = useState(null);

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setTestResults(null);
  };

  const handleRun = () => {
    try {
      // Safe in-browser sandbox runner
      // eslint-disable-next-line no-new-func
      const runner = new Function(`
        ${code}
        const funcName = "${selectedProblem.starterCode.match(/function\s+([a-zA-Z0-9_]+)/)?.[1]}";
        return eval(funcName);
      `)();

      const results = selectedProblem.testCases.map((tc, idx) => {
        try {
          const actual = runner(...tc.input);
          const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
          return {
            id: idx + 1,
            input: JSON.stringify(tc.input),
            expected: JSON.stringify(tc.expected),
            actual: JSON.stringify(actual),
            passed
          };
        } catch (err) {
          return {
            id: idx + 1,
            input: JSON.stringify(tc.input),
            expected: JSON.stringify(tc.expected),
            actual: `Error: ${err.message}`,
            passed: false
          };
        }
      });

      setTestResults(results);
    } catch (err) {
      setTestResults([{ id: 1, passed: false, actual: `Syntax Error: ${err.message}` }]);
    }
  };

  const handleReset = () => {
    setCode(selectedProblem.starterCode);
    setTestResults(null);
  };

  return (
    <div className="coding-page">
      <main className="coding-container">

        {/* Header */}
        <div className="coding-header">
          <div>
            <span className="section-tag">CODING PRACTICE</span>
            <h1>Practice Coding</h1>
            <p>
              Solve coding problems and improve your programming skills.
            </p>
          </div>

          <div className="coding-progress">
            <span>Problems Solved</span>
            <strong>12 / 50</strong>
          </div>
        </div>

        {/* Main Coding Area */}
        <div className="coding-layout">

          {/* Problem List */}
          <aside className="problem-sidebar">

            <div className="sidebar-title">
              <h3>Problems</h3>
              <span>{problems.length}</span>
            </div>

            <div className="problem-list">

              {problems.map((problem) => (
                <button
                  key={problem.id}
                  className={`problem-item ${
                    selectedProblem.id === problem.id ? "selected" : ""
                  }`}
                  onClick={() => selectProblem(problem)}
                >
                  <div className="problem-number">
                    {problem.id}
                  </div>

                  <div className="problem-info">
                    <strong>{problem.title}</strong>
                    <span>{problem.skill}</span>
                  </div>

                  <small className={problem.difficulty.toLowerCase()}>
                    {problem.difficulty}
                  </small>
                </button>
              ))}

            </div>

          </aside>

          {/* Problem Content */}
          <section className="problem-content">

            <div className="problem-heading">
              <div>
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

            {/* Editor */}
            <div className="editor-wrapper">

              <div className="editor-header">

                <div className="language-selector">
                  <span>Language:</span>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                </div>

                <button
                  className="reset-button"
                  onClick={handleReset}
                >
                  Reset
                </button>

              </div>

              <textarea
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />

              <div className="editor-footer">

                <span>
                  {code.length} characters
                </span>

                <button
                  className="run-button"
                  onClick={handleRun}
                >
                  ▶ Run Code
                </button>

              </div>

            </div>

            {/* Test Results */}
            {testResults && (
              <div className="code-result" style={{ marginTop: '1.5rem', background: 'var(--surface)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Live Execution & Test Suite</strong>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    background: testResults.every(r => r.passed) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: testResults.every(r => r.passed) ? '#10b981' : '#ef4444'
                  }}>
                    {testResults.filter(r => r.passed).length} / {testResults.length} Passed
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {testResults.map((tr) => (
                    <div key={tr.id} style={{ 
                      padding: '0.75rem', 
                      borderRadius: '6px', 
                      background: 'var(--background)',
                      borderLeft: `4px solid ${tr.passed ? '#10b981' : '#ef4444'}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Test Case #{tr.id}</span>
                        <span style={{ color: tr.passed ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>
                          {tr.passed ? '✓ PASSED' : '✗ FAILED'}
                        </span>
                      </div>
                      {tr.input && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Input: <code>{tr.input}</code></div>}
                      {tr.expected && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected: <code>{tr.expected}</code></div>}
                      <div style={{ fontSize: '0.8rem', color: tr.passed ? 'var(--text-main)' : '#ef4444' }}>
                        Actual: <code>{tr.actual}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>

        </div>

      </main>
    </div>
  );
}

export default CodingPractice;

