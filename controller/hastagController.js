const Hashtag = require('../models/Hastags');

// CREATE
const createHashtag = async (req, res) => {
  try {
    const { description, platform, language, numberOfHashtags, hashtag } = req.body;

    if (!description || !platform || !language || !numberOfHashtags || !hashtag) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (numberOfHashtags < 1 || numberOfHashtags > 10) {
      return res.status(400).json({
        success: false,
        message: "numberOfHashtags must be between 1 and 10",
      });
    }

    const newData = await Hashtag.create({
      description,
      platform,
      language,
      numberOfHashtags,
      hashtag
    });

    return res.json({
      success: true,
      message: "Hashtag data saved successfully",
      data: newData,
    });
  } catch (error) {
    console.log("Create hashtag error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL
const getAllHashtags = async (req, res) => {
  try {
    const hashtags = await Hashtag.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: hashtags });
  } catch (error) {
    console.log("Get all hashtags error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET SINGLE
const getSingleHashtag = async (req, res) => {
  try {
    const id = req.params.id;
    const hashtag = await Hashtag.findById(id);

    if (!hashtag) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.json({ success: true, data: hashtag });
  } catch (error) {
    console.log("Get single hashtag error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE
const updateHashtag = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, platform, language, numberOfHashtags } = req.body;

    const updated = await Hashtag.findByIdAndUpdate(
      id,
      { description, platform, language, numberOfHashtags },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Update hashtag error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE
const deleteHashtag = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Hashtag.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log("Delete hashtag error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createHashtag,
  getAllHashtags,
  getSingleHashtag,
  updateHashtag,
  deleteHashtag,
};
