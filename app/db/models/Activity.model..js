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

      Activity.hasOne(models.Task, {
        foreignKey: "activity_id",
        as: "task",
      });

      Activity.hasOne(models.Meeting, {
        foreignKey: "activity_id",
        as: "meeting",
      });

      Activity.hasOne(models.Note, {
        foreignKey: "activity_id",
        as: "note",
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
      title: DataTypes.STRING,
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
