const { DataTypes } = require("sequelize");
const db = require("../database/init");

const PostalCodeModel = db.define("postal_codes", {
  postal_code: {
    type: DataTypes.STRING,
  },
});

module.exports = PostalCodeModel;
