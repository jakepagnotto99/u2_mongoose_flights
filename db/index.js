const mongoose = require('mongoose');

// Connect to the MongoDB database called "flightsDatabase"
mongoose.connect('mongodb://localhost:27017/flightsDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to flightsDatabase!');
});

module.exports = mongoose;
