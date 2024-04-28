const { DataTypes } = require("sequelize");
const db = require("../db/MySQL.database");

const Country = db.define("countries", {
  country_name: {
    type: DataTypes.STRING,
  },
});

module.exports = Country;
