import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/technicalAssessment.css";

const questions = [
  {
    id: 1,
    question: "Which language is primarily used to structure web pages?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    answer: "HTML",
    topic: "Web Development",
  },
  {
    id: 2,
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const",
    topic: "JavaScript",
  },
  {
    id: 3,
    question: "Which method converts JSON data into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
    topic: "JavaScript",
  },
  {
    id: 4,
    question: "Which database is commonly used with the MERN stack?",
    options: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"],
    answer: "MongoDB",
    topic: "Database",
  },
  {
    id: 5,
    question: "Which command is used to create a new Git repository?",
    options: [
      "git start",
      "git create",
      "git init",
      "git new",
    ],
    answer: "git init",
    topic: "Git & GitHub",
  },
  {
    id: 6,
    question: "Which technology is used for styling web pages?",
    options: ["HTML", "CSS", "MongoDB", "Node.js"],
    answer: "CSS",
    topic: "Web Development",
  },
  {
    id: 7,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Program Internet",
      "Advanced Programming Interface",
      "Application Process Integration",
    ],
    answer: "Application Programming Interface",
    topic: "Programming",
  },
  {
    id: 8,
    question: "Which symbol is used for a single-line comment in JavaScript?",
    options: ["<!--", "//", "#", "/*"],
    answer: "//",
    topic: "JavaScript",
  },
  {
    id: 9,
    question: "Which Git command downloads changes from a remote repository?",
    options: ["git push", "git pull", "git send", "git download"],
    answer: "git pull",
    topic: "Git & GitHub",
  },
  {
    id: 10,
    question: "Which component is responsible for routing requests in Express.js?",
    options: ["Router", "Schema", "Model", "Database"],
    answer: "Router",
    topic: "Backend",
  },
];

function TechnicalAssessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  const question = questions[currentQuestion];

  // Timer
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
    setAnswers({
      ...answers,
      [question.id]: option,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishAssessment = () => {
    localStorage.setItem(
      "technicalAssessmentAnswers",
      JSON.stringify(answers)
    );

    navigate("/assessment/reasoning");
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="technical-page">

      {/* Header */}
      <header className="technical-header">

        <div>
          <h1>Technical Skills Assessment</h1>
          <p>
            Test your programming and technical knowledge.
          </p>
        </div>

        <div className="assessment-timer">
          <span>Time Remaining</span>
          <strong>{formatTime()}</strong>
        </div>

      </header>

      {/* Progress */}
      <div className="technical-progress">

        <div className="progress-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            {Math.round(progress)}% Complete
          </span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Question */}
      <main className="question-container">

        <div className="question-card">

          <div className="question-number">
            Question {currentQuestion + 1}
          </div>

          <span className="question-topic">
            {question.topic}
          </span>

          <h2>{question.question}</h2>

          <div className="options">

            {question.options.map((option, index) => {

              const selected =
                answers[question.id] === option;

              return (
                <button
                  key={option}
                  className={`option-button ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}

          </div>

        </div>

        {/* Navigation */}
        <div className="question-navigation">

          <button
            className="previous-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <div className="question-counter">
            {currentQuestion + 1} / {questions.length}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              className="finish-btn"
              onClick={finishAssessment}
            >
              Finish Section →
            </button>
          ) : (
            <button
              className="next-btn"
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

export default TechnicalAssessment;
