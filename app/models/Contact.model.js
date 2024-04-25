const db = require("../database/init");
const { DataTypes } = require("sequelize");
const { LeadModel, UserModel } = require("./init");
const { SubscriptionStatusType } = require("../enums/init");

const ContactModel = db.define("contacts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: LeadModel,
      key: "id",
    },
  },
  subscription_status: {
    type: DataTypes.ENUM,
    values: SubscriptionStatusType,
  },
  contact_owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

module.exports = ContactModel;
