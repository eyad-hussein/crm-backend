"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Industry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Industry.hasMany(models.Customer, {
        foreignKey: "industry_id",
        as: "customers",
      });
    }
  }
  Industry.init(
    {
      industry_name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Industry",
      tableName: "industries",
      underscored: true,
    }
  );
  return Industry;
};
