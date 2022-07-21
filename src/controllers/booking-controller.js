const { getBookingById, getAllBookings } = require('../utils/booking-utils');

async function getBooking(req, res) {
  try {
    console.log('params', req.params.id);
    const booking = await getBookingById(req.params.id);
    console.log('booking', booking);
    if (!booking) {
      throw Error;
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(404).json({ error: 'No booking found' });
  }
}

async function getBookings(req, res) {
  try {
    const bookings = await getAllBookings();
    if (!bookings) {
      throw Error;
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({ error: 'No bookings found' });
  }
}

module.exports = {
  getBooking,
  getBookings,
};
