const express = require('express');
const router = express.Router();
const plannerController = require('../controller/plannerController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Planner
router.post('/createPlanner', authMiddleware, plannerController.createPlanner);

// Get all Planners
router.get('/getAllPlanner', authMiddleware, plannerController.getAllPlanners);

// Get single Planner
router.get('/getSinglePlanner/:id', authMiddleware, plannerController.getSinglePlanner);

// Update Planner
router.put('/updatePlanner/:id', authMiddleware, plannerController.updatePlanner);


// get user planner
router.get('/getPlannerByUserId/:userId', authMiddleware, plannerController.getPlannersByUserId);

// Delete Planner
router.delete('/deletePlanner/:id', authMiddleware, plannerController.deletePlanner);

module.exports = router;
