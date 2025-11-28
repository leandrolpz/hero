const mongoose = require('mongoose');
const { Schema } = mongoose;

const heroSchema = new Schema({
  name: { type: String, required: true, trim: true },
  alias: { type: String, default: '' },
  age: { type: Number },
  powers: [{ type: Schema.Types.ObjectId, ref: 'Power' }], // relação
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
