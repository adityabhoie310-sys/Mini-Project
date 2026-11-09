const express = require('express'); const router = express.Router(); const c = require('../controllers/progressController'); const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, c.getProgress); router.put('/', protect, c.updateProgress); router.get('/weekly-report', protect, c.getWeeklyReport); module.exports = router;
