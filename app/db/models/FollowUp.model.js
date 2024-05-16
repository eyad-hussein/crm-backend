"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FollowUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FollowUp.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
    }
  }
  FollowUp.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FollowUp",
      tableName: "follow_ups",
      underscored: true,
    }
  );
  return FollowUp;
};
