'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Chargers', [
      {
        name: "Seed Charger 1",
        instructions: "Go to garage and charge",
        price: 20,
        status: "active",
        UserId: 1,
        PlugId: 2,
        AddressId: 1,
        bucket: "iev",
        key: "uploads/349233f8-59bf-4c23-b8f1-e53abea4067c-turtle.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Seed Charger 2",
        instructions: "Go to garage and charge",
        price: 40,
        status: "active",
        UserId: 1,
        PlugId: 2,
        AddressId: 1,
        bucket: "iev",
        key: "uploads/349233f8-59bf-4c23-b8f1-e53abea4067c-turtle.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Addresses', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
