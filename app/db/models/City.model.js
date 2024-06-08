"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.hasMany(models.Address, {
        foreignKey: "city_id",
        as: "addresses",
      });

      City.belongsTo(models.State, {
        foreignKey: "state_id",
        as: "state",
      });
    }
  }
  City.init(
    {
      city_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
      tableName: "cities",
      underscored: true,
    }
  );
  return City;
};
