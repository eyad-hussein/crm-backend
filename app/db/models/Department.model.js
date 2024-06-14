"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.hasMany(models.User, {
        foreignKey: "department_id",
        as: "users",
      });
    }
  }
  Department.init(
    {
      department_name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Department",
      tableName: "departments",
      underscored: true,
    }
  );
  return Department;
};
