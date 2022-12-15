/* eslint-disable func-names */
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  rootLink: { type: String, required: [true, 'Link required'] },
  shortLink: { type: String, unique: true },
  isPublic: { type: Boolean, default: true },
  numberOfClick: { type: Number, default: 0 },
});

module.exports = mongoose.model('Link', linkSchema);
