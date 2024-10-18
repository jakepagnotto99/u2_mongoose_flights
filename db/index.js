const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb://localhost:27017/flightsDatabase'
  )
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db