"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Charger);
      Booking.belongsTo(models.User);
    }
  }
  Booking.init(
    {
      bookingDate: DataTypes.DATE,
      price: DataTypes.INTEGER,
      status: DataTypes.ENUM(
        "approved",
        "rejected",
        "pending",
        "cancelled",
        "paid"
      ),
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
