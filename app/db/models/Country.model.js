"use strict";
const { Model } = require("sequelize");
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
        as: "addresses",
      });

      Country.hasMany(models.State, {
        foreignKey: "country_id",
        as: "states",
      });

      Country.hasMany(models.Extension, {
        foreignKey: "country_id",
        as: "extensions",
      });
    }
  }
  Country.init(
    {
      country_name: {
        type: DataTypes.STRING,
      },
      country_code: {
        type: DataTypes.STRING,
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
