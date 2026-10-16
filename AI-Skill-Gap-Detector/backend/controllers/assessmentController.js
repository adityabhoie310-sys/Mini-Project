const fs = require('fs');
const path = require('path');

const getFilePath = (type) => {
  let file = 'technicalQuestions.json';
  if (type === 'reasoning') file = 'reasoningQuestions.json';
  if (type === 'aptitude') file = 'aptitudeQuestions.json';

  const processedPath = path.join(__dirname, '../../database/processed/', file);
  if (fs.existsSync(processedPath)) return processedPath;

  return path.join(__dirname, '../../database/', file);
};

const loadQuestions = (type) => {
  const filePath = getFilePath(type);
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  // Fallback questions by type
  if (type === 'reasoning') {
    return [
      { id: 1, question: "Find the next number: 2, 4, 8, 16, ?", options: ["24", "32", "36", "40"], answer: "32", topic: "Number Series" },
      { id: 2, question: "If CAT is coded as DBU, how is DOG coded?", options: ["EPH", "EOG", "DPH", "FQI"], answer: "EPH", topic: "Coding-Decoding" }
    ];
  }
  if (type === 'aptitude') {
    return [
      { id: 1, question: "What is 15% of 200?", options: ["20", "30", "40", "50"], answer: "30", topic: "Percentage" },
      { id: 2, question: "If a train travels 180 km in 3 hours, what is its speed?", options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], answer: "60 km/h", topic: "Speed & Distance" }
    ];
  }
  return [
    { id: 1, skill: "JavaScript", title: "Sum two numbers", type: "coding" },
    { id: 2, skill: "React", title: "Virtual DOM reconciliation", type: "mcq" }
  ];
};

exports.getQuestions = async (req, res) => {
  res.json(loadQuestions(req.query.type));
};

// Admin adds new technical question (MCQ or Coding Program challenge)
exports.addQuestion = async (req, res) => {
  try {
    const {
      title,
      language,
      topic,
      description,
      type = 'coding', // 'coding' or 'mcq'
      starterCode,
      codeSnippet,
      testCases,
      options,
      answer,
      explanation
    } = req.body;

    if (!title || !language) {
      return res.status(400).json({ message: 'Title and programming language are required' });
    }

    const filePath = getFilePath('technical');
    let currentQuestions = [];
    try {
      currentQuestions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      currentQuestions = [];
    }

    const newQuestion = {
      id: `${language.toLowerCase()}_${Date.now()}`,
      language,
      topic: topic || 'Custom Coding Challenge',
      title,
      description: description || title,
      type,
      starterCode: starterCode || `// Write your ${language} solution here\n`,
      codeSnippet: codeSnippet || '',
      testCases: testCases || [],
      options: options || [],
      answer: answer || '',
      explanation: explanation || 'Admin custom question',
      createdBy: 'admin',
      createdAt: new Date().toISOString()
    };

    currentQuestions.unshift(newQuestion);
    fs.writeFileSync(filePath, JSON.stringify(currentQuestions, null, 2), 'utf8');

    res.status(201).json({
      success: true,
      message: 'Question added successfully by admin',
      question: newQuestion
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitAssessment = async (req, res) => {
  res.json({
    score: 85,
    passed: true,
    breakdown: { technical: 88, reasoning: 80, aptitude: 75 }
  });
};

exports.getResult = async (req, res) => {
  res.json({ id: req.params.id, score: 85, status: 'Completed' });
};
