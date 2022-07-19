const db = require('../models');
const vehicle = require('../models/vehicle');
const { User, Address, Vehicle, UserVehicle, Plug } = db;
const Op = db.Sequelize.Op;

exports.getAllUsers = () => User.findAll();

exports.getUserById = (id) =>
  // Scenario: Get specific user to load in personal data & bookings when successfully logs in
  User.findByPk(id, {
    include: [
      {
        model: Address,
        attributes: { exclude: ['UserId'] },
      },
      {
        model: UserVehicle,
        include: [
          {
            model: Vehicle,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  });
