"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Activity, {
        foreignKey: "activity_id",
        as: "activity",
      });
    }
  }
  Task.init(
    {
      priority: DataTypes.ENUM("low", "medium", "high"),
      due_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      underscored: true,
    }
  );
  return Task;
};
