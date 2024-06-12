"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.hasMany(models.Address, {
        foreignKey: "state_id",
        as: "addresses",
      });

      State.belongsTo(models.Country, {
        foreignKey: "country_id",
        as: "country",
      });
    }
  }
  State.init(
    {
      state_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "State",
      tableName: "states",
      underscored: true,
    }
  );
  return State;
};
