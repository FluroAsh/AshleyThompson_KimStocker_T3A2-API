'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("adding seed Users");
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'Test1',
        email: 'example@example.com',
        // Generated using: https://bcrypt-generator.com/ (10 rounds)
        // Decrypted: 123456
        password:
          '$2a$10$SV9DvTevkzYqqT/cpPDo4uPiRMyYvyB4sTigt9S4sIRa7cxiQSyzy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Ashley',
        lastName: 'Thompson',
        username: 'Ash',
        email: 'ash@test.com',
        // Decrypted: abc123
        password:
          '$2a$10$mKNvCDgNoas4LWYmuA3Q1.6u6csAkpxV1e4nrr4cUTIvjYjVTbk0K',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
