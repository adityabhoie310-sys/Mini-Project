const express = require('express');
const controller = require('../controllers/aiController');

const router = express.Router();

router.get('/health', controller.getHealth);
router.get('/jobs', controller.getJobs);
router.post('/analyze-gap', controller.analyzeGap);
router.get('/test-skill-gap', controller.getTestSkillGap);

module.exports = router;
