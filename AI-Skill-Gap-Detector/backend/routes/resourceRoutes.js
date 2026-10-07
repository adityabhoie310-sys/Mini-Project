const express = require('express'); const router = express.Router(); const c = require('../controllers/resourceController');
router.get('/', c.getResources); module.exports = router;
