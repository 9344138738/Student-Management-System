// backend/models/imageSchema.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String },
  path: { type: String, required: true },
  size: { type: Number },
  mimeType: { type: String },
  description: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }, // optional: reference to admin/user
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);
