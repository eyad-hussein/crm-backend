"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProposalService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProposalService.init(
    {
      service_id: DataTypes.INTEGER,
      proposal_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProposalService",
      tableName: "proposal_services",
      underscored: true,
    }
  );
  return ProposalService;
};
