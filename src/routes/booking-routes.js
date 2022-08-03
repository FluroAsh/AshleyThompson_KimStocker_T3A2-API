const express = require("express");
const { authoriseUser } = require("../controllers/auth-controller");
const bookingRouter = express.Router();
const { loginRequired } = require("../controllers/auth-controller");
const {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
  getAllBookingRequests,
} = require("../controllers/booking-controller");

bookingRouter.use(loginRequired);

bookingRouter.get("/bookings", getBookings);
bookingRouter.get("/booking/:id", getBooking);

// verify bookings belong to the user making the request (check ownership)

// bookingRouter.get("/bookings/user/:username?type=bookings", getAllUserBookings)
bookingRouter.get("/bookings/user/:username", (req, res, next) => {
  if (req.query.type === "bookings") {
    getAllUserBookings(req, res);
  }

  if (req.query.type === "requests") {
    getAllBookingRequests(req, res);
  }
});
bookingRouter.post("/booking/new", createBooking);
bookingRouter.put("/booking/:id", updateBooking);
bookingRouter.delete("/booking/:id", deleteBooking);

module.exports = {
  bookingRouter,
};
