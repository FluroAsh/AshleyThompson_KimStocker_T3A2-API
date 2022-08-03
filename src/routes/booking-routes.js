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
  handleUserResponse,
  handleHostRequest,
} = require("../controllers/booking-controller");

bookingRouter.use(loginRequired);

bookingRouter.get("/bookings", getBookings);
bookingRouter.get("/booking/:id", getBooking);

bookingRouter.get("/bookings/user/:username", (req, res, next) => {
  const { type } = req.query;

  if (type === "bookings") {
    getAllUserBookings(req, res);
  }

  if (type === "requests") {
    getAllBookingRequests(req, res);
  }
});

bookingRouter.put("/booking/request", (req, res) => {
  const { response } = req.query;

  if (response === "approve" || "reject") {
    handleHostRequest(req, res);
  }

  if (response === "pay" || "cancel") {
    handleUserResponse(req, res);
  }
});
bookingRouter.post("/booking/new", createBooking);
bookingRouter.put("/booking/:id", updateBooking);
bookingRouter.delete("/booking/:id", deleteBooking);

module.exports = {
  bookingRouter,
};
