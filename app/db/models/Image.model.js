"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.hasOne(models.User, {
        foreignKey: "image_id",
        as: "user",
      });
      Image.hasOne(models.Customer, {
        foreignKey: "image_id",
        as: "customer",
      });
    }
  }
  Image.init(
    {
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "images",
      underscored: true,
    }
  );
  return Image;
};
