"use strict";
const { Model } = require("sequelize");
const { StateType, LeadSourceType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.Account, {
        foreignKey: "account_id",
      as: "account",
      });

      Customer.hasMany(models.Activity, {
        foreignKey: "customer_id",
        as: "activities",
      });

      Customer.hasMany(models.Address, {
        foreignKey: "customer_id",
        as: "addresses",
      });

      Customer.hasMany(models.CustomerPhoneNumber, {
        foreignKey: "customer_id",
        as: "customer_phone_numbers",
      });
      Customer.belongsToMany(models.Service, {
        through: "customer_services",
        foreignKey: "customer_id",
        as: "services",
      });

      Customer.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Customer.hasOne(models.OnHold, {
        foreignKey: "customer_id",
        as: "on_hold",
      });

      Customer.hasOne(models.Reserve, {
        foreignKey: "customer_id",
        as: "reserve",
      });

      Customer.belongsTo(models.Country, {
        foreignKey: "country_id",
        as: "country",
      });
    }
  }
  Customer.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      user_name: { type: DataTypes.STRING, unique: true },
      title: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      marketing_objective: DataTypes.STRING,
      package_selected: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      follow_up_date: DataTypes.DATE,
      state: {
        type: DataTypes.ENUM,
        values: StateType.values,
        defaultValue: StateType.defaultValue,
      },
      lead_source: {
        type: DataTypes.ENUM,
        values: LeadSourceType.values,
        defaultValue: LeadSourceType.defaultValue,
      },
      country_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      account_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      underscored: true,
    }
  );
  return Customer;
};
