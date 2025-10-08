const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    // Required fields
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Default optional fields
    username: { type: String, default: '' },
    termsAccepted: { type: Boolean, default: false },
    photoUrl: { type: String },
    bio: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },

    // Preferences
    goals: [{ type: String }],
    contentTypes: [{ type: String }],
    niches: [{ type: String }],
    interests: [{ type: String }],
    plannerFrequency: { type: String, default: 'Weekly' },
    aiRecommendationEnabled: { type: Boolean, default: true },

    // Subscription details (merged directly)
    subscriptionStatus: { type: String, default: 'free' },
    planName: { type: String, default: 'Free Plan' },
    planId: { type: String, default: '' },
    description: { type: String, default: 'Free tier plan with limited features' },
    paymentFrequency: { type: String, default: 'Monthly' },
    nextBillingDate: { type: Date, default: Date.now },
    paymentMethodType: { type: String, default: 'N/A' },
    currentTeamSize: { type: Number, default: 1 },
    isTrialActive: { type: Boolean, default: false },

    // Statistics
    postsCreated: { type: Number, default: 0 },
    templatesSaved: { type: Number, default: 0 },
    plannersScheduled: { type: Number, default: 0 },
    captionsCount: { type: Number, default: 0 },
    templatesCount: { type: Number, default: 0 },
    hashtagsCount: { type: Number, default: 0 },

    // Settings
    isNotificationEnabled: { type: Boolean, default: true },
    isOnboardingComplete: { type: Boolean, default: false },

    // System
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
