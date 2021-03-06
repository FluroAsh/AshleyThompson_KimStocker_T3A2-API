"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserVehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserVehicle.belongsTo(models.User);
      UserVehicle.belongsTo(models.Vehicle);
    }
  }
  UserVehicle.init(
    {
      VehicleId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserVehicle",
      timestamps: false,
    }
  );
  return UserVehicle;
};
