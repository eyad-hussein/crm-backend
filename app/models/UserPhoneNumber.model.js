const { DataTypes } = require("sequelize");

const db = require("../database/init");
const { PhoneNumberType } = require("../enums/init");
const { UserModel } = require("./init");

const UserPhoneNumberModel = db.define("user_phone_numbers", {
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
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

module.exports = UserPhoneNumberModel;
