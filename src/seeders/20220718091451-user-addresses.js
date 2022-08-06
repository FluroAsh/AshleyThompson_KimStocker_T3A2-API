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
      {
        address: "113 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 6,
      },
      {
        address: "115 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 7,
      },
      {
        address: "116 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 8,
      },
      {
        address: "117 Pitt Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 9,
      },
      {
        address: "123 Clyde Road",
        city: "Berwick",
        postcode: "3806",
        state: "Victoria",
        UserId: 10,
      },
      {
        address: "124 Clyde Road",
        city: "Berwick",
        postcode: "3806",
        state: "Victoria",
        UserId: 11,
      },
      {
        address: "125 Clyde Road",
        city: "Berwick",
        postcode: "3806",
        state: "Victoria",
        UserId: 12,
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
