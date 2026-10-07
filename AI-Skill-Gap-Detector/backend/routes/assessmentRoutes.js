const express = require('express'); const router = express.Router(); const c = require('../controllers/assessmentController');
router.get('/questions', c.getQuestions); router.post('/submit', c.submitAssessment); router.get('/results/:id', c.getResult); module.exports = router;
