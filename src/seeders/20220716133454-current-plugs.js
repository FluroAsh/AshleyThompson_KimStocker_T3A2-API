'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Plugs', [
      {
        plugName: 'typeOne',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plugName: 'typeTwo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plugName: 'typeThree',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Plugs', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
