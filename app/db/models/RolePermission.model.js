"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  RolePermission.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RolePermission",
      tableName: "role_permissions",
      underscored: true,
    }
  );
  return RolePermission;
};
