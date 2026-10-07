import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/reasoningAssessment.css";

const questions = [
  {
    id: 1,
    question: "Find the next number: 2, 4, 8, 16, ?",
    options: ["24", "32", "36", "40"],
    answer: "32",
    topic: "Number Series",
  },
  {
    id: 2,
    question: "Find the next number: 3, 6, 12, 24, ?",
    options: ["36", "42", "48", "54"],
    answer: "48",
    topic: "Number Series",
  },
  {
    id: 3,
    question: "Find the next number: 5, 10, 15, 20, ?",
    options: ["22", "25", "30", "35"],
    answer: "25",
    topic: "Number Series",
  },
  {
    id: 4,
    question: "If CAT is coded as DBU, how is DOG coded?",
    options: ["EPH", "EOG", "DPH", "FQI"],
    answer: "EPH",
    topic: "Coding-Decoding",
  },
  {
    id: 5,
    question: "If APPLE is coded as BQQMF, how is MANGO coded?",
    options: ["NBOHP", "NBMHP", "OBOHP", "NBNGP"],
    answer: "NBOHP",
    topic: "Coding-Decoding",
  },
  {
    id: 6,
    question:
      "If SOUTH is coded as TPVUI, how is NORTH coded?",
    options: ["OPSUI", "OPSTI", "NPSUI", "OQSVI"],
    answer: "OPSUI",
    topic: "Coding-Decoding",
  },
  {
    id: 7,
    question:
      "Pointing to a boy, Ravi said, 'He is the son of my father's only son.' Who is the boy to Ravi?",
    options: ["Brother", "Son", "Nephew", "Cousin"],
    answer: "Son",
    topic: "Blood Relations",
  },
  {
    id: 8,
    question:
      "A is the brother of B. B is the sister of C. How is A related to C?",
    options: ["Brother", "Sister", "Father", "Uncle"],
    answer: "Brother",
    topic: "Blood Relations",
  },
  {
    id: 9,
    question:
      "P is the mother of Q. Q is the father of R. How is P related to R?",
    options: ["Mother", "Grandmother", "Aunt", "Sister"],
    answer: "Grandmother",
    topic: "Blood Relations",
  },
  {
    id: 10,
    question:
      "Statements: All cats are animals. All animals need food. Which conclusion is correct?",
    options: [
      "All cats need food",
      "All food is cats",
      "No cats need food",
      "Some animals are not cats",
    ],
    answer: "All cats need food",
    topic: "Syllogism",
  },
  {
    id: 11,
    question:
      "Statements: All books are papers. All papers are materials. What follows?",
    options: [
      "All books are materials",
      "All materials are books",
      "No books are materials",
      "Some papers are not materials",
    ],
    answer: "All books are materials",
    topic: "Syllogism",
  },
  {
    id: 12,
    question:
      "Statements: Some students are athletes. All athletes are fit. Which conclusion follows?",
    options: [
      "Some students are fit",
      "All students are fit",
      "No students are fit",
      "All fit people are students",
    ],
    answer: "Some students are fit",
    topic: "Syllogism",
  },
  {
    id: 13,
    question:
      "Statements: All roses are flowers. No flowers are stones. Which conclusion is correct?",
    options: [
      "No roses are stones",
      "All stones are roses",
      "Some roses are stones",
      "All flowers are roses",
    ],
    answer: "No roses are stones",
    topic: "Syllogism",
  },
  {
    id: 14,
    question:
      "A person walks 5 km north, then 3 km east. In which direction is he from the starting point?",
    options: ["North-East", "North-West", "South-East", "South-West"],
    answer: "North-East",
    topic: "Logical Puzzles",
  },
  {
    id: 15,
    question:
      "A man faces north. He turns right, then right again. Which direction is he facing?",
    options: ["North", "South", "East", "West"],
    answer: "South",
    topic: "Logical Puzzles",
  },
  {
    id: 16,
    question:
      "A is taller than B. B is taller than C. Who is the shortest?",
    options: ["A", "B", "C", "Cannot determine"],
    answer: "C",
    topic: "Logical Puzzles",
  },
  {
    id: 17,
    question:
      "Five people are standing in a line. Rahul is taller than Amit but shorter than Sameer. Who is taller than Rahul?",
    options: ["Amit", "Sameer", "Rahul", "Cannot determine"],
    answer: "Sameer",
    topic: "Logical Puzzles",
  },
  {
    id: 18,
    question:
      "Find the odd one out.",
    options: ["Apple", "Mango", "Banana", "Carrot"],
    answer: "Carrot",
    topic: "Pattern Recognition",
  },
  {
    id: 19,
    question:
      "Find the odd one out.",
    options: ["Square", "Triangle", "Circle", "Cube"],
    answer: "Cube",
    topic: "Pattern Recognition",
  },
  {
    id: 20,
    question:
      "Find the odd one out.",
    options: ["2", "4", "8", "15"],
    answer: "15",
    topic: "Pattern Recognition",
  },
  {
    id: 21,
    question:
      "Complete the pattern: AZ, BY, CX, DW, ?",
    options: ["EV", "FU", "EW", "DV"],
    answer: "EV",
    topic: "Pattern Recognition",
  },
  {
    id: 22,
    question:
      "Complete the pattern: AB, CD, EF, GH, ?",
    options: ["HI", "IJ", "JK", "KL"],
    answer: "IJ",
    topic: "Pattern Recognition",
  },
  {
    id: 23,
    question:
      "If all laptops are computers and some computers are expensive, which statement is definitely true?",
    options: [
      "All laptops are computers",
      "All computers are laptops",
      "All laptops are expensive",
      "No laptops are expensive",
    ],
    answer: "All laptops are computers",
    topic: "Logical Reasoning",
  },
  {
    id: 24,
    question:
      "A clock shows 3:00. What is the angle between the hour and minute hands?",
    options: ["45°", "60°", "90°", "120°"],
    answer: "90°",
    topic: "Logical Reasoning",
  },
  {
    id: 25,
    question:
      "If today is Monday, what day will it be after 10 days?",
    options: ["Wednesday", "Thursday", "Friday", "Saturday"],
    answer: "Thursday",
    topic: "Logical Reasoning",
  },
];

function ReasoningAssessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (timeLeft <= 0) {
      finishAssessment();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  const selectAnswer = (option) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: option,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const finishAssessment = () => {
    localStorage.setItem(
      "reasoningAssessmentAnswers",
      JSON.stringify(answers)
    );

    navigate("/assessment/aptitude");
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="reasoning-page">

      {/* Header */}
      <header className="reasoning-header">
        <div>
          <h1>Logical Reasoning Assessment</h1>
          <p>
            Test your logical thinking and problem-solving ability.
          </p>
        </div>

        <div className="reasoning-timer">
          <span>Time Remaining</span>
          <strong>{formatTime()}</strong>
        </div>
      </header>

      {/* Progress */}
      <div className="reasoning-progress">

        <div className="reasoning-progress-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            {Math.round(progress)}% Complete
          </span>
        </div>

        <div className="reasoning-progress-track">
          <div
            className="reasoning-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <main className="reasoning-question-container">

        <div className="reasoning-question-card">

          <div className="reasoning-question-number">
            Question {currentQuestion + 1}
          </div>

          <span className="reasoning-question-topic">
            {question.topic}
          </span>

          <h2>{question.question}</h2>

          <div className="reasoning-options">

            {question.options.map((option, index) => {
              const selected =
                answers[question.id] === option;

              return (
                <button
                  key={option}
                  className={`reasoning-option-button ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="reasoning-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Navigation */}
        <div className="reasoning-navigation">

          <button
            className="reasoning-previous-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <div className="reasoning-counter">
            {currentQuestion + 1} / {questions.length}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              className="reasoning-finish-btn"
              onClick={finishAssessment}
            >
              Finish Section →
            </button>
          ) : (
            <button
              className="reasoning-next-btn"
              onClick={nextQuestion}
            >
              Next →
            </button>
          )}

        </div>
      </main>
    </div>
  );
}

export default ReasoningAssessment;