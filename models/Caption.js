const mongoose = require('mongoose');

const CaptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captions: { type: String, required: true },
    hashtags: { type: String },
    templates: { type: String }, 
    planner: { type: String },

    // ⭐ NEW FIELD ADDED HERE
    category: {
      type: String,
      enum: ["camera", "voice", "video", "text", "hashtags", "content planner"],
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Caption', CaptionSchema);
