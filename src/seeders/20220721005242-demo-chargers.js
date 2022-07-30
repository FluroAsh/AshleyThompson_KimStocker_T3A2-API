"use strict";
const db = require("../models");
const casual = require("casual");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const chargers = [...Array(5)].map((e, index) => {

  const status = ["pending", "active", "disabled"];
  const statusIndex = getRandomInt(0, 2);
  // const randomUserAndAddressId = getRandomInt(1, 5);
  const indEl = index + 1;

  return {
    name: casual.title,
    instructions: casual.description,
    price: getRandomInt(2000, 5000),
    status: status[statusIndex],
    UserId: indEl,
    PlugId: getRandomInt(1, 3),
    AddressId: indEl,
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
