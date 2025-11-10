const express = require('express');
const router = express.Router();
const captionController = require('../controller/captionController');
const authMiddleware = require('../middleware/authMiddleware')
// Create Caption
router.post('/add', authMiddleware, captionController.createCaption);

module.exports = router;
