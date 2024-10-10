const mongoose = require('../db/index');

const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport;
