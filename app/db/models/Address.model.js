"use strict";
const { Model } = require("sequelize");
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
        as: "city",
      });
      Address.belongsTo(models.State, {
        foreignKey: "state_id",
        as: "state",
      });
      Address.belongsTo(models.Country, {
        foreignKey: "country_id",
        as: "country",
      });
      Address.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
    }
  }
  Address.init(
    {
      address_line_1: DataTypes.STRING,
      address_line_2: DataTypes.STRING,
      postal_code: DataTypes.STRING,
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
