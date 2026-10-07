const mongoose = require('mongoose');

const SkillGapSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SkillGap', SkillGapSchema);
