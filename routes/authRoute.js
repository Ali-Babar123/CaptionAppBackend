const express = require('express');
const { signup, login, getMe, googleLogin, updateUserName, signupWithoutPassword } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.put('/update-name', authMiddleware, updateUserName);

router.post("/signupwithoutPassword", signupWithoutPassword);

// Protected route
router.get('/me', authMiddleware, getMe);

module.exports = router;
