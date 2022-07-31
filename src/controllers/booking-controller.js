const db = require("../models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const { Booking } = db;
const {
  getBookingById,
  getAllBookings,
  getUserBookings,
  getBookingRequests,
  findInvalidBookings,
} = require("../utils/booking-utils");

const { authoriseUser } = require("./auth-controller");

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
  const UserId = req.user.id || null;
  const bookings = req.body;

  try {
    if (UserId === null) {
      throw Error("You need to be logged in to do that");
    }

    // Check to see if there is a duplicate booking belonging to the request user
    const invalidBookings = await findInvalidBookings(UserId, bookings);

    console.log("Invalid bookings", invalidBookings);
    if (invalidBookings.length !== 0) {
      throw Error(`You've already requested ${bookings[0].localTime}!`);
    }

    bookings.map((booking) => {
      const { ChargerId, bookingDate, price, status } = booking;
      sequelize.transaction(async (t) => {
        await Booking.create(
          { UserId, ChargerId, bookingDate, price, status },
          { transaction: t }
        );
      });
    });

    res.status(201).json(bookings);
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
    res.status(500).json({ error: err.message });
  }
}

async function getAllBookingRequests(req, res) {
  try {
    const requests = await getBookingRequests(req.user.id);
    if (req.user.username !== req.params.username) {
      throw Error("You are not allowed to do that");
    }
    /**
     * Returned requests must have booking status 'pending' &
     * Charger status 'active'
     */
    const filteredRequests = requests.filter(
      (request) => request.status === "pending" && request.Charger !== null
    );

    res.status(200).json(filteredRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// TODO: Create UpdateBooking Function
async function updateBooking() {}

async function deleteBooking(req, res) {
  const { id: BookingId } = req.params;
  const reqUserId = req.user.id;

  try {
    const booking = await Booking.findByPk(BookingId);
    // Verify ownership, pass the 'Owners ID'
    authoriseUser(reqUserId, booking.UserId);

    booking.destroy();
    res.status(200).json({ message: `Booking ${id} successfully deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
  getAllBookingRequests,
};
