"use strict";
const bcrypt = require("bcrypt");
const casual = require("casual");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const pw = "123456";
const hashedPassword = bcrypt.hashSync(pw, salt);

const users = [...Array(9)].map(() => {
  return {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    username: casual.username,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

users.push({
  firstName: "Ashley",
  lastName: "Thompson",
  email: "ash@test.com",
  username: "Ash",
  password: hashedPassword,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  async up(queryInterface, Sequelize) {
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
