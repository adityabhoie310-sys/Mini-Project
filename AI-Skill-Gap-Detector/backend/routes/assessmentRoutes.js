const express = require('express');
const router = express.Router();
const c = require('../controllers/assessmentController');

router.get('/', c.getQuestions);
router.get('/questions', c.getQuestions);
router.post('/questions', c.addQuestion); // Admin add question route
router.post('/submit', c.submitAssessment);
router.get('/results/:id', c.getResult);

module.exports = router;
