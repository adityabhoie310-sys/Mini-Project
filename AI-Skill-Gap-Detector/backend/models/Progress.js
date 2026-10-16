const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmapProgress: {
      type: Number,
      default: 0,
    },

    dailyPlanProgress: {
      type: Number,
      default: 0,
    },

    questionsSolved: {
      type: Number,
      default: 0,
    },

    correctAnswers: {
      type: Number,
      default: 0,
    },

    codingProblemsSolved: {
      type: Number,
      default: 0,
    },

    projectsCompleted: {
      type: Number,
      default: 0,
    },

    jobReadinessScore: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progress", progressSchema);