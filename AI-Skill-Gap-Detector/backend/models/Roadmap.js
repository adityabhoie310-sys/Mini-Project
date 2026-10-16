const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
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

    title: {
      type: String,
      default: "Personalized Career Roadmap",
    },

    description: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 6,
    },

    progress: {
      type: Number,
      default: 0,
    },

    generatedByAI: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);