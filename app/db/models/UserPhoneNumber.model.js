"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPhoneNumber.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  UserPhoneNumber.init(
    {
      phone_number: DataTypes.STRING,
      extension: DataTypes.STRING,

      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserPhoneNumber",
      tableName: "user_phone_numbers",
      underscored: true,
    }
  );
  return UserPhoneNumber;
};
