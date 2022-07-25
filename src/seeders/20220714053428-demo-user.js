"use strict";

const casual = require("casual");

const users = [...Array(10)].map((user) => ({
  firstName: casual.first_name,
  lastName: casual.last_name,
  email: casual.email,
  username: casual.username,
  password: casual.password,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("adding seed Users");
    return queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
