const { DataTypes } = require("sequelize");
const db = require("../database/init");
const IndustryType = require("../enums/IndustryType.enum");

const AccountModel = db.define("accounts", {
  account_name: {
    type: DataTypes.STRING,
  },
  industry: {
    type: DataTypes.ENUM,
    values: IndustryType,
  },
});

module.exports = AccountModel;
