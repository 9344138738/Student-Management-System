// backend/controllers/upload-controller.js
const fs = require('fs');
const path = require('path');
const Image = require('../models/imageSchema');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // You may get description from req.body.description
    const { description, uploaderId } = req.body;

    const saved = await Image.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimeType: req.file.mimetype,
      description: description || '',
      uploader: uploaderId || null,
    });

    return res.json({ message: 'File uploaded successfully', file: saved });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ message: 'Server error while uploading' });
  }
};

module.exports = { uploadImage };
