"use strict";
const { Model } = require("sequelize");
const { IndustryType } = require("../../enums/index");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.Customer, {
        foreignKey: "account_id",
        as: "customers",
      });
    }
  }
  Account.init(
    {
      account_name: DataTypes.STRING,
      industry: {
        type: DataTypes.ENUM,
        values: IndustryType.values,
        defaultValue: IndustryType.defaultValue,
      },
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
