const { DataTypes } = require("sequelize");
const db = require("../db/MySQL.database");
const { ActivityType } = require("../enums/init");

const Activity = db.define("activities", {
  activity_type: {
    type: DataTypes.ENUM,
    values: ActivityType.values,
    defaultValue: ActivityType.defaultValue,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Activity;
