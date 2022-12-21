const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, default: '' },
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  followings: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  password: { type: String, required: true },
  locked: { type: Boolean, default: false },
  role: { type: String, default: 'user', enum: ['admin', 'user'] },
});

module.exports = mongoose.model('User', userSchema);
