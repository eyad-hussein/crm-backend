const { DataTypes } = require("sequelize");
const db = require("../MySQL.database");
const { AddressType } = require("../../enums/init");

const Address = db.define("addresses", {
  address_type: {
    type: DataTypes.ENUM,
    values: AddressType.values,
    defaultValue: AddressType.defaultValue,
  },
});

module.exports = Address;
