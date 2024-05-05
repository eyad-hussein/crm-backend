"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proposal.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "proposal",
      });
    }
  }
  Proposal.init(
    {
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Proposal",
      tableName: "proposals",
      underscored: true,
    }
  );
  return Proposal;
};
