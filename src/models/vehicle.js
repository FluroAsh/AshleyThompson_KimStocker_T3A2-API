"use strict";
const { Model } = require("sequelize");
const plug = require("./plug");

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.belongsTo(models.Plug);
      Vehicle.hasMany(models.UserVehicle);
      Vehicle.belongsTo(models.User);

    }
  }
  Vehicle.init(
    {
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      variant: DataTypes.STRING,
      PlugId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,

    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
