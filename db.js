'use strict';

const mongoose = require('mongoose');
mongoose.set('debug', true)
mongoose.connect("mongodb://localhost:27017/usmproject");
module.exports = mongoose;