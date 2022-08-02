"use strict";

const userVehicles = [...Array(12)].map((e, index) => {
  return {
    VehicleId: index + 1,
    UserId: index + 1,
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserVehicles", userVehicles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserVehicles", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
