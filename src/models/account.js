/* eslint-disable func-names */
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: { type: String, ref: 'User' },
  password: { type: String, required: [true, 'Password required'] },
  state: { type: Number, default: 1 },
  role: { type: String,
    default: 'guest',
    validate: {
      validator(v) {
        return /guest|admin/i.test(v);
      },
      message: props => `${props.value} is not a valid role`,
    } },
});

module.exports = mongoose.model('Account', accountSchema);
