const mongoose = require("mongoose");

const HashtagSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      enum: ["facebook", "instagram"],
      required: true,
    },

    language: {
      type: String,
      enum: ["English", "Urdu", "Spanish", "Hindi"],
      required: true,
    },

    numberOfHashtags: {
      type: Number,
      required: true,
      min: 1,
      max: 10, // ✔ only 1 to 10 allowed
    },
    hashtag:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Hashtag = mongoose.model("Hashtag", HashtagSchema);

module.exports = Hashtag;
