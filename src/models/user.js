'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        if (user.isNewRecord) {
          const hashedPassword = bcrypt.hashSync(user.getDataValue('password'), 10)
          user.setDataValue('password', hashedPassword);
        }
      }
    }

  });

  return User;
};

