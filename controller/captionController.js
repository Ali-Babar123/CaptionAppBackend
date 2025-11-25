const Caption = require('../models/Caption');
const User = require('../models/User');

exports.createCaption = async (req, res) => {
  try {
    const { captions, hashtags, planner, templateUrl } = req.body; // templateUrl is sent by client
    const userId = req.user.uid;

    // Find logged-in user
    const user = await User.findOne({ googleId: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const caption = new Caption({
      user: user._id,
      captions,
      hashtags,
      templates: templateUrl, // save the URL
      planner,
    });

    await caption.save();

    res.status(201).json({ message: 'Caption saved successfully', caption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const { captions, hashtags, planner, templateUrl } = req.body;
    const userId = req.user.uid;

    const user = await User.findOne({ googleId: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updatedCaption = await Caption.findOneAndUpdate(
      { _id: id, user: user._id }, // ensure only owner can update
      {
        captions,
        hashtags,
        templates: templateUrl,
        planner,
      },
      { new: true }
    );

    if (!updatedCaption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ message: "Caption updated successfully", caption: updatedCaption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCaptions = async (req, res) => {
  try {
    const userId = req.user.uid;

    // Find logged-in user
    const user = await User.findOne({ googleId: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const captions = await Caption.find({ user: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ captions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};





exports.deleteCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const user = await User.findOne({ googleId: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const deletedCaption = await Caption.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!deletedCaption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ message: "Caption deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
