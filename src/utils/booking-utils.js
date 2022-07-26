const db = require("../models");
const { Booking, User, Charger } = db;

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

exports.getUserBookings = (UserId) =>
  Booking.findAll({
    where: { UserId },
    include: [
      { model: User, attributes: { exclude: ["username", "password"] } },
      {
        model: Charger,
        include: [
          {
            model: User,
            as: "Host",
            attributes: { exclude: ["username", "password"] },
          },
        ],
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
