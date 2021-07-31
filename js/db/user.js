const MONGOOSE = require('mongoose');

// 스키마 생성
const USER = MONGOOSE.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = MONGOOSE.model('User', USER);
