const { DataTypes } = require("sequelize");
const db = require("../database/MySQL.database");
const { IndustryType } = require("../enums/init");

const Account = db.define("accounts", {
  account_name: {
    type: DataTypes.STRING,
  },
  industry: {
    type: DataTypes.ENUM,
    values: IndustryType.values,
    defaultValue: IndustryType.defaultValue,
  },
});

module.exports = Account;
