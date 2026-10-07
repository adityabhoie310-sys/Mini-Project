const express = require('express'); const router = express.Router(); const c = require('../controllers/authController');
router.post('/login', c.login); router.post('/register', c.register); router.get('/profile', c.getProfile); module.exports = router;
