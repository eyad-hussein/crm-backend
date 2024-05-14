"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Closure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Closure.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
    }
  }
  Closure.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Closure",
      tableName: "closures",
      underscored: true,
    }
  );
  return Closure;
};
