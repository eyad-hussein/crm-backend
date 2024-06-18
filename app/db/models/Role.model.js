"use strict";
const { Model } = require("sequelize");
const { RoleType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: "user_roles",
        foreignKey: "role_id",
        as: "users",
      });

      Role.belongsToMany(models.Permission, {
        through: "role_permissions",
        foreignKey: "role_id",
        as: "permissions",
      });
    }
  }
  Role.init(
    {
      role_name: {
        type: DataTypes.ENUM,
        values: RoleType.values,
        defaultValue: RoleType.defaultValue,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      underscored: true,
    }
  );
  return Role;
};
