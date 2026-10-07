const express = require('express'); const router = express.Router(); const c = require('../controllers/skillController');
router.get('/', c.getSkills); router.get('/gap/:jobId', c.getSkillGap); module.exports = router;
