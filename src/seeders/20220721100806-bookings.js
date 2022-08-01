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

function plusDays(num) {
  let today = new Date();
  return new Date(today.getTime() + num)
}

const bookings = [...Array(15)].map(() => {
  const status = ["approved", "rejected", "pending", "cancelled"];
  const statusIndex = getRandomInt(0, 3);

  return {
    UserId: getRandomInt(3, 10),
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

// Bookings below are static for testing purposes
bookings.unshift({
  UserId: 2,
  ChargerId: 1,
  bookingDate: plusDays(1),
  // price can be random as owner may change the charging price every now and then,
  // this price is at time of booking :)
  price: 3000,
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
});

bookings.unshift({
  UserId: 2,
  ChargerId: 1,
  bookingDate: plusDays(2),
  // price can be random as owner may change the charging price every now and then,
  // this price is at time of booking :)
  price: 3000,
  status: "approved",
  createdAt: new Date(),
  updatedAt: new Date(),
});

bookings.unshift({
  UserId: 2,
  ChargerId: 1,
  bookingDate: plusDays(3),
  // price can be random as owner may change the charging price every now and then,
  // this price is at time of booking :)
  price: 3000,
  status: "rejected",
  createdAt: new Date(),
  updatedAt: new Date(),
});

bookings.unshift({
  UserId: 2,
  ChargerId: 1,
  bookingDate: plusDays(4),
  // price can be random as owner may change the charging price every now and then,
  // this price is at time of booking :)
  price: 3000,
  status: "cancelled",
  createdAt: new Date(),
  updatedAt: new Date(),
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
