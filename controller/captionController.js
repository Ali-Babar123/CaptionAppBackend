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
