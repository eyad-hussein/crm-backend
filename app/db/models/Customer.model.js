"use strict";
const { Model } = require("sequelize");
const { StatusType, LeadSourceType, SalutationType } = require("../../enums");
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

      Customer.belongsTo(models.CustomerPhoneNumber, {
        foreignKey: "customer_phone_number_id",
        as: "customer_phone_number",
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

      Customer.hasOne(models.FollowUp, {
        foreignKey: "customer_id",
        as: "follow_up",
      });

      Customer.hasOne(models.Closure, {
        foreignKey: "customer_id",
        as: "closure",
      });

      Customer.hasOne(models.Prospect, {
        foreignKey: "customer_id",
        as: "prospect",
      });

      Customer.hasOne(models.Contact, {
        foreignKey: "customer_id",
        as: "contact",
      });

      Customer.hasOne(models.Proposal, {
        foreignKey: "customer_id",
        as: "proposal",
      });

      Customer.belongsTo(models.Country, {
        foreignKey: "country_id",
        as: "country",
      });

      Customer.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });

      Customer.belongsTo(models.State, {
        foreignKey: "state_id",
        as: "state",
      });

      Customer.belongsTo(models.PostalCode, {
        foreignKey: "postal_code_id",
        as: "postal_code",
      });
    }
  }
  Customer.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      title: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      priority: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      follow_up_date: DataTypes.DATE,
      salutation: {
        type: DataTypes.ENUM,
        values: SalutationType.values,
        defaultValue: SalutationType.defaultValue,
      },
      status: {
        type: DataTypes.ENUM,
        values: StatusType.values,
        defaultValue: StatusType.defaultValue,
      },
      lead_source: {
        type: DataTypes.ENUM,
        values: LeadSourceType.values,
        defaultValue: LeadSourceType.defaultValue,
      },
      country_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      state_id: DataTypes.INTEGER,
      customer_phone_number_id: DataTypes.INTEGER,
      postal_code_id: DataTypes.INTEGER,
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
