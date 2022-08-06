const db = require("../models");
const { Booking, User, Charger, Address, UserVehicle, Vehicle } = db;
const Op = db.Sequelize.Op;

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
    order: [["status", "ASC"]],
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

exports.findInvalidBookings = (UserId, bookings) => {
  const invalidBookings = Booking.findAll({
    where: {
      [Op.or]: bookings.map((booking) => {
        return {
          UserId,
          bookingDate: booking.bookingDate,
        };
      }),
    },
  });
  return invalidBookings;
};

// Return the updated object for the frontend in both Approval/Rejection methods
exports.handleHostApproval = (userBooking) => {
  userBooking.update(
    { status: "approved" },
    {
      returning: true,
      plain: true,
    }
  );
};

exports.handleHostRejection = async (userBooking) => {
  userBooking.update(
    { status: "rejected" },
    {
      returning: true,
      plain: true,
    }
  );
};
