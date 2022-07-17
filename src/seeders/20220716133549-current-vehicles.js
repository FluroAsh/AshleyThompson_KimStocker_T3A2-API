'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Vehicles', [
      {
        make: 'Audi',
        model: 'e-tron suv',
        variant: 'e-tron SUV 50',
        PlugId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        make: 'Audi',
        model: 'e-tron suv',
        variant: 'e-tron SUV 55',
        PlugId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Vehicles');
  },
};
