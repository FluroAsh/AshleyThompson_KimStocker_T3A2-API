"use strict";
const db = require("../models");
const { User } = db;
const casual = require("casual");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}



// async function getUser(id) {

//   return await User.findByPk(id);


// }

const chargers = [...Array(15)].map((charger) => {
  const status = ["pending", "active", "disabled"];
  const statusIndex = getRandomInt(0, 2);

  const randomUserAndAddressId = getRandomInt(1, 5);
  
  // const user = getUser(randomUserId);
  // const addressId = user.Address.id;

  return {
    name: casual.title,
    instructions: casual.description,
    price: getRandomInt(20, 50),
    status: status[statusIndex],
    UserId: randomUserAndAddressId,
    PlugId: getRandomInt(1, 3),
    AddressId: randomUserAndAddressId,
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
