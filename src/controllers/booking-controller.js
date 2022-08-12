const db = require("../models");
const sequelize = db.sequelize;
const { Booking, Charger } = db;
const {
  getBookingById,
  getAllBookings,
  getUserBookings,
  getBookingRequests,
  findInvalidBookings,
} = require("../utils/booking-utils");

const { authoriseUser } = require("./auth-controller");

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

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
  const bookings = req.body;
  const UserId = req.user.id;

  try {
    // Check to see if there is a duplicate booking belonging to the request user
    const invalidBookings = await findInvalidBookings(UserId, bookings);

    if (invalidBookings.length !== 0) {
      throw Error(`You've already requested ${bookings[0].localTime}!`);
    }
    console.log("Invalid bookings", invalidBookings);

    const bookingDates = [];
    bookings.map((booking) => {
      const { ChargerId, bookingDate, price, status } = booking;
      sequelize.transaction(async (t) => {
        await Booking.create(
          { UserId, ChargerId, bookingDate, price, status },
          { transaction: t }
        );
      });
      bookingDates.push(formatDate(new Date(bookingDate)));
    });

    res.status(201);
    res.json({
      message: `Booking for ${bookingDates.join(
        ", "
      )} successfully created, go to Bookings for more details`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// TODO: Check ownership of user bookings
async function getAllUserBookings(req, res) {
  try {
    const bookings = await getUserBookings(req.user.id);
    if (req.user.username !== req.params.username) {
      throw Error("You are not allowed to do that");
    }

    res.status(200);
    res.json(bookings);
  } catch (err) {
    res.status(400);
    res.json({ error: err.message });
  }
}

async function getAllBookingRequests(req, res) {
  try {
    /**
     * Returned requests must have booking status 'pending' &
     * Charger status 'active'
     */
    const requests = await getBookingRequests(req.user.id);
    if (req.user.username !== req.params.username) {
      throw Error("You are not allowed to do that");
    }

    res.status(200);
    res.json(requests);
  } catch (err) {
    res.status(500);
    res.json({ error: err.message });
  }
}

// TODO: Create UpdateBooking Function
async function updateBooking(id, status, value) {
  const booking = await getBookingById(id);
  booking[status] = value;
  booking.save();
}

async function deleteBooking(req, res) {
  const { id: BookingId } = req.params;
  const reqUserId = req.user.id;

  try {
    const booking = await Booking.findByPk(BookingId);
    // Verify ownership, pass the 'Owners ID'
    authoriseUser(reqUserId, booking.UserId);

    booking.destroy();
    res
      .status(200)
      .json({ message: `Booking ${BookingId} successfully deleted` });
  } catch (err) {
    res.status(500);
    res.json({ error: err.message });
  }
}

async function handleHostRequest(req, res) {
  try {
    const { BookingId: reqBookingId } = req.body;
    const { response } = req.query;
    const reqUserId = req.user.id;

    const charger = await Charger.findOne({ where: { UserId: reqUserId } });
    if (!charger) {
      throw Error(`No associated charger found for user: ${reqUserId}`);
    }

    authoriseUser(reqUserId, charger.UserId);
    let responseMessage;

    let booking = await getBookingById(reqBookingId);
    if (!booking) {
      throw Error(`No booking found for booking: ${reqBookingId}`);
    }

    if (response === "approve") {
      booking = await booking.update({ status: "approved" });
      responseMessage = `${booking.User.firstName}'s booking has been approved`;
    }

    if (response === "reject") {
      responseMessage = `${booking.User.firstName}'s booking has been rejected`;
      booking = await booking.update({ status: "rejected" });
    }

    res.status(200).json({ message: responseMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleUserResponse(req, res) {
  try {
    const { BookingId: reqBookingId } = req.body;
    const { response } = req.query;
    const reqUserId = req.user.id;

    let booking = await getBookingById(reqBookingId);
    if (!booking) {
      throw Error(`No booking found for booking: ${reqBookingId}`);
    }

    authoriseUser(reqUserId, booking.UserId);
    let responseMessage;

    if (response === "pay") {
      responseMessage = `Payment complete for booking ${reqBookingId}`;
    }

    if (response === "cancel") {
      booking = await booking.update({ status: "cancelled" });
      responseMessage = `Booking (id: ${reqBookingId}) has been cancelled`;
    }

    res.status(200).json({ message: responseMessage });
  } catch (err) {
    console.log(err);
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
  handleHostRequest,
  handleUserResponse,
};
