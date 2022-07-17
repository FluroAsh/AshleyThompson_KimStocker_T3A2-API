'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // TODO: Add associations and assign a plug_id to each vehicle
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Vehicles');
  },
};
