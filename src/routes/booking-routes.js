const express = require("express");
const bookingRouter = express.Router();

const {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
} = require("../controllers/booking-controller");

bookingRouter.get("/bookings", getBookings);
bookingRouter.get("/booking/:id", getBooking);

// verify bookings belong to the user making the request (check ownership)
bookingRouter.get("/bookings/user/:username", getAllUserBookings);
bookingRouter.post("/booking/new", createBooking);
bookingRouter.put("/booking/:id", updateBooking);
bookingRouter.delete("/booking/:id", deleteBooking);

module.exports = {
  bookingRouter,
};
