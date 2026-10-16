const mongoose = require("mongoose");

const jobRoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    requiredSkills: [
      {
        skill: String,
        requiredLevel: Number,
      },
    ],

    responsibilities: [String],

    salaryRange: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobRole", jobRoleSchema);