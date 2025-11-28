const mongoose = require('mongoose');

const powerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  strengthLevel: { type: Number, default: 1, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Power', powerSchema);
