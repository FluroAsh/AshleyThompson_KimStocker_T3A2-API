"use strict";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function randomDate() {
  let start = new Date(); // 'today'
  let end = new Date(2023, 0, 1); // Jan 1st 2023

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const bookings = [...Array(15)].map(() => {
  const status = ["approved", "rejected", "pending", "cancelled"];
  const statusIndex = getRandomInt(0, 3);

  return {
    UserId: getRandomInt(1, 10),
    ChargerId: getRandomInt(1, 5),
    bookingDate: randomDate(),
    // price can be random as owner may change the charging price every now and then,
    // this price is at time of booking :)
    price: getRandomInt(2000, 5000),
    status: status[statusIndex],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Bookings", bookings);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Bookings", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
