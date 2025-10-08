const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to shape the user response
const formatUserResponse = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  termsAccepted: user.termsAccepted,
  photoUrl: user.photoUrl,
  bio: user.bio,
  dateOfBirth: user.dateOfBirth,
  gender: user.gender,
  goals: user.goals,
  contentTypes: user.contentTypes,
  niches: user.niches,
  interests: user.interests,
  plannerFrequency: user.plannerFrequency,
  aiRecommendationEnabled: user.aiRecommendationEnabled,

  subscriptionStatus: user.subscriptionStatus,
  planName: user.planName,
  planId: user.planId,
  description: user.description,
  paymentFrequency: user.paymentFrequency,
  nextBillingDate: user.nextBillingDate,
  paymentMethodType: user.paymentMethodType,
  currentTeamSize: user.currentTeamSize,
  isTrialActive: user.isTrialActive,

  postsCreated: user.postsCreated,
  templatesSaved: user.templatesSaved,
  plannersScheduled: user.plannersScheduled,
  captionsCount: user.captionsCount,
  templatesCount: user.templatesCount,
  hashtagsCount: user.hashtagsCount,

  isNotificationEnabled: user.isNotificationEnabled,
  isOnboardingComplete: user.isOnboardingComplete,

  createdAt: user.createdAt,
  lastActive: user.lastActive,
});

// -----------------------------------------------------------------------------
// SIGNUP
// -----------------------------------------------------------------------------
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token (no expiration)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: formatUserResponse(newUser),
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -----------------------------------------------------------------------------
// LOGIN
// -----------------------------------------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token (no expiration)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.lastActive = new Date();
    await user.save();

    res.json({
      message: 'Login successful',
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -----------------------------------------------------------------------------
// GET CURRENT USER (Protected)
// -----------------------------------------------------------------------------
const getMe = async (req, res) => {
  try {
    const user = req.user; // populated by authMiddleware
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
module.exports = { signup, login, getMe };
