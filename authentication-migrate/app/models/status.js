'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      });
    }
  }

  Status.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Status',
    }
  );

  return Status;
};
