const express = require('express');
const router = express.Router();
const captionController = require('../controller/captionController');
const authMiddleware = require('../middleware/authMiddleware')
// Create Caption
router.post('/add', authMiddleware, captionController.createCaption);
router.get('/getAllCaption',  captionController.getCaptions);
router.get('/getSingleCaption/:id', authMiddleware,  captionController.getSingleCaption);


router.put('/updateCaption/:id', authMiddleware, captionController.updateCaption);
router.delete('/deleteCaption/:id', authMiddleware, captionController.deleteCaption);


module.exports = router;
