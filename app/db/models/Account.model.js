"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasOne(models.Customer, {
        foreignKey: "account_id",
      });

      // Association with CustomerPhoneNumber model
      Account.hasMany(models.CustomerPhoneNumber, {
        foreignKey: "account_id",
      });
    }
  }
  Account.init(
    {
      account_name: DataTypes.STRING,
      industry: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
      underscored: true,
    }
  );
  return Account;
};
