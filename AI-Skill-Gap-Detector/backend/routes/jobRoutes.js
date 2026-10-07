const express = require('express'); const router = express.Router(); const c = require('../controllers/jobController');
router.get('/', c.getJobs); router.get('/:id', c.getJobById); module.exports = router;
