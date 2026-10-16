const mongoose = require("mongoose");

const codingProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    category: {
      type: String,
      default: "Programming",
    },

    languages: [String],

    starterCode: {
      javascript: String,
      python: String,
      java: String,
    },

    testCases: [
      {
        input: String,
        expectedOutput: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CodingProblem", codingProblemSchema);