/* eslint-disable func-names */
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  previewImage: { type: String, default: '' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publishTime: { type: Number, default: Date.now() },
  visibility: { type: String, default: 'draft' },
  clapCount: { type: Number, default: 0 },
  depth: { type: Number, default: 0 },
  claps: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  responses: { type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: [] },
});

module.exports = mongoose.model('Post', postSchema);
