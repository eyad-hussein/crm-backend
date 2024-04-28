"use strict";
const { Model } = require("sequelize");
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
      });

      Customer.hasOne(models.Lead, {
        foreignKey: "customer_id",
      });

      Customer.hasMany(models.Contact, {
        foreignKey: "customer_id",
      });

      Customer.hasMany(models.Activity, {
        foreignKey: "customer_id",
      });

      Customer.hasMany(models.Address, {
        foreignKey: "customer_id",
      });

      Customer.hasMany(models.CustomerPhoneNumber, {
        foreignKey: "customer_id",
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
      service: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      follow_up_date: DataTypes.DATE,
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
