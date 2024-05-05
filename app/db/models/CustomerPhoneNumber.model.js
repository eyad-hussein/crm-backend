"use strict";
const { Model } = require("sequelize");
const { PhoneNumberType } = require("../../enums");
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
    }
  }
  CustomerPhoneNumber.init(
    {
      phone_number: DataTypes.STRING,
      extension: DataTypes.STRING,
      type_of_number: {
        type: DataTypes.ENUM,
        values: PhoneNumberType.values,
        defaultValue: PhoneNumberType.defaultValue,
      },
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
