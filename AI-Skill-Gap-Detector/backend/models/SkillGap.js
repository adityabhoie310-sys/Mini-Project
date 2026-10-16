const mongoose = require("mongoose");

const skillGapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    currentLevel: {
      type: Number,
      required: true,
    },

    requiredLevel: {
      type: Number,
      required: true,
    },

    gap: {
      type: Number,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    aiRecommendation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SkillGap", skillGapSchema);