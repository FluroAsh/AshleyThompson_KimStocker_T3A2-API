"use strict";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const casual = require("casual");

const chargers = [...Array(15)].map((charger) => {
  const status = ["pending", "active", "disabled"];
  const statusIndex = getRandomInt(0, 2);

  return {
    name: casual.title,
    instructions: casual.description,
    price: getRandomInt(20, 50),
    status: status[statusIndex],
    UserId: getRandomInt(1, 5),
    PlugId: getRandomInt(1, 3),
    AddressId: getRandomInt(1, 5),
    bucket: process.env.AWS_BUCKET_NAME,
    key: "uploads/turtle.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Chargers", chargers);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Addresses", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
