const db = require('../models');
const { User, Address, UserVehicle } = db;
const Op = db.Sequelize.Op;

/** Returns a promise */
exports.getAllUsers = () => User.findAll();

exports.getUserById = (id) =>
  User.findByPk(id, {
    include: [{ model: Address }, { model: UserVehicle }],
  });
