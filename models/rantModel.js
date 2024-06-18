const mongoose = require('mongoose');

const rantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Rant', rantSchema);
