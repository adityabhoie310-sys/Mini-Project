const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Assessment = require('../models/Assessment');

// Keeps the API usable when MongoDB is not configured. Replace with the
// Assessment model persistence path when a database connection is available.
const submittedResults = new Map();

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
  const questions = loadQuestions(req.query.type);
  const limit = Math.min(Math.max(Number(req.query.limit) || questions.length, 1), questions.length);
  const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, limit);
  // Do not expose answers to the browser for server-delivered MCQs.
  res.json(shuffled.map(({ answer, correctAnswer, ...question }) => question));
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
  const input = req.body || {};
  const rawScores = input.breakdown || input.scores || input;
  const sections = ['technical', 'reasoning', 'aptitude'];
  const breakdown = {};

  for (const section of sections) {
    const rawVal =
      rawScores[`${section}Score`] ??
      rawScores[section] ??
      (typeof input.score === 'number' ? input.score : 0);
    const value = Number(rawVal);
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      return res.status(400).json({
        message: `Provide a valid ${section} score between 0 and 100.`
      });
    }
    breakdown[section] = Math.round(value);
  }

  const score = Math.round(
    (breakdown.technical + breakdown.reasoning + breakdown.aptitude) / 3
  );
  const id = input.id || `assessment_${Date.now()}`;
  const result = {
    id,
    score: typeof input.score === 'number' ? input.score : score,
    passed: score >= 50,
    breakdown,
    completed: true,
    completedAt: input.completedAt || new Date().toISOString()
  };

  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Authentication is required.' });

  if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(userId)) {
    const today = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const attempts = await Assessment.countDocuments({ user: userId, createdAt: { $gte: today } });
    if (attempts >= 3) return res.status(429).json({ message: 'Daily assessment attempt limit reached. Please try again tomorrow.' });
    const record = await Assessment.create({
      user: userId,
      technicalScore: breakdown.technical,
      reasoningScore: breakdown.reasoning,
      aptitudeScore: breakdown.aptitude,
      overallScore: score,
      completed: true,
      completedAt: result.completedAt,
    });
    result.id = String(record._id);
  } else {
    result.userId = userId;
    submittedResults.set(id, result);
  }
  res.status(201).json(result);
};

exports.getResult = async (req, res) => {
  const userId = req.user?.id;
  if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(req.params.id)) {
    const record = await Assessment.findOne({ _id: req.params.id, user: userId }).lean();
    if (record) return res.json({ id: String(record._id), score: record.overallScore, passed: record.overallScore >= 50, breakdown: { technical: record.technicalScore, reasoning: record.reasoningScore, aptitude: record.aptitudeScore }, completed: record.completed, completedAt: record.completedAt });
  }
  const result = submittedResults.get(req.params.id);
  if (result && result.userId && result.userId !== userId) return res.status(403).json({ message: 'You cannot access this result.' });
  if (!result) {
    return res.status(404).json({ message: 'Assessment result not found.' });
  }
  res.json(result);
};
