const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: { type: String, enum: ['fire', 'deforestation'], required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  location: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);