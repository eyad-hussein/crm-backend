const { DataTypes } = require("sequelize");

const db = require("../database/MySQL.database");
const { PhoneNumberType } = require("../enums/init");

const CustomerPhoneNumber = db.define("customer_phone_numbers", {
  phone_number: {
    type: DataTypes.STRING,
  },
  extension: {
    type: DataTypes.STRING,
  },
  type_of_number: {
    type: DataTypes.ENUM,
    values: PhoneNumberType.values,
    defaultValue: PhoneNumberType.defaultValue,
  },
});

module.exports = CustomerPhoneNumber;