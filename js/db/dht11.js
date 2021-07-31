const MONGOOSE = require('mongoose');

// 스키마 생성
const DHT11 = MONGOOSE.Schema({
  temperature: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = MONGOOSE.model('dht11', DHT11);
