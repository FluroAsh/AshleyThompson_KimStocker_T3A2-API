'use strict';
const { Model } = require('sequelize');

const Plug = require('./plug');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.belongsTo(Plug, { foreignKey: 'plug_id' });
    }
  }
  Vehicle.init(
    {
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      variant: DataTypes.STRING,
      plug_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Vehicle',
    }
  );

  return Vehicle;
};
