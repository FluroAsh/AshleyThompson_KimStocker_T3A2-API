'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Charger.belongsTo(models.User);
      Charger.belongsTo(models.Address);


    }
  }
  Charger.init({
    name: DataTypes.STRING,
    uuid: DataTypes.UUID,
    bucket: DataTypes.STRING,
    key: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'active', 'disabled')
  }, {
    sequelize,
    modelName: 'Charger',
    hooks: {
      beforeCreate: (charger, options) => {
        if (charger.isNewRecord) {
           
          const convertedPrice = Number(charger.getDataValue('price'))*100
          charger.setDataValue('price', convertedPrice);
        }
      },
    },
  });
  return Charger;
};