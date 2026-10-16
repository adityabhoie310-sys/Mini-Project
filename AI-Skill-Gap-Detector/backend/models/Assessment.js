const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRole",
    },

    technicalScore: {
      type: Number,
      default: 0,
    },

    reasoningScore: {
      type: Number,
      default: 0,
    },

    aptitudeScore: {
      type: Number,
      default: 0,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      default: 100,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assessment", assessmentSchema);