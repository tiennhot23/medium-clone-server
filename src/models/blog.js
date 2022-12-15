/* eslint-disable func-names */
const mongoose = require('mongoose');
const slugify = require('slugify');

const { shortID } = require('../modules');

const blogSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: [true, 'Slug required'] },
  title: { type: String, required: [true, 'Title required'] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Author required'] },
  rawText: { type: String, required: [true, 'Raw text required'] },
  claps: { type: Number, default: 0 },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

blogSchema.pre(['save', 'updateOne'], function (next) {
  try {
    if (this.title) {
      this.slug = `${slugify(this.title, { lower: true, strict: true })}-${shortID.generateID()}`;
    }
    if (this._update.title) {
      this.slug = `${slugify(this._update.title, { lower: true, strict: true })}-${shortID.generateID()}`;
    }
  } catch (e) {
    next(e);
    return;
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
