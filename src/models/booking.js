"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Charger);
      /** Provides the FK an alias for when we are creating queries */
      // Booking.belongsTo(models.User, { as: 'Buyer', foreignKey: 'BuyerId' });
      Booking.belongsTo(models.User);

      // , { as: 'Buyer', foreignKey: 'BuyerId' }
      // Booking.belongsTo(models.User, { as: "Host", foreignKey: "HostId" });
    }
  }
  Booking.init(
    {
      BuyerId: DataTypes.INTEGER,
      HostId: DataTypes.INTEGER,
      ChargerId: DataTypes.INTEGER,
      bookingDate: DataTypes.DATE,
      price: DataTypes.INTEGER,
      status: DataTypes.ENUM("approved", "rejected", "pending", "cancelled"),
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
