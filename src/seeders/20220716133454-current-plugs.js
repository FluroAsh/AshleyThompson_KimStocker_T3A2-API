'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Plugs', [
      {
        plugName: 'Type 2 (Mennekes)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plugName: 'Combined Charging System (CCS)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plugName: 'Charge de Move (CHAdeMO)',
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
