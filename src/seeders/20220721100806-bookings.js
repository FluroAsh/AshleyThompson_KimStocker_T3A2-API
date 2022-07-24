'use strict';
const { randomDate } = require('../utils/helpers');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        UserId: 2,
        ChargerId: 1,
        bookingDate: randomDate(),
        price: 2000,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        ChargerId: 2,
        bookingDate: randomDate(),
        price: 4000,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
