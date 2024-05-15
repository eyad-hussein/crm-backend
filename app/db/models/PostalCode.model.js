"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostalCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostalCode.hasMany(models.Address, {
        foreignKey: "postal_code_id",
      });

      PostalCode.hasOne(models.Customer, {
        foreignKey: "postal_code_id",
        as: "customer",
      });
    }
  }
  PostalCode.init(
    {
      postal_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PostalCode",
      tableName: "postal_codes",
      underscored: true,
    }
  );
  return PostalCode;
};
