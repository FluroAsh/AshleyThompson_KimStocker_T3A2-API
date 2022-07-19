'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Address);
      // hasOne(models.UserVehicle)
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          if (user.isNewRecord) {
            const hashedPassword = bcrypt.hashSync(
              user.getDataValue('password'),
              10
            );
            user.setDataValue('password', hashedPassword);
          }
        },
      },
    }
  );

  return User;
};
