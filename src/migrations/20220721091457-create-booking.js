'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      // HostId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
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
      bookingDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('approved', 'rejected', 'pending', 'cancelled'),
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
    await queryInterface.dropTable('Bookings');
  },
};
