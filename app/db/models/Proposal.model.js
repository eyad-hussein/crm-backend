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
      Proposal.belongsTo(models.Contact, {
        foreignKey: "id",
      });
      Proposal.belongsToMany(models.Service, {
        through: "proposal_services",
        foreignKey: "proposal_id",
      });
    }
  }
  Proposal.init(
    {
      proposal_title: DataTypes.STRING,
      contact_id: DataTypes.INTEGER,
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
