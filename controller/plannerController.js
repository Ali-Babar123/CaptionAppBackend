const Planner = require('../models/Planner');

// CREATE Planner
const createPlanner = async (req, res) => {
  try {
    const { goalType, duration, timeAvailability, description } = req.body;

    if (!goalType || !duration || !timeAvailability || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newPlanner = await Planner.create({
      goalType,
      duration,
      timeAvailability,
      description,
    });

    return res.json({
      success: true,
      message: "Planner created successfully",
      data: newPlanner,
    });
  } catch (error) {
    console.log("Create planner error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL Planners
const getAllPlanners = async (req, res) => {
  try {
    const planners = await Planner.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: planners });
  } catch (error) {
    console.log("Get all planners error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET SINGLE Planner
const getSinglePlanner = async (req, res) => {
  try {
    const id = req.params.id;
    const planner = await Planner.findById(id);

    if (!planner) {
      return res.status(404).json({ success: false, message: "Planner not found" });
    }

    return res.json({ success: true, data: planner });
  } catch (error) {
    console.log("Get single planner error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE Planner
const updatePlanner = async (req, res) => {
  try {
    const id = req.params.id;
    const { goalType, duration, timeAvailability, description } = req.body;

    const updated = await Planner.findByIdAndUpdate(
      id,
      { goalType, duration, timeAvailability, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Planner not found" });
    }

    return res.json({
      success: true,
      message: "Planner updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Update planner error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE Planner
const deletePlanner = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Planner.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Planner not found" });
    }

    return res.json({ success: true, message: "Planner deleted successfully" });
  } catch (error) {
    console.log("Delete planner error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createPlanner,
  getAllPlanners,
  getSinglePlanner,
  updatePlanner,
  deletePlanner,
};
