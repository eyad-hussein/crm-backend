"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Extension extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Extension.hasMany(models.CustomerPhoneNumber, {
        foreignKey: "extension_id",
        as: "customer_phone_numbers",
      });

      Extension.belongsTo(models.Country, {
        foreignKey: "country_id",
        as: "country",
      });
    }
  }
  Extension.init(
    {
      extension: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Extension",
      tableName: "extensions",
      underscored: true,
    }
  );
  return Extension;
};
