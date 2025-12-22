const express = require('express');
const { signup, login, getMe, googleLogin, updateUserName, signupWithoutPassword, getUserById, checkEmailExists } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.put('/update-name/:id', updateUserName);

router.post("/signupwithoutPassword", signupWithoutPassword);
router.get('/getUserById/:id', authMiddleware, getUserById);
router.post('/check-email',  checkEmailExists);


// Protected route
router.get('/me', authMiddleware, getMe);

module.exports = router;
