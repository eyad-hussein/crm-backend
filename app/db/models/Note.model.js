"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Note.belongsTo(models.Activity, {
        foreignKey: "activity_id",
        as: "activity",
      });
    }
  }
  Note.init(
    {},
    {
      sequelize,
      modelName: "Note",
      tableName: "notes",
      underscored: true,
    }
  );
  return Note;
};
