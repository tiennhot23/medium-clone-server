const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
  _id: { type: String, index: true },
  text: { type: String, required: true },
  type: { type: String, enum: ['h1', 'h2', 'h3', 'p', 'img'] },
  markups: [{
    start: Number,
    end: Number,
    href: String,
    type: {
      type: String,
      enum: ['a', 'strong'],
    },
  }],
}, { _id: false });

module.exports = mongoose.model('Paragraph', paragraphSchema);
