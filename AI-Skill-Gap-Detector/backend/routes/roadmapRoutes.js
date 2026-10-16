const express = require('express');
const router = express.Router();
const c = require('../controllers/roadmapController');

router.get('/', c.getRoadmap);
router.get('/:jobId', c.getRoadmap);
router.patch('/item/:itemId', c.updateProgress);

module.exports = router;
