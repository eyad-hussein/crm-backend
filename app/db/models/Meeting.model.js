"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meeting.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Meeting.belongsTo(models.Activity, {
        foreignKey: "activity_id",
        as: "activity",
      });
    }
  }
  Meeting.init(
    {
      meeting_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Meeting",
      tableName: "meetings",
      underscored: true,
    }
  );
  return Meeting;
};
