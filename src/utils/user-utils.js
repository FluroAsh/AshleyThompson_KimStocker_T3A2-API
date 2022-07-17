const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

/** Returns a promise */
exports.getAllUsers = () => User.findAll();

exports.getUserById = (id) => User.findByPk(id);
