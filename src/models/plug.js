'use strict';
const { Model } = require('sequelize');
const Vehicle = require('./vehicle');
module.exports = (sequelize, DataTypes) => {
  class Plug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plug.hasMany(Vehicle, {
        onDelete: 'NULL',
        onUpdate: 'NULL',
      });
      Vehicle.belongsTo(Plug, {
        foreignKey: {
          name: 'plug_id',
        },
      });
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
