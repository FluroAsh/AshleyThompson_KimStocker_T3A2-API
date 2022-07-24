"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Vehicles", [
      // TODO: Update to include ALL cars
      {
        make: "Audi",
        model: "e-tron SUV",
        variant: "e-tron SUV 50",
        PlugId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        make: "Audi",
        model: "e-tron SUV",
        variant: "e-tron SUV 55",
        PlugId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        make: "Audi",
        model: "e-tron Sportback",
        variant: "e-tron SUV 55",
        PlugId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Vehicles", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
