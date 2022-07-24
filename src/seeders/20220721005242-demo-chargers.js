"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Chargers", [
      {
        name: "Seed Charger 1",
        instructions: "Go to garage and charge",
        price: 2000,
        status: "active",
        HostId: 2,
        PlugId: 2,
        AddressId: 1,
        bucket: process.env.AWS_BUCKET_NAME,
        key: "uploads/turtle.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Seed Charger 2",
        instructions: "Go to garage and charge",
        price: 4000,
        status: "active",
        HostId: 1,
        PlugId: 2,
        AddressId: 2,
        bucket: process.env.AWS_BUCKET_NAME,
        key: "uploads/turtle.png",
        createdAt: new Date(),
        updatedAt: new Date(),
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
