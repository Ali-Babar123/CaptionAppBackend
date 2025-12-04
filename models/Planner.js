const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema(
  {
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
