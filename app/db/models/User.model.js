"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Contact, {
        foreignKey: "user_id",
      });
      User.hasMany(models.UserPhoneNumber, {
        foreignKey: "user_id",
      });
      User.hasMany(User, {
        foreignKey: "manager_id",
        as: "subordinates",
      });
      User.belongsTo(User, {
        foreignKey: "manager_id",
        as: "manager",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
