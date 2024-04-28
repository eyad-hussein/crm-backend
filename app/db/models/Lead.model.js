const db = require("../db/MySQL.database");
const { DataTypes } = require("sequelize");
const { LeadSourceType, LeadStatusType } = require("../enums/init");

const Lead = db.define("leads", {
  lead_status: {
    type: DataTypes.ENUM,
    values: LeadStatusType.values,
    defaultValue: LeadStatusType.defaultValue,
  },
  lead_source: {
    type: DataTypes.ENUM,
    values: LeadSourceType.values,
    defaultValue: LeadSourceType.defaultValue,
  },
});

module.exports = Lead;
