"use strict";
const { Model } = require("sequelize");
const { ActivityType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
    }
  }
  Activity.init(
    {
      activity_type: {
        type: DataTypes.ENUM,
        values: ActivityType.values,
        defaultValue: ActivityType.defaultValue,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Activity",
      tableName: "activities",
      underscored: true,
    }
  );
  return Activity;
};
