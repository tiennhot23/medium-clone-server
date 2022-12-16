const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Owner required'] },
  content: { type: String, required: [true, 'Content required'] },
  clapCount: { type: Number, default: 0 },
  replies: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] },
});

module.exports = mongoose.model('Comment', commentSchema);
