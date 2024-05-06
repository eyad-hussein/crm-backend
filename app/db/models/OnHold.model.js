"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OnHold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OnHold.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
    }
  }
  OnHold.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OnHold",
      tableName: "on_holds",
      underscored: true,
    }
  );
  return OnHold;
};
