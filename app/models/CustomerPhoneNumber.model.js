const { DataTypes } = require("sequelize");

const db = require("../database/init");
const { PhoneNumberType } = require("../enums/init");
const { CustomerModel } = require("./init");

const CustomerPhoneNumberModel = db.define("customer_phone_numbers", {
  phone_number: {
    type: DataTypes.STRING,
  },
  extension: {
    type: DataTypes.STRING,
  },
  type_of_number: {
    type: DataTypes.ENUM,
    values: PhoneNumberType,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: CustomerModel,
      key: "id",
    },
  },
});

module.exports = CustomerPhoneNumberModel;
