const db = require("../database/MySQL.database");
const { DataTypes } = require("sequelize");
const { SubscriptionStatusType } = require("../enums/init");

const Contact = db.define("contacts", {
  subscription_status: {
    type: DataTypes.ENUM,
    values: SubscriptionStatusType.values,
    defaultValue: SubscriptionStatusType.defaultValue,
  },
});

module.exports = Contact;
