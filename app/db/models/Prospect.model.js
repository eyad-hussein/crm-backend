"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prospect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prospect.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "prospect",
      });
    }
  }
  Prospect.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prospect",
      tableName: "prospects",
      underscored: true,
    }
  );
  return Prospect;
};
