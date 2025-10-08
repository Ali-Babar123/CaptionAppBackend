const express = require('express');
const { signup, login, getMe } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup',  signup);
router.post('/login', login);

// Protected route
router.get('/me', authMiddleware, getMe);

module.exports = router;
