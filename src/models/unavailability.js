"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unavailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unavailability.belongsTo(models.Charger);
    }
  }
  Unavailability.init(
    {
      ChargerId: DataTypes.INTEGER,
      UnavailabilityDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Unavailability",
    }
  );
  return Unavailability;
};
