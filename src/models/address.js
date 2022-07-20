'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User);

    }
  }
  Address.init(
    {
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      state: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};
