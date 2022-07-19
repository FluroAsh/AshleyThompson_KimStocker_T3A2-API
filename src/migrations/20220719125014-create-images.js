'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {

      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      bucket: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      ChargerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Chargers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  }
};