const fs = require('fs'); const path = require('path');
const loadQuestions = (type) => {
  let file = 'technicalQuestions.json';
  if (type === 'reasoning') file = 'reasoningQuestions.json';
  if (type === 'aptitude') file = 'aptitudeQuestions.json';
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/', file), 'utf8')); } catch { return []; }
};
exports.getQuestions = async (req, res) => res.json(loadQuestions(req.query.type));
exports.submitAssessment = async (req, res) => res.json({ score: 76, passed: true, breakdown: { technical: 80, reasoning: 75, aptitude: 60 } });
exports.getResult = async (req, res) => res.json({ id: req.params.id, score: 76, status: 'Completed' });
