'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Roles extends Model {
    static associate(models) {
      // define association here
    }
  }
  User_Roles.init({
    roleid: DataTypes.INTEGER,
    userid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Roles',
  });
  return User_Roles;
};