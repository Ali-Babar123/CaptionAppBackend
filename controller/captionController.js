const Caption = require('../models/Caption');
const User = require('../models/User');

// CREATE
exports.createCaption = async (req, res) => {
  try {
    const { captions, hashtags, planner, templateUrl, category } = req.body;
    const userId = req.user._id;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const caption = new Caption({
      user: userId,
      captions,
      hashtags,
      templates: templateUrl,
      planner,
      category, // ⭐ Added
    });

    await caption.save();

    res.status(200).json({ message: 'Caption saved successfully', caption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// GET captions by User ID
exports.getCaptionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const captions = await Caption.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: captions.length,
      data: captions,
    });
  } catch (error) {
    console.error("Get captions by userId error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.getSingleCaption = async (req, res) =>{
  try {
    const {id} = req.params;

    const userId = req.user._id;

    const caption = await Caption.findOne({
      _id: id,
      user: userId
    })

   if (!caption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ caption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const { captions, hashtags, planner, templateUrl, category } = req.body;

    const updatedCaption = await Caption.findOneAndUpdate(
      { _id: id, user: userId },
      {
        captions,
        hashtags,
        planner,
        templates: templateUrl,
        category, // ⭐ Added
      },
      { new: true }
    );

    if (!updatedCaption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ message: "Caption updated", caption: updatedCaption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCaptions = async (req, res) => {
  try {
    const captions = await Caption.find().sort({ createdAt: -1 });

    res.status(200).json({ captions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deleted = await Caption.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ message: "Caption deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// GET captions by User ID
exports.getCaptionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const captions = await Caption.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: captions.length,
      data: captions,
    });
  } catch (error) {
    console.error("Get captions by userId error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
