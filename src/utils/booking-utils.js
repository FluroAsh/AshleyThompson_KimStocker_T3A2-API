const db = require("../models");
const { Booking, User } = db;

exports.getBookingById = (id) =>
  Booking.findByPk(id, {
    include: [
      {
        model: User,
        as: "User",
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    ],
  });

exports.getAllBookings = () =>
  Booking.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    ],
  });
