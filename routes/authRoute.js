const express = require('express');
const { signup, login, getMe, googleLogin } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googleLogin);

// Protected route
router.get('/me', authMiddleware, getMe);

module.exports = router;
