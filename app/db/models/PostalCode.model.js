const { DataTypes } = require("sequelize");
const db = require("../db/MySQL.database");

const PostalCode = db.define("postal_codes", {
  postal_code: {
    type: DataTypes.STRING,
  },
});

module.exports = PostalCode;
