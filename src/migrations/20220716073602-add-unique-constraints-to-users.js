'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'userName', 'username', {});
    // Add UNIQUE constraint for username & email columns
    await queryInterface.addConstraint('Users', {
      type: 'UNIQUE',
      name: 'unique_constraint_email_username',
      fields: ['email', 'username'],
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
