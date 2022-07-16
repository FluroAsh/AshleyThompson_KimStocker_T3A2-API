const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

/** Returns a promise */
exports.getAllUsers = User.findAll();

exports.getUserById = (id) => {
  const user = User.findByPk(id);
  return user;
};

// module.exports = {
//   getAllUsers,
//   getUserById,
// };

// User{ dataValues: { id: 1, firstName: 'John'}}
