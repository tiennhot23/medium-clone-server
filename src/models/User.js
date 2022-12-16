const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'Email required'], unique: true },
  name: { type: String, required: [true, 'Full name required'] },
  avatar: { type: String, default: '' },
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  followings: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  password: { type: String, required: [true, 'Password required'] },
  locked: { type: Boolean, default: false },
  role: { type: String, default: 'author', enum: ['admin', 'author'] },
});

module.exports = mongoose.model('User', userSchema);
