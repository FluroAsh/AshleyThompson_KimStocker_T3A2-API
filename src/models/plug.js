'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plug.hasMany(models.Vehicle);

    }
  }
  Plug.init(
    {
      plugName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Plug',
    }
  );
  return Plug;
};
