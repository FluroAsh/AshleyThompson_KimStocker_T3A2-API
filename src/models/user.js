'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const saltRounds = 10;


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Address);
      User.hasMany(models.Charger);


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
          const salt = bcrypt.genSaltSync(saltRounds);
          if (user.isNewRecord) {
            const hashedPassword = bcrypt.hashSync(
              user.getDataValue('password'),
              salt
            );
            user.setDataValue('password', hashedPassword);
          }
        },
      },
    }
  );

  return User;
};


