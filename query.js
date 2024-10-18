const db = require('./db');
const Airport = require('./models/airport');
const Flight = require('./models/flight');

async function seed() {
    await Airport.deleteMany({});
    await Flight.deleteMany({});

    const lax = await Airport.create({ name: 'Los Angeles International Airport', location: 'Los Angeles, CA', code: 'LAX' });
    const jfk = await Airport.create({ name: 'John F. Kennedy International Airport', location: 'New York, NY', code: 'JFK' });
    const sfo = await Airport.create({ name: 'San Francisco International Airport', location: 'San Francisco, CA', code: 'SFO' });
    const lga = await Airport.create({ name: 'LaGuardia Airport', location: 'New York, NY', code: 'LGA' });

    await Flight.create([
        { airline: 'American Airlines', flightNumber: 123, price: 500, numberOfSeats: 200, departingAirport: lax._id, arrivalAirport: jfk._id, departureDateTime: new Date('2024-11-20T10:00:00') },
        { airline: 'Delta Airlines', flightNumber: 456, price: 450, numberOfSeats: 180, departingAirport: sfo._id, arrivalAirport: jfk._id, departureDateTime: new Date('2024-11-22T11:00:00') },
        { airline: 'United Airlines', flightNumber: 789, price: 550, numberOfSeats: 220, departingAirport: lax._id, arrivalAirport: lga._id, departureDateTime: new Date('2024-11-23T09:00:00') },
        // Add 4 more flights...
    ]);

    console.log('Database seeded');
    db.close();
}

// seed();
async function listFlights() {
  const flights = await Flight.find().populate('departingAirport').populate('arrivalAirport');
  console.log(flights);
  db.close();
}

listFlights();
async function getFlightById(id) {
  const flight = await Flight.findById(id).populate('departingAirport').populate('arrivalAirport');
  console.log(flight);
  db.close();
}

getFlightById("67129e1db1580f090eab0a6b");
async function createFlight() {
  const lax = await Airport.findOne({ code: 'LAX' });
  const jfk = await Airport.findOne({ code: 'JFK' });

  const flight = await Flight.create({
      airline: 'American Airlines',
      flightNumber: 123,
      price: 400,
      numberOfSeats: 150,
      departingAirport: lax._id,
      arrivalAirport: jfk._id,
      departureDateTime: new Date('2024-11-25T14:00:00')
  });

  console.log('Flight Created:', flight);
  db.close();
}

createFlight();
async function updateFlight(id, updateData) {
  const flight = await Flight.findByIdAndUpdate(id, updateData, { new: true });
  console.log('Updated Flight:', flight);
  db.close();
}

updateFlight("67129e1db1580f090eab0a6b", { price: 600 });

async function deleteFlight(id) {
  await Flight.findByIdAndDelete(id);
  console.log('Flight Deleted');
  db.close();
}

deleteFlight("67129e1db1580f090eab0a6b");
async function listFlightsByDate() {
  const flights = await Flight.find().sort('departureDateTime').populate('departingAirport').populate('arrivalAirport');
  console.log(flights);
  db.close();
}

listFlightsByDate();

async function listCaliforniatoNYFlights() {
  const flights = await Flight.find({
      departingAirport: { $in: [await Airport.findOne({ code: 'LAX' }), await Airport.findOne({ code: 'SFO' })] },
      arrivalAirport: { $in: [await Airport.findOne({ code: 'JFK' }), await Airport.findOne({ code: 'LGA' })] }
  }).sort('-price').populate('departingAirport').populate('arrivalAirport');

  console.log(flights);
  db.close();
}

listCaliforniatoNYFlights();
async function createAirport() {

  const airport = await Airport.create({
      name: 'American Airlines',
      location: "123",
      code: "400",
  });

  console.log('Flight Created:', airport);
  db.close();
}
createAirport();
async function updateAirport(id, updateData) {
  const airport = await Airport.findByIdAndUpdate(id, updateData, { new: true });
  console.log('Updated Flight:', airport);
  db.close();
}

updateAirport("67129f9b3bcda5c0bd02e227", { code: "600" });

async function deleteAirport(id) {
  await Airport.findByIdAndDelete(id);
  console.log('Airport Deleted');
  db.close();
}

deleteAirport("67129f9b3bcda5c0bd02e227");

async function listAirport() {
  const airports = await Airport.find();
  console.log(airports);
  db.close();
}

listAirport();