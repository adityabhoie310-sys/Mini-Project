const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
