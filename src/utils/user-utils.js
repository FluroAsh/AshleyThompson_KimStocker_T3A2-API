const db = require("../models");
const { User, Address, Vehicle, UserVehicle } = db;

exports.getAllUsers = () => User.findAll();

exports.getUserById = (id) =>
  // Scenario: Get specific user to load in personal data & bookings when successfully logs in
  User.findByPk(id, {
    include: [
      {
        model: Address,
        attributes: { exclude: ["HostId"] },
      },
      {
        model: UserVehicle,
        include: [
          {
            model: Vehicle,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      },
    ],
  });
