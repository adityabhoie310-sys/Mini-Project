import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/aptitudeAssessment.css";

const questions = [
  {
    id: 1,
    question: "What is 25% of 240?",
    options: ["40", "50", "60", "70"],
    answer: "60",
    topic: "Percentage",
  },
  {
    id: 2,
    question: "A number is increased from 200 to 250. What is the percentage increase?",
    options: ["20%", "25%", "30%", "35%"],
    answer: "25%",
    topic: "Percentage",
  },
  {
    id: 3,
    question: "A student's marks increase from 60 to 75. What is the percentage increase?",
    options: ["15%", "20%", "25%", "30%"],
    answer: "25%",
    topic: "Percentage",
  },
  {
    id: 4,
    question: "What is 40% of 350?",
    options: ["120", "130", "140", "150"],
    answer: "140",
    topic: "Percentage",
  },
  {
    id: 5,
    question: "A product costs ₹800 and is sold for ₹960. What is the profit percentage?",
    options: ["15%", "20%", "25%", "30%"],
    answer: "20%",
    topic: "Profit & Loss",
  },
  {
    id: 6,
    question: "An article is bought for ₹500 and sold for ₹450. What is the loss percentage?",
    options: ["5%", "10%", "15%", "20%"],
    answer: "10%",
    topic: "Profit & Loss",
  },
  {
    id: 7,
    question: "The cost price of an item is ₹1,000. If the profit is 15%, what is the selling price?",
    options: ["₹1,050", "₹1,100", "₹1,150", "₹1,200"],
    answer: "₹1,150",
    topic: "Profit & Loss",
  },
  {
    id: 8,
    question: "A shopkeeper gives a 10% discount on an item priced at ₹2,000. What is the selling price?",
    options: ["₹1,700", "₹1,800", "₹1,900", "₹2,100"],
    answer: "₹1,800",
    topic: "Profit & Loss",
  },
  {
    id: 9,
    question: "The ratio of boys to girls in a class is 3:2. If there are 30 boys, how many girls are there?",
    options: ["15", "20", "25", "30"],
    answer: "20",
    topic: "Ratio & Proportion",
  },
  {
    id: 10,
    question: "Divide ₹600 in the ratio 2:3. What is the smaller share?",
    options: ["₹200", "₹240", "₹300", "₹360"],
    answer: "₹240",
    topic: "Ratio & Proportion",
  },
  {
    id: 11,
    question: "If 5 pens cost ₹100, what is the cost of 8 pens?",
    options: ["₹120", "₹140", "₹160", "₹180"],
    answer: "₹160",
    topic: "Ratio & Proportion",
  },
  {
    id: 12,
    question: "If A:B = 4:5 and B:C = 10:3, what is A:C?",
    options: ["8:3", "4:3", "5:3", "8:5"],
    answer: "8:3",
    topic: "Ratio & Proportion",
  },
  {
    id: 13,
    question: "A can complete a work in 10 days. What fraction of the work does A complete in one day?",
    options: ["1/5", "1/10", "1/15", "1/20"],
    answer: "1/10",
    topic: "Time & Work",
  },
  {
    id: 14,
    question: "A can complete a job in 12 days and B can complete it in 6 days. How long will they take together?",
    options: ["3 days", "4 days", "5 days", "6 days"],
    answer: "4 days",
    topic: "Time & Work",
  },
  {
    id: 15,
    question: "If 5 workers complete a work in 12 days, how many days will 10 workers take, assuming equal efficiency?",
    options: ["4 days", "6 days", "8 days", "10 days"],
    answer: "6 days",
    topic: "Time & Work",
  },
  {
    id: 16,
    question: "A and B together can complete a work in 8 days. If A alone takes 12 days, how many days will B alone take?",
    options: ["18 days", "20 days", "24 days", "30 days"],
    answer: "24 days",
    topic: "Time & Work",
  },
  {
    id: 17,
    question: "A car travels at 60 km/h. How far will it travel in 3 hours?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    answer: "180 km",
    topic: "Time, Speed & Distance",
  },
  {
    id: 18,
    question: "A train travels 240 km in 4 hours. What is its average speed?",
    options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    answer: "60 km/h",
    topic: "Time, Speed & Distance",
  },
  {
    id: 19,
    question: "How much time will a car travelling at 50 km/h take to cover 150 km?",
    options: ["2 hours", "3 hours", "4 hours", "5 hours"],
    answer: "3 hours",
    topic: "Time, Speed & Distance",
  },
  {
    id: 20,
    question: "A person walks at 5 km/h. How far will they walk in 36 minutes?",
    options: ["2 km", "3 km", "4 km", "5 km"],
    answer: "3 km",
    topic: "Time, Speed & Distance",
  },
  {
    id: 21,
    question: "What is the probability of getting a head when a fair coin is tossed once?",
    options: ["0", "1/4", "1/2", "1"],
    answer: "1/2",
    topic: "Probability",
  },
  {
    id: 22,
    question: "What is the probability of rolling a 6 on a fair six-sided die?",
    options: ["1/2", "1/3", "1/6", "1/12"],
    answer: "1/6",
    topic: "Probability",
  },
  {
    id: 23,
    question: "A bag contains 3 red balls and 2 blue balls. What is the probability of picking a red ball?",
    options: ["2/5", "3/5", "1/2", "4/5"],
    answer: "3/5",
    topic: "Probability",
  },
  {
    id: 24,
    question: "What is the average of 10, 20, 30, 40 and 50?",
    options: ["20", "25", "30", "35"],
    answer: "30",
    topic: "Quantitative Aptitude",
  },
  {
    id: 25,
    question: "If x + 15 = 40, what is the value of x?",
    options: ["15", "20", "25", "30"],
    answer: "25",
    topic: "Quantitative Aptitude",
  },
];

function AptitudeAssessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);

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
      "aptitudeAssessmentAnswers",
      JSON.stringify(answers)
    );

    navigate("/assessment/result");
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="aptitude-page">

      {/* Header */}
      <header className="aptitude-header">
        <div>
          <h1>Aptitude Assessment</h1>
          <p>
            Test your quantitative and mathematical problem-solving skills.
          </p>
        </div>

        <div className="aptitude-timer">
          <span>Time Remaining</span>
          <strong>{formatTime()}</strong>
        </div>
      </header>

      {/* Progress */}
      <div className="aptitude-progress">

        <div className="aptitude-progress-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            {Math.round(progress)}% Complete
          </span>
        </div>

        <div className="aptitude-progress-track">
          <div
            className="aptitude-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Question */}
      <main className="aptitude-question-container">

        <div className="aptitude-question-card">

          <div className="aptitude-question-number">
            Question {currentQuestion + 1}
          </div>

          <span className="aptitude-question-topic">
            {question.topic}
          </span>

          <h2>{question.question}</h2>

          <div className="aptitude-options">

            {question.options.map((option, index) => {
              const selected =
                answers[question.id] === option;

              return (
                <button
                  key={option}
                  className={`aptitude-option-button ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="aptitude-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Navigation */}
        <div className="aptitude-navigation">

          <button
            className="aptitude-previous-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <div className="aptitude-counter">
            {currentQuestion + 1} / {questions.length}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              className="aptitude-finish-btn"
              onClick={finishAssessment}
            >
              Finish Assessment →
            </button>
          ) : (
            <button
              className="aptitude-next-btn"
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

export default AptitudeAssessment;