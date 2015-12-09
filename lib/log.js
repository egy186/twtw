'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Log = new Schema({
  log: String
});

module.exports = mongoose.model('Log', Log);
