const db = require("../models");
const sequelize = db.sequelize;
const { Booking } = db;
const {
  getBookingById,
  getAllBookings,
  getUserBookings,
} = require("../utils/booking-utils");

async function getBooking(req, res) {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      throw Error("No bookings found");
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getBookings(req, res) {
  try {
    const bookings = await getAllBookings();
    if (!bookings) {
      throw Error("No bookings found");
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function createBooking(req, res) {
  const data = { ...req.body };
  try {
    await sequelize.transaction(async (t) => {
      const booking = await Booking.create(data, { transaction: t });
      res.status(201).json(booking);
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// TODO: Check ownership of user bookings
async function getAllUserBookings(req, res) {
  try {
    const bookings = await getUserBookings(req.user.id);
    if (req.user.username !== req.params.username) {
      throw Error("You are not allowed to do that");
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(422).json({ err: err.message });
  }
}

/** TODOs: */
async function updateBooking() {}
async function deleteBooking() {}

module.exports = {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
};
