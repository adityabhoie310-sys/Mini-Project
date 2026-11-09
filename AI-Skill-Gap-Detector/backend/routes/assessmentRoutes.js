const express = require('express');
const router = express.Router();
const c = require('../controllers/assessmentController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', c.getQuestions);
router.get('/questions', c.getQuestions);
router.post('/questions', protect, requireAdmin, c.addQuestion);
router.post('/submit', protect, c.submitAssessment);
router.get('/results/:id', protect, c.getResult);

module.exports = router;
