const db = require("../models");
const sequelize = db.sequelize;
const { Booking } = db;
const { getBookingById, getAllBookings } = require("../utils/booking-utils");

async function getBooking(req, res) {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      throw Error;
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(404).json({ error: "No booking found" });
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
    res.status(404).json({ error: "No bookings found" });
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
    res.status(500).json({ error: err.message });
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
};
