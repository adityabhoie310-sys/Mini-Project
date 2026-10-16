const mongoose = require("mongoose");

const weeklyReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    week: {
      type: Number,
      required: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    skillsImproved: [String],

    completedTasks: {
      type: Number,
      default: 0,
    },

    questionsSolved: {
      type: Number,
      default: 0,
    },

    codingProblemsSolved: {
      type: Number,
      default: 0,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    aiRecommendations: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WeeklyReport", weeklyReportSchema);