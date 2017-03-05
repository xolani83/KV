'use strict'

const mongoose = require('mongoose');

let verbSchema = mongoose.Schema({
  dict: String,
  meaning: String,
  stem: String,
  present_base: String,
  past_base: String,
  future_base: String,
  isKnown: { type: Boolean, default: false },
  isFavourite: { type: Boolean, default: false }
});

let verbModel = mongoose.model('verb',verbSchema);
module.exports = verbModel;
