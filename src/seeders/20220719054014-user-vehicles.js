"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserVehicles", [
      {
        VehicleId: 1,
        UserId: 1,
      },
      {
        VehicleId: 2,
        UserId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserVehicles", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
