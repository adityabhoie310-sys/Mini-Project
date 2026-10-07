import React, { useState } from "react";
import Navbar from "../components/Navbar";
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
      exampleOutput: '"olleh"',
      starterCode: `function reverseString(str) {
  // Write your code here

}`,
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

}`,
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

}`,
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

}`,
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

}`,
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

}`,
    },
  ];

  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [code, setCode] = useState(problems[0].starterCode);
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setResult("");
  };

  const handleRun = () => {
    setResult(
      "Code submitted successfully. In the backend version, your code will be executed and evaluated against test cases."
    );
  };

  const handleReset = () => {
    setCode(selectedProblem.starterCode);
    setResult("");
  };

  return (
    <div className="coding-page">
      <Navbar />

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

            {/* Result */}
            {result && (
              <div className="code-result">
                <strong>Submission Result</strong>
                <p>{result}</p>
              </div>
            )}

          </section>

        </div>

      </main>
    </div>
  );
}

export default CodingPractice;

