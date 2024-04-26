const { DataTypes } = require("sequelize");
const db = require("../database/MySQL.database");

const PostalCode = db.define("postal_codes", {
  postal_code: {
    type: DataTypes.STRING,
  },
});

module.exports = PostalCode;
