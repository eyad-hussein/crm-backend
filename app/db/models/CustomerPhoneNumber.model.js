"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerPhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerPhoneNumber.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });

      CustomerPhoneNumber.belongsTo(models.Extension, {
        foreignKey: "extension_id",
        as: "extension",
      });
    }
  }
  CustomerPhoneNumber.init(
    {
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CustomerPhoneNumber",
      tableName: "customer_phone_numbers",
      underscored: true,
    }
  );
  return CustomerPhoneNumber;
};
