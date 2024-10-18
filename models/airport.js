const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const Airport = mongoose.model('Airport', airportSchema);
module.exports = Airport;
