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
      User.hasMany(models.UserPhoneNumber, {
        foreignKey: "user_id",
        as: "user_phone_numbers",
      });
      User.hasMany(models.Customer, {
        foreignKey: "user_id",
        as: "customers",
      });
      User.hasMany(User, {
        foreignKey: "manager_id",
        as: "subordinates",
      });
      User.belongsTo(User, {
        foreignKey: "manager_id",
        as: "manager",
      });
      User.belongsTo(models.Image, {
        foreignKey: "image_id",
        as: "image",
      });
      User.belongsTo(models.Department, {
        foreignKey: "department_id",
        as: "department",
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
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        defaultValue: "male",
      },
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
