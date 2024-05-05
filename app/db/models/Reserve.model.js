"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reserve.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "reserve",
      });
    }
  }
  Reserve.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reserve",
      tableName: "reserves",
      underscored: true,
    }
  );
  return Reserve;
};
