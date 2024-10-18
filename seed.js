const mongoose = require('./db/index');
const Airport = require('./models/airport');
const Flight = require('./models/flight');

async function seedDatabase() {
  // Clear existing data
  await Airport.deleteMany({});
  await Flight.deleteMany({});

  // Create Airports
  const airports = await Airport.insertMany([
    { name: 'Los Angeles International', location: 'Los Angeles, CA', code: 'LAX' },
    { name: 'John F. Kennedy International', location: 'New York, NY', code: 'JFK' },
    { name: 'San Francisco International', location: 'San Francisco, CA', code: 'SFO' },
    { name: 'Chicago O\'Hare International', location: 'Chicago, IL', code: 'ORD' },
  ]);

  // Create Flights
  await Flight.insertMany([
    { airline: 'Delta', flightNumber: 1001, price: 299, numberOfSeats: 150, departingAirport: airports[0]._id, arrivalAirport: airports[1]._id, departureDateTime: new Date('2024-12-01T10:30:00') },
    { airline: 'United', flightNumber: 2002, price: 199, numberOfSeats: 180, departingAirport: airports[1]._id, arrivalAirport: airports[2]._id, departureDateTime: new Date('2024-11-15T15:45:00') },
    { airline: 'Southwest', flightNumber: 3003, price: 99, numberOfSeats: 160, departingAirport: airports[2]._id, arrivalAirport: airports[3]._id, departureDateTime: new Date('2024-12-05T08:00:00') },
    { airline: 'Alaska', flightNumber: 4004, price: 150, numberOfSeats: 140, departingAirport: airports[3]._id, arrivalAirport: airports[0]._id, departureDateTime: new Date('2024-11-20T18:20:00') },
    { airline: 'American Airlines', flightNumber: 5005, price: 180, numberOfSeats: 120, departingAirport: airports[0]._id, arrivalAirport: airports[2]._id, departureDateTime: new Date('2024-12-10T11:15:00') },
    { airline: 'Spirit', flightNumber: 6006, price: 75, numberOfSeats: 100, departingAirport: airports[1]._id, arrivalAirport: airports[3]._id, departureDateTime: new Date('2024-12-15T20:45:00') },
    { airline: 'JetBlue', flightNumber: 7007, price: 120, numberOfSeats: 130, departingAirport: airports[2]._id, arrivalAirport: airports[1]._id, departureDateTime: new Date('2024-11-25T13:30:00') },
  ]);

  console.log('Database seeded successfully');
  mongoose.connection.close();
}

seedDatabase();
