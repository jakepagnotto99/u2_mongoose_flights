const Airport = require('./models/Airport');
const Flight = require('./models/Flight');

// Example: Fetch all flights and airports
async function fetchAllData() {
  const flights = await Flight.find().populate('departingAirport arrivalAirport');
  const airports = await Airport.find();
  console.log('Flights:', flights);
  console.log('Airports:', airports);
}

// Call functions based on your needs
fetchAllData();
async function getFlightsByDepartureDate() {
    const flights = await Flight.find()
      .sort({ departureDateTime: 1 }) // Sort by date in ascending order
      .populate('departingAirport arrivalAirport');
    
    console.log('Flights sorted by departure date:', flights);
  }
  
  getFlightsByDepartureDate();
  async function getUpcomingFlights() {
    const currentDate = new Date();
    const flights = await Flight.find({ departureDateTime: { $gt: currentDate } })
      .sort({ departureDateTime: 1 }) // Sort by date in ascending order
      .populate('departingAirport arrivalAirport');
    
    console.log('Upcoming flights:', flights);
  }
  
  getUpcomingFlights();
  async function getFlightsFromCaliforniaToNewYork() {
    // Retrieve the airport IDs for California and New York
    const californiaAirports = await Airport.find({ code: { $in: ['LAX', 'SFO'] } });
    const newYorkAirports = await Airport.find({ code: { $in: ['JFK', 'LGA'] } });
  
    // Get the IDs of these airports
    const californiaAirportIds = californiaAirports.map(airport => airport._id);
    const newYorkAirportIds = newYorkAirports.map(airport => airport._id);
  
    // Find flights departing from California and arriving in New York, sorted by descending price
    const flights = await Flight.find({
      departingAirport: { $in: californiaAirportIds },
      arrivalAirport: { $in: newYorkAirportIds },
    })
      .sort({ price: -1 }) // Sort by price in descending order
      .populate('departingAirport arrivalAirport');
    
    console.log('Flights from California to New York sorted by descending price:', flights);
  }
  
  getFlightsFromCaliforniaToNewYork();
  