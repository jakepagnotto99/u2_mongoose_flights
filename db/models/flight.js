const mongoose = require('../db/index');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  departingAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  arrivalAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  departureDateTime: {
    type: Date,
    required: true,
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
