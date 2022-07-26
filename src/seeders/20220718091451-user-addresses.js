"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Addresses", [
      {
        address: "1 George Street",
        city: "Sydney",
        postcode: "2000",
        state: "New South Wales",
        UserId: 1,
      },
      {
        address: "123 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 2,
      },
      {
        address: "12 George Street",
        city: "Sydney",
        postcode: "2000",
        state: "New South Wales",
        UserId: 3,
      },
      {
        address: "19 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 4,
      },
      {
        address: "113 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Addresses", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
