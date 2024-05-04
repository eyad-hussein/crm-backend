"use strict";
const { Model } = require("sequelize");
const { AddressType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.City, {
        foreignKey: "city_id",
      });
      Address.belongsTo(models.State, {
        foreignKey: "state_id",
      });
      Address.belongsTo(models.Country, {
        foreignKey: "country_id",
      });
      Address.belongsTo(models.PostalCode, {
        foreignKey: "postal_code_id",
      });
      Address.belongsTo(models.Customer, {
        foreignKey: "customer_id",
      });
    }
  }
  Address.init(
    {
      address_type: {
        type: DataTypes.ENUM,
        values: AddressType.values,
        defaultValue: AddressType.defaultValue,
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
      underscored: true,
    }
  );
  return Address;
};
