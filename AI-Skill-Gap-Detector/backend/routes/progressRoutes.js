const express = require('express'); const router = express.Router(); const c = require('../controllers/progressController');
router.get('/', c.getProgress); router.get('/weekly-report', c.getWeeklyReport); module.exports = router;
