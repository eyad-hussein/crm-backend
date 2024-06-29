"use strict";
const { Model } = require("sequelize");
const { StatusType, LeadSourceType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.Industry, {
        foreignKey: "industry_id",
        as: "industry",
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

      Customer.belongsTo(models.Package, {
        foreignKey: "package_id",
        as: "package",
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

      Customer.belongsTo(models.Image, {
        foreignKey: "image_id",
        as: "image",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      priority: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      follow_up_date: DataTypes.DATE,
      website: DataTypes.STRING,
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
