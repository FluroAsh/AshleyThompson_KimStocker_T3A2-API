'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Addresses', [
      {
        address: '1 Sesame Street',
        city: 'Sydney',
        postcode: 2386,
        state: 'New South Wales',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '123 Fake Street',
        city: 'Melbourne',
        postcode: 3000,
        state: 'Victoria',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Addresses', null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
