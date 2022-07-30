"use strict";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const vehicles = [...Array(10)].map(() => ({
  make: "Audi",
  model: "e-tron SUV",
  variant: "e-tron SUV 50",
  PlugId: getRandomInt(1, 3),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Vehicles", vehicles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Vehicles", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
