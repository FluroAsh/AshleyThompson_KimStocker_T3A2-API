const db = require("../models");
const sequelize = db.sequelize;
const { Booking } = db;
const {
  getBookingById,
  getAllBookings,
  getUserBookings,
  getBookingRequests,
  
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
  const data = { ...req.body };
  const reqUserId = req.user.id;
  try {
    authoriseUser(reqUserId, data.UserId);

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

    if (Object.keys(bookings).length === 0) {
      throw Error("No bookings found");
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({ error: err.message });
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

    if (filteredRequests.length === 0) {
      throw Error("No requests found");
    }

    res.status(200).json(filteredRequests);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// TODO: Create UpdateBooking Function
async function updateBooking() {}

async function deleteBooking(req, res) {
  const { id } = req.params;
  const reqUserId = req.user.id;

  try {
    const booking = await Booking.findByPk(id);
    // Verify ownership, pass the 'Owners ID'
    authoriseUser(reqUserId, booking.UserId);

    booking.destroy();
    res.status(200).json({ message: `Booking ${id} successfully deleted` });
  } catch (err) {
    res.status(404).json({ error: err.message });
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
