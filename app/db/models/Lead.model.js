"use strict";
const { Model } = require("sequelize");
const { LeadStatusType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lead.belongsTo(models.Customer, {
        foreignKey: "customer_id",
      });

      Lead.hasOne(models.Contact, {
        foreignKey: "lead_id",
      });
    }
  }
  Lead.init(
    {
      lead_status: {
        type: DataTypes.ENUM,
        values: LeadStatusType.values,
        defaultValue: LeadStatusType.defaultValue,
      },
    },
    {
      sequelize,
      modelName: "Lead",
      tableName: "leads",
      underscored: true,
    }
  );
  return Lead;
};
