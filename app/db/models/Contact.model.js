"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is xnot a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.Lead, {
        foreignKey: "lead_id",
      });
      Contact.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Contact.hasMany(models.Proposal, {
        foreignKey: "id",
      });
    }
  }
  Contact.init(
    {
      subscription_status: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: "Contact",
      tableName: "contacts",
      underscored: true,
    }
  );
  return Contact;
};
