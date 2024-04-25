const db = require("../database/init");
const { DataTypes } = require("sequelize");
const { CustomerModel } = require("./init");
const { LeadSourceType, LeadStatusType } = require("../enums/init");

const LeadModel = db.define("leads", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: CustomerModel,
      key: "id",
    },
  },
  lead_status: {
    type: DataTypes.ENUM,
    values: LeadStatusType,
  },
  lead_source: {
    type: DataTypes.ENUM,
    values: LeadSourceType,
  },
});

module.exports = LeadModel;
