// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["camera", "voice", "video", "text", "hashtags", "content planner"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
