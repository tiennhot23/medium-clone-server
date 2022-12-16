/* eslint-disable func-names */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Author required'] },
  rawText: { type: String, required: [true, 'Raw text required'] },
  clapCount: { type: Number, default: 0 },
  claps: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] },
});

module.exports = mongoose.model('Blog', blogSchema);
