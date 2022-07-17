'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'Test1',
        email: 'example@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Ashley',
        lastName: 'Thompson',
        username: 'Ash',
        email: 'ash@test.com',
        password: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {});
  },
};
