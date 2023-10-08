const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortlinkSchema = new Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  longURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Shortlink', ShortlinkSchema);