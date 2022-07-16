'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('Vehicles', [
    //   {
    //     make: 'Audi',
    //     model: 'e-tron suv',
    //     variant: 'e-tron SUV 50',
    //     // plug_id
    //   },
    //   {
    //     make: 'Audi',
    //     model: 'e-tron suv',
    //     variant: 'e-tron SUV 50',
    //     // plug_id
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // return queryInterface.bulkDelete('Vehicles');
  },
};
