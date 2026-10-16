const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Video",
        "Documentation",
        "Practice",
        "Course",
        "Article",
      ],
      default: "Video",
    },

    platform: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      required: true,
    },

    recommendedByAI: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);