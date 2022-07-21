const express = require('express');
const bookingRouter = express.Router();

const {
  getBooking,
  getBookings,
} = require('../controllers/booking-controller');

bookingRouter.get('/bookings', getBookings);
bookingRouter.get('/booking/:id', getBooking);

module.exports = {
  bookingRouter,
};
