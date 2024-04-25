const { DataTypes } = require("sequelize");
const db = require("../database/init");
const ActivityType = require("../enums/ActivityType.enum");
const CustomerModel = require("./Customer.model");

const ActivityModel = db.define("activities", {
  activity_type: {
    type: DataTypes.ENUM,
    values: ActivityType,
  },
  description: {
    type: DataTypes.TEXT,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: CustomerModel,
      key: "id",
    },
  },
});

module.exports = ActivityModel;
