const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema(

  {
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    goalType: {
      type: String,
      enum: ["Productivity", "Fitness", "Study", "Career", "Lifestyle"],
      required: true,
    },

    duration: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      required: true,
    },

    timeAvailability: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Planner = mongoose.model("Planner", PlannerSchema);

module.exports = Planner;
