const mongoose = require("mongoose");

const roadmapItemSchema = new mongoose.Schema(
  {
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },

    week: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    skills: [String],

    topics: [String],

    resources: [
      {
        name: String,
        type: String,
        link: String,
      },
    ],

    project: {
      type: String,
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoadmapItem", roadmapItemSchema);