"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Addresses", [
      {
        address: "1 Sesame Street",
        city: "Sydney",
        postcode: "2386",
        state: "New South Wales",
        UserId: 1,
      },
      {
        address: "123 Fake Street",
        city: "Melbourne",
        postcode: "3000",
        state: "Victoria",
        UserId: 2,
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
