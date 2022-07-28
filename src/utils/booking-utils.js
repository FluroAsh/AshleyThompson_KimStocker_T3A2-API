const db = require("../models");
const { Booking, User, Charger, Address, UserVehicle, Vehicle } = db;

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

exports.getBookingByChargerId = (chargerId) => {
  // TODO: Exists?
  return Booking.findOne({ where: { ChargerId: chargerId } });
};


exports.getUserBookings = (UserId) =>
  Booking.findAll({
    where: { UserId },
    order: [["status", "DESC"]],
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
          {
            model: Address,
          },
        ],
      },
    ],
  });

exports.getBookingRequests = (UserId) =>
  Booking.findAll({
    where: { status: "pending" },
    order: [["status", "ASC"]],
    include: [
      {
        model: User,
        attributes: { exclude: ["username", "password"] },
        include: [
          {
            model: UserVehicle,
            include: [
              {
                model: Vehicle,
              },
            ],
          },
        ],
      },
      {
        model: Charger,
        where: { status: "active" },
        include: [
          {
            model: User,
            as: "Host",
            // requesting User ID must match the Host ID, otherwise returns NULL for charger
            where: { id: UserId },
            attributes: { exclude: ["username", "password"] },
          },
          {
            model: Address,
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
