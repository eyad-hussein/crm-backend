"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerService.init(
    {
      customer_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CustomerService",
      tableName: "customer_services",
      underscored: true,
    }
  );
  return CustomerService;
};
