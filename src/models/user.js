/* eslint-disable func-names */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String,
    required: [true, 'Username required'],
    unique: true },
  email: { type: String,
    required: [true, 'Email required'],
    unique: true },
  links: { type: [mongoose.Schema.Types.ObjectId], ref: 'Link', default: [] },
});

module.exports = mongoose.model('User', userSchema);
