const mongoose = require('mongoose');

const CaptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captions: { type: String, required: true },
    hashtags: { type: String },
    templates: { type: String }, // URL of image
    planner: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Caption', CaptionSchema);
