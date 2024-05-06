"use strict";
const { Model } = require("sequelize");
const { ServiceType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsToMany(models.Customer, {
        through: "customer_services",
        foreignKey: "service_id",
      });
    }
  }
  Service.init(
    {
      service_name: {
        type: DataTypes.ENUM,
        values: ServiceType.values,
        defaultValue: ServiceType.defaultValue,
      },
      service_cost: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Service",
      tableName: "services",
      underscored: true,
    }
  );
  return Service;
};
