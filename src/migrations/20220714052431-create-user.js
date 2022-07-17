'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    /** TODO: Add validation for columns in new migration */
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
<<<<<<< HEAD
        type: Sequelize.STRING,
        allowNull: false
||||||| 90f2ba7
        type: Sequelize.STRING
=======
        type: Sequelize.STRING,
>>>>>>> dev
      },
      lastName: {
<<<<<<< HEAD
        type: Sequelize.STRING,
        allowNull: false
||||||| 90f2ba7
        type: Sequelize.STRING
=======
        type: Sequelize.STRING,
>>>>>>> dev
      },
      email: {
<<<<<<< HEAD
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
||||||| 90f2ba7
        type: Sequelize.STRING
=======
        type: Sequelize.STRING,
        unique: true,
>>>>>>> dev
      },
<<<<<<< HEAD
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
||||||| 90f2ba7
      userName: {
        type: Sequelize.STRING
=======
      username: {
        type: Sequelize.STRING,
        unique: true,
>>>>>>> dev
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
