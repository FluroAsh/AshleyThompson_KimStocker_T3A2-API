const db = require('../models');
const sequelize = db.sequelize;
const { Booking, User } = db;

exports.getBookingById = (id) =>
  Booking.findByPk(id, {
    include: [
      {
        model: User,
        as: 'Buyer',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
      {
        model: User,
        as: 'Host',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    ],
  });

exports.getAllBookings = () =>
  Booking.findAll({
    include: [
      {
        model: User,
        as: 'Buyer',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
      {
        model: User,
        as: 'Host',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    ],
  });
