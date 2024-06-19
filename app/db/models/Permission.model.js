"use strict";
const { Model } = require("sequelize");
const { PermissionType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: "role_permissions",
        foreignKey: "permission_id",
        as: "roles",
      });
    }
  }
  Permission.init(
    {
      permission_name: {
        type: DataTypes.ENUM,
        values: PermissionType.values,
        defaultValue: PermissionType.defaultValue,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
      underscored: true,
    }
  );
  return Permission;
};
