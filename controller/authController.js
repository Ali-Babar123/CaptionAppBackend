const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Helper: format user
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

// ---------------- SIGNUP ----------------
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(201).json({ message: 'Signup successful', token, user: formatUserResponse(user) });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- LOGIN ----------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    user.lastActive = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ message: 'Login successful', token, user: formatUserResponse(user) });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- GOOGLE LOGIN ----------------
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'idToken required' });

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    if (!email) return res.status(400).json({ message: 'Invalid token: email missing' });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ googleId, email, fullName: name || '', photoUrl: picture || '' });
    } else {
      user.googleId = googleId;
      user.fullName = name || user.fullName;
      user.photoUrl = picture || user.photoUrl;
      user.lastActive = Date.now();
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ message: 'Google login successful', token, user: formatUserResponse(user) });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- GET ME ----------------
const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: formatUserResponse(user) });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const updateUserName = async (req, res) => {
  try {
    const userId = req.user._id;   // From auth middleware
    const { fullName } = req.body;

    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Name updated successfully",
      user: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        photoUrl: updatedUser.photoUrl,
      }
    });

  } catch (error) {
    console.error("Update name error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




const signupWithoutPassword = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // Validate input
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check existing user
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: null, // No password
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      success: true,
      message: "Signup successful!",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ---------------- GET SINGLE USER BY ID ----------------
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return formatted user data
    res.status(200).json({
      success: true,
      user: formatUserResponse(user),
    });

  } catch (error) {
    console.error("Get single user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- CHECK EMAIL EXISTS ----------------
const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        exists: true,
        message: "Email already registered",
      });
    }

    return res.status(200).json({
      exists: false,
      message: "Email is not available",
    });

  } catch (error) {
    console.error("Email check error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signup, login, googleLogin, getMe, updateUserName, signupWithoutPassword, getUserById, checkEmailExists };
