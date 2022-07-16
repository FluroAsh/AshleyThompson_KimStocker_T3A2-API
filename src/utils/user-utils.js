const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

/** Returns a promise */
const getAllUsers = User.findAll();

module.exports = {
  getAllUsers,
};

// User{ dataValues: { id: 1, firstName: 'John'}}
