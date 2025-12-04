const express = require('express');
const router = express.Router();
const hashtagController = require('../controller/hastagController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Hashtag
router.post('/createHastag', authMiddleware, hashtagController.createHashtag);

// Get all Hashtags
router.get('/getAllHastag', authMiddleware, hashtagController.getAllHashtags);

// Get single Hashtag
router.get('/getSingleHastag/:id', authMiddleware, hashtagController.getSingleHashtag);

// Update Hashtag
router.put('/updateHastag/:id', authMiddleware, hashtagController.updateHashtag);

// Delete Hashtag
router.delete('/deleteHastag/:id', authMiddleware, hashtagController.deleteHashtag);

module.exports = router;
