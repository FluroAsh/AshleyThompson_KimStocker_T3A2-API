"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Charger extends Model {
    static associate(models) {
      Charger.belongsTo(models.User, { as: "Host", foreignKey: "UserId" });
      Charger.belongsTo(models.User, { as: "User", foreignKey: "UserId" });
      Charger.belongsTo(models.Address);
      Charger.belongsTo(models.Plug);
      Charger.hasMany(models.Booking);
      Charger.hasMany(models.Unavailability);
    }
  }
  Charger.init(
    {
      name: DataTypes.STRING,
      bucket: DataTypes.STRING,
      key: DataTypes.STRING,
      instructions: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "active", "disabled"),
    },
    {
      sequelize,
      modelName: "Charger",
      hooks: {
        beforeCreate: (charger, options) => {
          if (charger.isNewRecord) {
            const convertedPrice = Number(charger.getDataValue("price")) * 100;
            charger.setDataValue("price", convertedPrice);
          }
        },
      },
    }
  );
  return Charger;
};
