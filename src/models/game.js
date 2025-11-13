const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  hoursPlayed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Game', gameSchema);
