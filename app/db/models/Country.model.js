"use strict";
const { Model } = require("sequelize");
const { CountryType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Address, {
        foreignKey: "country_id",
      });

      Country.hasMany(models.Customer, {
        foreignKey: "country_id",
        as: "customers",
      });
    }
  }
  Country.init(
    {
      country_name: {
        type: DataTypes.ENUM,
        values: CountryType.values,
        defaultValue: CountryType.defaultValue,
      },
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      underscored: true,
    }
  );
  return Country;
};
