const express = require("express");
const bookingRouter = express.Router();

const {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking-controller");

bookingRouter.get("/bookings", getBookings);
bookingRouter.get("/booking/:id", getBooking);
bookingRouter.post("/booking/new", createBooking);
bookingRouter.put("/booking/:id", updateBooking);
bookingRouter.delete("/booking/:id", deleteBooking);

module.exports = {
  bookingRouter,
};
